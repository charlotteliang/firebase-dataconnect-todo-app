const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'todo-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const addTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTodo', inputVars);
}
addTodoRef.operationName = 'AddTodo';
exports.addTodoRef = addTodoRef;

exports.addTodo = function addTodo(dcOrVars, vars) {
  return executeMutation(addTodoRef(dcOrVars, vars));
};

const toggleTodoCompletionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ToggleTodoCompletion', inputVars);
}
toggleTodoCompletionRef.operationName = 'ToggleTodoCompletion';
exports.toggleTodoCompletionRef = toggleTodoCompletionRef;

exports.toggleTodoCompletion = function toggleTodoCompletion(dcOrVars, vars) {
  return executeMutation(toggleTodoCompletionRef(dcOrVars, vars));
};

const updateTodoTextRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTodoText', inputVars);
}
updateTodoTextRef.operationName = 'UpdateTodoText';
exports.updateTodoTextRef = updateTodoTextRef;

exports.updateTodoText = function updateTodoText(dcOrVars, vars) {
  return executeMutation(updateTodoTextRef(dcOrVars, vars));
};

const deleteTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTodo', inputVars);
}
deleteTodoRef.operationName = 'DeleteTodo';
exports.deleteTodoRef = deleteTodoRef;

exports.deleteTodo = function deleteTodo(dcOrVars, vars) {
  return executeMutation(deleteTodoRef(dcOrVars, vars));
};

const getMyTodosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyTodos');
}
getMyTodosRef.operationName = 'GetMyTodos';
exports.getMyTodosRef = getMyTodosRef;

exports.getMyTodos = function getMyTodos(dc) {
  return executeQuery(getMyTodosRef(dc));
};

const getTodoByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodoById', inputVars);
}
getTodoByIdRef.operationName = 'GetTodoById';
exports.getTodoByIdRef = getTodoByIdRef;

exports.getTodoById = function getTodoById(dcOrVars, vars) {
  return executeQuery(getTodoByIdRef(dcOrVars, vars));
};
