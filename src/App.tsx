import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Todo, testDataConnect } from './services/dataConnectGenerated';
import * as dataConnectService from './services/dataConnectGenerated';
import { logout } from './services/auth';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Login from './components/Login';
import './App.css';

const TodoApp: React.FC = () => {
  const { user, loading } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [error, setError] = useState<string>('');
  const [appLoading, setAppLoading] = useState(false);

  // Load todos when user is authenticated
  useEffect(() => {
    if (user) {
      // Test Data Connect connection first
      testDataConnect().then((success) => {
        console.log('🧪 Data Connect test result:', success);
      });
      
      // Add a small delay to ensure auth token is properly set
      const timer = setTimeout(() => {
        loadTodos();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setTodos([]);
    }
  }, [user]);

  const loadTodos = async () => {
    try {
      setAppLoading(true);
      const todoList = await dataConnectService.getMyTodos();
      setTodos(todoList);
    } catch (error: any) {
      setError(error.message || 'Failed to load todos');
    } finally {
      setAppLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      await dataConnectService.addTodo(text);
      // Reload todos to get the new one with server-generated ID
      await loadTodos();
    } catch (error: any) {
      setError(error.message || 'Failed to add todo');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await dataConnectService.toggleTodoCompletion(id, !todo.completed);
        // Update local state immediately for better UX
        setTodos(todos.map(t => 
          t.id === id ? { ...t, completed: !t.completed } : t
        ));
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update todo');
      // Reload todos to sync with server state
      await loadTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await dataConnectService.deleteTodo(id);
      // Update local state immediately
      setTodos(todos.filter(t => t.id !== id));
    } catch (error: any) {
      setError(error.message || 'Failed to delete todo');
      // Reload todos to sync with server state
      await loadTodos();
    }
  };

  const editTodo = async (id: string, text: string) => {
    try {
      await dataConnectService.updateTodoText(id, text);
      // Update local state immediately
      setTodos(todos.map(t => 
        t.id === id ? { ...t, text } : t
      ));
    } catch (error: any) {
      setError(error.message || 'Failed to update todo');
      // Reload todos to sync with server state
      await loadTodos();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const completedTodoCount = todos.filter((todo) => todo.completed).length;

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <p>⏳ Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return (
      <div className="App">
        <Login onError={setError} />
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="error-close">
              ✕
            </button>
          </div>
        )}
      </div>
    );
  }

  // Show main todo app if authenticated
  return (
    <div className="App">
      <div className="todo-app">
        <header className="app-header">
          <div className="header-content">
            <div className="header-main">
              <h1>✨ Todo App</h1>
              <p>📝 Stay organized and get things done 🚀</p>
            </div>
            <div className="user-info">
              <span className="user-name">👋 {user.displayName || user.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                🚪 Sign Out
              </button>
            </div>
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="error-close">
              ✕
            </button>
          </div>
        )}

        <AddTodo onAdd={addTodo} />

        <div className="filter-controls">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            📋 All ({todos.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            🔥 Active ({activeTodoCount})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            ✅ Completed ({completedTodoCount})
          </button>
        </div>

        {appLoading ? (
          <div className="loading-container">
            <p>⏳ Loading todos...</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            filter={filter}
            allTodos={todos}
          />
        )}

        {todos.length > 0 && !appLoading && (
          <div className="todo-stats">
            {activeTodoCount === 0 ? (
              <p>
                🎉 Congratulations! All tasks completed! 🏆✨
              </p>
            ) : (
              <p>
                🎯 {activeTodoCount} of {todos.length} tasks remaining
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TodoApp />
    </AuthProvider>
  );
}

export default App;