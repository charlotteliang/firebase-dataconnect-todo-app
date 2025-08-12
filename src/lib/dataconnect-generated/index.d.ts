import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AddTodoData {
  todo_insert: Todo_Key;
}

export interface AddTodoVariables {
  text: string;
}

export interface DeleteTodoData {
  todo_delete?: Todo_Key | null;
}

export interface DeleteTodoVariables {
  id: UUIDString;
}

export interface GetMyTodosData {
  todos: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Todo_Key)[];
}

export interface GetTodoByIdData {
  todo?: {
    id: UUIDString;
    text: string;
    completed: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    user: {
      id: string;
    } & User_Key;
  } & Todo_Key;
}

export interface GetTodoByIdVariables {
  id: UUIDString;
}

export interface Todo_Key {
  id: UUIDString;
  __typename?: 'Todo_Key';
}

export interface ToggleTodoCompletionData {
  todo_update?: Todo_Key | null;
}

export interface ToggleTodoCompletionVariables {
  id: UUIDString;
  completed: boolean;
}

export interface UpdateTodoTextData {
  todo_update?: Todo_Key | null;
}

export interface UpdateTodoTextVariables {
  id: UUIDString;
  text: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  email?: string | null;
  displayName?: string | null;
  photoUrl?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars?: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars?: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface AddTodoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTodoVariables): MutationRef<AddTodoData, AddTodoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddTodoVariables): MutationRef<AddTodoData, AddTodoVariables>;
  operationName: string;
}
export const addTodoRef: AddTodoRef;

export function addTodo(vars: AddTodoVariables): MutationPromise<AddTodoData, AddTodoVariables>;
export function addTodo(dc: DataConnect, vars: AddTodoVariables): MutationPromise<AddTodoData, AddTodoVariables>;

interface ToggleTodoCompletionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ToggleTodoCompletionVariables): MutationRef<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ToggleTodoCompletionVariables): MutationRef<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;
  operationName: string;
}
export const toggleTodoCompletionRef: ToggleTodoCompletionRef;

export function toggleTodoCompletion(vars: ToggleTodoCompletionVariables): MutationPromise<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;
export function toggleTodoCompletion(dc: DataConnect, vars: ToggleTodoCompletionVariables): MutationPromise<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;

interface UpdateTodoTextRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTodoTextVariables): MutationRef<UpdateTodoTextData, UpdateTodoTextVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTodoTextVariables): MutationRef<UpdateTodoTextData, UpdateTodoTextVariables>;
  operationName: string;
}
export const updateTodoTextRef: UpdateTodoTextRef;

export function updateTodoText(vars: UpdateTodoTextVariables): MutationPromise<UpdateTodoTextData, UpdateTodoTextVariables>;
export function updateTodoText(dc: DataConnect, vars: UpdateTodoTextVariables): MutationPromise<UpdateTodoTextData, UpdateTodoTextVariables>;

interface DeleteTodoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTodoVariables): MutationRef<DeleteTodoData, DeleteTodoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTodoVariables): MutationRef<DeleteTodoData, DeleteTodoVariables>;
  operationName: string;
}
export const deleteTodoRef: DeleteTodoRef;

export function deleteTodo(vars: DeleteTodoVariables): MutationPromise<DeleteTodoData, DeleteTodoVariables>;
export function deleteTodo(dc: DataConnect, vars: DeleteTodoVariables): MutationPromise<DeleteTodoData, DeleteTodoVariables>;

interface GetMyTodosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTodosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyTodosData, undefined>;
  operationName: string;
}
export const getMyTodosRef: GetMyTodosRef;

export function getMyTodos(): QueryPromise<GetMyTodosData, undefined>;
export function getMyTodos(dc: DataConnect): QueryPromise<GetMyTodosData, undefined>;

interface GetTodoByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodoByIdVariables): QueryRef<GetTodoByIdData, GetTodoByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTodoByIdVariables): QueryRef<GetTodoByIdData, GetTodoByIdVariables>;
  operationName: string;
}
export const getTodoByIdRef: GetTodoByIdRef;

export function getTodoById(vars: GetTodoByIdVariables): QueryPromise<GetTodoByIdData, GetTodoByIdVariables>;
export function getTodoById(dc: DataConnect, vars: GetTodoByIdVariables): QueryPromise<GetTodoByIdData, GetTodoByIdVariables>;

