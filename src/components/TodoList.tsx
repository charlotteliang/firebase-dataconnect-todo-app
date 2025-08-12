import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  filter: 'all' | 'active' | 'completed';
  allTodos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit, filter, allTodos }) => {
  const getEmptyMessage = () => {
    if (allTodos.length === 0) {
      return "🌟 No todos yet. Add one above to get started! 🎉";
    }
    
    switch (filter) {
      case 'active':
        return "🎊 Awesome! No active tasks. Time to relax! 😎";
      case 'completed':
        return "📝 No completed tasks yet. Start checking off some todos! 💪";
      default:
        return "🌟 No todos yet. Add one above to get started! 🎉";
    }
  };

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>{getEmptyMessage()}</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
