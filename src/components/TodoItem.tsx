import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button type="submit" className="save-btn">💾 Save</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">❌ Cancel</button>
          </div>
        </form>
      ) : (
        <div className="todo-content">
          <span 
            className={`todo-text ${todo.completed ? 'line-through' : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.completed && '🎉 '}{todo.text}
          </span>
          <div className="todo-actions">
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-btn"
              title="Edit todo"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(todo.id)} 
              className="delete-btn"
              title="Delete todo"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
