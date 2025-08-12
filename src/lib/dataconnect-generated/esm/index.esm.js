import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'todo-service',
  location: 'us-central1'
};

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const addTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTodo', inputVars);
}
addTodoRef.operationName = 'AddTodo';

export function addTodo(dcOrVars, vars) {
  return executeMutation(addTodoRef(dcOrVars, vars));
}

export const toggleTodoCompletionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ToggleTodoCompletion', inputVars);
}
toggleTodoCompletionRef.operationName = 'ToggleTodoCompletion';

export function toggleTodoCompletion(dcOrVars, vars) {
  return executeMutation(toggleTodoCompletionRef(dcOrVars, vars));
}

export const updateTodoTextRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTodoText', inputVars);
}
updateTodoTextRef.operationName = 'UpdateTodoText';

export function updateTodoText(dcOrVars, vars) {
  return executeMutation(updateTodoTextRef(dcOrVars, vars));
}

export const deleteTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTodo', inputVars);
}
deleteTodoRef.operationName = 'DeleteTodo';

export function deleteTodo(dcOrVars, vars) {
  return executeMutation(deleteTodoRef(dcOrVars, vars));
}

export const getMyTodosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyTodos');
}
getMyTodosRef.operationName = 'GetMyTodos';

export function getMyTodos(dc) {
  return executeQuery(getMyTodosRef(dc));
}

export const getTodoByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodoById', inputVars);
}
getTodoByIdRef.operationName = 'GetTodoById';

export function getTodoById(dcOrVars, vars) {
  return executeQuery(getTodoByIdRef(dcOrVars, vars));
}

