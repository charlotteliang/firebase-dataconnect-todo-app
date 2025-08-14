import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoTableViewProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoTableView: React.FC<TodoTableViewProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleEditStart = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleEditSave = (id: string) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleEditSave(id);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  if (todos.length === 0) {
    return (
      <div className="table-empty-state">
        <p>No records found</p>
      </div>
    );
  }

  return (
    <div className="todo-table-container">
      <div className="table-header">
        <h3>SELECT * FROM todos;</h3>
        <p>{todos.length} rows returned</p>
      </div>
      
      <div className="table-wrapper">
        <table className="todo-table">
          <thead>
            <tr>
              <th>id</th>
              <th>text</th>
              <th>completed</th>
              <th>createdAt</th>
              <th>updatedAt</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className={todo.completed ? 'completed-row' : ''}>
                <td className="id-cell">
                  <span className="id-text">{todo.id}</span>
                </td>
                <td className="text-cell">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, todo.id)}
                      onBlur={() => handleEditSave(todo.id)}
                      className="edit-input"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className={`text-content ${todo.completed ? 'completed' : ''}`}
                      onClick={() => handleEditStart(todo)}
                      style={{ cursor: 'pointer' }}
                      title="Click to edit"
                    >
                      {todo.text}
                    </span>
                  )}
                </td>
                <td className="status-cell">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggle(todo.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span className="status-text">
                      {todo.completed ? 'TRUE' : 'FALSE'}
                    </span>
                  </label>
                </td>
                <td className="date-cell">
                  {formatDate(todo.createdAt)}
                </td>
                <td className="date-cell">
                  {formatDate(todo.updatedAt)}
                </td>
                <td className="actions-cell">
                  {editingId === todo.id ? (
                    <div className="edit-actions">
                      <button
                        onClick={() => handleEditSave(todo.id)}
                        className="save-btn"
                        title="Save changes"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="cancel-btn"
                        title="Cancel editing"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="table-actions">
                      <button
                        onClick={() => handleEditStart(todo)}
                        className="edit-btn"
                        title="Edit todo"
                        style={{ cursor: 'pointer' }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDelete(todo.id)}
                        className="delete-btn"
                        title="Delete todo"
                        style={{ cursor: 'pointer' }}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTableView;
