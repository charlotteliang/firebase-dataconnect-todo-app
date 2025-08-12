import React, { useState } from 'react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="add-todo-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="✍️ What needs to be done?"
          className="add-todo-input"
        />
        <button 
          type="submit" 
          className="add-todo-btn"
          disabled={!text.trim()}
        >
          ➕ Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
