import { dataConnect } from '../config/firebase';
import { getCurrentUser } from './auth';
import {
  getMyTodos as getMyTodosQuery,
  addTodo as addTodoMutation,
  toggleTodoCompletion as toggleTodoMutation,
  updateTodoText as updateTodoMutation,
  deleteTodo as deleteTodoMutation,
  upsertUser as upsertUserMutation,
  GetMyTodosData,
  AddTodoVariables,
  ToggleTodoCompletionVariables,
  UpdateTodoTextVariables,
  DeleteTodoVariables,
  UpsertUserVariables,
  UUIDString,
  TimestampString
} from '../lib/dataconnect-generated';

// Test the Data Connect connection
export const testDataConnect = async () => {
  try {
    console.log('🧪 Testing Data Connect connection...');
    console.log('📡 DataConnect instance:', dataConnect);
    
    const user = getCurrentUser();
    console.log('👤 Current user:', user?.uid || 'Not authenticated');
    
    if (user) {
      const token = await user.getIdToken();
      console.log('🔐 Auth token length:', token.length);
      
      // Try a simple query first
      console.log('🔍 Testing getMyTodos query...');
      const result = await getMyTodosQuery(dataConnect);
      console.log('✅ Query test successful:', result);
      return true;
    } else {
      console.log('❌ No authenticated user');
      return false;
    }
  } catch (error) {
    console.error('❌ Data Connect connection test failed:', error);
    return false;
  }
};

// Types matching the generated schema
export interface Todo {
  id: UUIDString;
  text: string;
  completed: boolean;
  createdAt: TimestampString;
  updatedAt: TimestampString;
}

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  createdAt: TimestampString;
}

// Error handling wrapper
const handleDataConnectError = (error: unknown, operation: string = 'Unknown') => {
  console.error(`Data Connect Error in ${operation}:`, error);
  
  // Don't throw for read operations, just log and return gracefully
  if (operation === 'getMyTodos') {
    console.warn('Failed to load todos, returning empty array');
    return;
  }
  
  if (error instanceof Error) {
    throw new Error(`${operation} failed: ${error.message}`);
  }
  throw new Error(`${operation} failed: An unexpected database error occurred`);
};

// User operations
export const upsertUser = async (userData: {
  email?: string;
  displayName?: string;
  photoUrl?: string;
}) => {
  try {
    const variables: UpsertUserVariables = {
      email: userData.email || null,
      displayName: userData.displayName || null,
      photoUrl: userData.photoUrl || null,
    };
    
    const result = await upsertUserMutation(dataConnect, variables);
    return result.data;
  } catch (error) {
    console.error('UpsertUser error:', error);
    handleDataConnectError(error, 'upsertUser');
  }
};

// Todo operations
export const getMyTodos = async (): Promise<Todo[]> => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to fetch todos');
    }
    
    console.log('Calling getMyTodos with user:', user.uid);
    const result = await getMyTodosQuery(dataConnect);
    console.log('GetMyTodos result:', result);
    
    if (!result.data || !result.data.todos) {
      console.log('No todos found, returning empty array');
      return [];
    }
    
    return result.data.todos.map(todo => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));
  } catch (error) {
    console.error('GetMyTodos error:', error);
    handleDataConnectError(error, 'getMyTodos');
    return [];
  }
};

export const addTodo = async (text: string) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to add todos');
    }
    
    console.log('🚀 Starting addTodo operation');
    console.log('👤 User ID:', user.uid);
    console.log('📝 Todo text:', text);
    
    // Ensure we have a fresh auth token
    await user.getIdToken(true); // Force refresh
    console.log('✅ Auth token refreshed');
    
    const variables: AddTodoVariables = { text };
    console.log('📤 Sending variables:', variables);
    console.log('🔌 DataConnect config:', {
      connector: 'default',
      service: 'todo-service',
      location: 'us-central1'
    });
    
    const result = await addTodoMutation(dataConnect, variables);
    console.log('✅ AddTodo success:', result);
    return result.data;
  } catch (error) {
    console.error('❌ AddTodo failed:', error);
    
    // Check if it's a network error
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        console.error('🌐 Network/fetch error detected');
        console.error('🔍 Possible causes:');
        console.error('  - Data Connect service not accessible');
        console.error('  - Authentication token issues');
        console.error('  - CORS configuration');
      }
    }
    
    handleDataConnectError(error, 'addTodo');
  }
};

export const toggleTodoCompletion = async (id: UUIDString, completed: boolean) => {
  try {
    const variables: ToggleTodoCompletionVariables = { id, completed };
    const result = await toggleTodoMutation(dataConnect, variables);
    return result.data;
  } catch (error) {
    console.error('ToggleTodo error:', error);
    handleDataConnectError(error, 'toggleTodoCompletion');
  }
};

export const updateTodoText = async (id: UUIDString, text: string) => {
  try {
    const variables: UpdateTodoTextVariables = { id, text };
    const result = await updateTodoMutation(dataConnect, variables);
    return result.data;
  } catch (error) {
    console.error('UpdateTodo error:', error);
    handleDataConnectError(error, 'updateTodoText');
  }
};

export const deleteTodo = async (id: UUIDString) => {
  try {
    const variables: DeleteTodoVariables = { id };
    const result = await deleteTodoMutation(dataConnect, variables);
    return result.data;
  } catch (error) {
    console.error('DeleteTodo error:', error);
    handleDataConnectError(error, 'deleteTodo');
  }
};
