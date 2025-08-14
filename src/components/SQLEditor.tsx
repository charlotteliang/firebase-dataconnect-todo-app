import React, { useState } from 'react';
import { dataConnect } from '../config/firebase';
import { 
  getMyTodos, 
  getTodoById,
  UUIDString 
} from '../lib/dataconnect-generated';

interface SQLEditorProps {
  onError: (error: string) => void;
}

interface QueryResult {
  query: string;
  graphqlQuery: string;
  result: any;
  timestamp: Date;
}

const SQLEditor: React.FC<SQLEditorProps> = ({ onError }) => {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryHistory, setQueryHistory] = useState<QueryResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedExample, setSelectedExample] = useState('');

  // Example SQL queries that users can try
  const exampleQueries = [
    {
      name: 'Get all todos',
      sql: 'SELECT * FROM todos'
    },
    {
      name: 'Get completed todos',
      sql: 'SELECT id, text, createdAt FROM todos WHERE completed = true'
    },
    {
      name: 'Get active todos',
      sql: 'SELECT id, text, createdAt FROM todos WHERE completed = false'
    },
    {
      name: 'Count todos by status',
      sql: 'SELECT completed, COUNT(*) as count FROM todos GROUP BY completed'
    },
    {
      name: 'Get todo by ID',
      sql: 'SELECT * FROM todos WHERE id = "YOUR_TODO_ID_HERE"'
    }
  ];

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      onError('Please enter a SQL query');
      return;
    }

    setIsExecuting(true);
    
    try {
      // Parse and execute the SQL query
      const { graphqlQuery, result } = await executeSQLQuery(sqlQuery);

      // Add to query history
      const queryResult: QueryResult = {
        query: sqlQuery,
        graphqlQuery,
        result,
        timestamp: new Date()
      };
      
      setQueryHistory(prev => [queryResult, ...prev]);
      
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to execute query');
    } finally {
      setIsExecuting(false);
    }
  };

  const executeSQLQuery = async (sql: string): Promise<{graphqlQuery: string, result: any}> => {
    const normalizedSQL = sql.trim().toLowerCase();
    
    // Handle SELECT statements for todos
    if (normalizedSQL.includes('from todos')) {
      return await executeQueryForTodos(sql);
    }
    
    // Handle SELECT statements for users
    if (normalizedSQL.includes('from users')) {
      throw new Error('User queries are not supported in this demo (privacy reasons)');
    }
    
    throw new Error('Only SELECT statements from "todos" table are supported');
  };

  const executeQueryForTodos = async (sql: string): Promise<{graphqlQuery: string, result: any}> => {
    const normalizedSQL = sql.trim().toLowerCase();
    
    // Check if it's querying a specific ID
    const idMatch = sql.match(/where\s+id\s*=\s*['"]([^'"]+)['"]/i);
    if (idMatch) {
      const todoId = idMatch[1] as UUIDString;
      const graphqlQuery = `query GetTodoById($id: UUID!) {
  todo(id: $id) {
    id
    text
    completed
    createdAt
    updatedAt
  }
}`;
      
      const result = await getTodoById(dataConnect, { id: todoId });
      return {
        graphqlQuery,
        result: result.data.todo ? [result.data.todo] : []
      };
    }
    
    // For all other cases, get all todos and filter in memory
    const graphqlQuery = `query GetMyTodos {
  todos(where: {userId: {eq_expr: "auth.uid"}}, orderBy: [{createdAt: DESC}]) {
    id
    text
    completed
    createdAt
    updatedAt
  }
}`;
    
    const result = await getMyTodos(dataConnect);
    let todos = result.data.todos || [];
    
    // Apply basic filtering
    if (normalizedSQL.includes('where')) {
      if (normalizedSQL.includes('completed = true')) {
        todos = todos.filter(todo => todo.completed);
      } else if (normalizedSQL.includes('completed = false')) {
        todos = todos.filter(todo => !todo.completed);
      }
    }
    
    // Apply basic field selection
    const selectMatch = sql.match(/select\s+(.*?)\s+from/i);
    if (selectMatch) {
      const fields = selectMatch[1].trim();
      if (fields !== '*') {
        const fieldList = fields.split(',').map(f => f.trim().replace(/`/g, ''));
        
        // Handle COUNT queries
        if (fields.toLowerCase().includes('count(')) {
          if (normalizedSQL.includes('group by completed')) {
            const activeCount = todos.filter(t => !t.completed).length;
            const completedCount = todos.filter(t => t.completed).length;
            return {
              graphqlQuery,
              result: [
                { completed: false, count: activeCount },
                { completed: true, count: completedCount }
              ]
            };
          } else {
            return {
              graphqlQuery,
              result: [{ count: todos.length }]
            };
          }
        }
        
        // Select specific fields
        todos = todos.map(todo => {
          const filteredTodo: any = {};
          fieldList.forEach(field => {
            if (field in todo) {
              filteredTodo[field] = (todo as any)[field];
            }
          });
          return filteredTodo;
        });
      }
    }
    
    return {
      graphqlQuery,
      result: todos
    };
  };

  const loadExample = (sql: string) => {
    setSqlQuery(sql);
    setSelectedExample(sql);
  };

  const formatResult = (result: any): string => {
    if (!result) return 'No results';
    
    try {
      // Handle different data structures
      if (Array.isArray(result)) {
        if (result.length === 0) return 'No results found';
        
        // Format as table using the user's preference for simple SQL tables
        const headers = Object.keys(result[0]);
        let table = headers.join(' | ') + '\n';
        table += headers.map(() => '---').join(' | ') + '\n';
        
        result.forEach(row => {
          table += headers.map(header => {
            const value = row[header];
            if (value === null || value === undefined) return 'NULL';
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value);
          }).join(' | ') + '\n';
        });
        
        return table;
      } else if (typeof result === 'object') {
        // Handle object results
        const entries = Object.entries(result);
        if (entries.length === 0) return 'No results';
        
        return entries.map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.length} items\n${formatResult(value)}`;
          } else {
            return `${key}: ${JSON.stringify(value, null, 2)}`;
          }
        }).join('\n\n');
      }
      
      return JSON.stringify(result, null, 2);
    } catch (error) {
      return `Error formatting result: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  return (
    <div className="sql-editor">
      <div className="sql-editor-header">
        <h2>🔍 SQL Editor</h2>
        <p>Write SQL queries that get translated to GraphQL queries for your database</p>
      </div>

      <div className="sql-editor-content">
        <div className="query-input-section">
          <div className="examples-section">
            <h3>Example Queries:</h3>
            <div className="example-buttons">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  className={`example-btn ${selectedExample === example.sql ? 'active' : ''}`}
                  onClick={() => loadExample(example.sql)}
                >
                  {example.name}
                </button>
              ))}
            </div>
          </div>

          <div className="query-input">
            <label htmlFor="sql-query">SQL Query:</label>
            <textarea
              id="sql-query"
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder="Enter your SQL query here...
Example: SELECT id, text, completed FROM todos WHERE completed = false"
              rows={6}
            />
          </div>

          <div className="query-actions">
            <button
              onClick={executeQuery}
              disabled={isExecuting || !sqlQuery.trim()}
              className="execute-btn"
            >
              {isExecuting ? '⏳ Executing...' : '▶️ Execute Query'}
            </button>
            <button
              onClick={() => setSqlQuery('')}
              className="clear-btn"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        <div className="query-results-section">
          <h3>Query Results:</h3>
          {queryHistory.length === 0 ? (
            <div className="no-results">
              <p>No queries executed yet. Try running a query above!</p>
            </div>
          ) : (
            <div className="results-container">
              {queryHistory.map((result, index) => (
                <div key={index} className="query-result">
                  <div className="result-header">
                    <div className="result-info">
                      <span className="result-timestamp">
                        {result.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="result-query">
                        {result.query.substring(0, 50)}
                        {result.query.length > 50 ? '...' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="result-content">
                    <details>
                      <summary>Generated GraphQL Query</summary>
                      <pre className="graphql-query">{result.graphqlQuery}</pre>
                    </details>
                    
                    <div className="result-data">
                      <h4>Results:</h4>
                      <pre className="result-output">
                        {formatResult(result.result)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SQLEditor;
