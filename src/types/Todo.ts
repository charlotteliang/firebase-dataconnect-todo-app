// Re-export Todo type from Data Connect service for consistency
export type { Todo } from '../services/dataConnectGenerated';

// Keep legacy TodoAction type for any remaining local state management
export type TodoAction = 
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } };
