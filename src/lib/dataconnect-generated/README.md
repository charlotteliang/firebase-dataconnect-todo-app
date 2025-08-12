# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyTodos*](#getmytodos)
  - [*GetTodoById*](#gettodobyid)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*AddTodo*](#addtodo)
  - [*ToggleTodoCompletion*](#toggletodocompletion)
  - [*UpdateTodoText*](#updatetodotext)
  - [*DeleteTodo*](#deletetodo)

# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/todo-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/todo-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/todo-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyTodos
You can execute the `GetMyTodos` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyTodos(): QueryPromise<GetMyTodosData, undefined>;

interface GetMyTodosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTodosData, undefined>;
}
export const getMyTodosRef: GetMyTodosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyTodos(dc: DataConnect): QueryPromise<GetMyTodosData, undefined>;

interface GetMyTodosRef {
  ...
  (dc: DataConnect): QueryRef<GetMyTodosData, undefined>;
}
export const getMyTodosRef: GetMyTodosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyTodosRef:
```typescript
const name = getMyTodosRef.operationName;
console.log(name);
```

### Variables
The `GetMyTodos` query has no variables.
### Return Type
Recall that executing the `GetMyTodos` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyTodosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyTodosData {
  todos: ({
    id: UUIDString;
    text: string;
    completed: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Todo_Key)[];
}
```
### Using `GetMyTodos`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyTodos } from '@firebasegen/todo-connector';


// Call the `getMyTodos()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyTodos();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyTodos(dataConnect);

console.log(data.todos);

// Or, you can use the `Promise` API.
getMyTodos().then((response) => {
  const data = response.data;
  console.log(data.todos);
});
```

### Using `GetMyTodos`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyTodosRef } from '@firebasegen/todo-connector';


// Call the `getMyTodosRef()` function to get a reference to the query.
const ref = getMyTodosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyTodosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.todos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.todos);
});
```

## GetTodoById
You can execute the `GetTodoById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTodoById(vars: GetTodoByIdVariables): QueryPromise<GetTodoByIdData, GetTodoByIdVariables>;

interface GetTodoByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodoByIdVariables): QueryRef<GetTodoByIdData, GetTodoByIdVariables>;
}
export const getTodoByIdRef: GetTodoByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTodoById(dc: DataConnect, vars: GetTodoByIdVariables): QueryPromise<GetTodoByIdData, GetTodoByIdVariables>;

interface GetTodoByIdRef {
  ...
  (dc: DataConnect, vars: GetTodoByIdVariables): QueryRef<GetTodoByIdData, GetTodoByIdVariables>;
}
export const getTodoByIdRef: GetTodoByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTodoByIdRef:
```typescript
const name = getTodoByIdRef.operationName;
console.log(name);
```

### Variables
The `GetTodoById` query requires an argument of type `GetTodoByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTodoByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTodoById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTodoByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTodoById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTodoById, GetTodoByIdVariables } from '@firebasegen/todo-connector';

// The `GetTodoById` query requires an argument of type `GetTodoByIdVariables`:
const getTodoByIdVars: GetTodoByIdVariables = {
  id: ..., 
};

// Call the `getTodoById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTodoById(getTodoByIdVars);
// Variables can be defined inline as well.
const { data } = await getTodoById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTodoById(dataConnect, getTodoByIdVars);

console.log(data.todo);

// Or, you can use the `Promise` API.
getTodoById(getTodoByIdVars).then((response) => {
  const data = response.data;
  console.log(data.todo);
});
```

### Using `GetTodoById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTodoByIdRef, GetTodoByIdVariables } from '@firebasegen/todo-connector';

// The `GetTodoById` query requires an argument of type `GetTodoByIdVariables`:
const getTodoByIdVars: GetTodoByIdVariables = {
  id: ..., 
};

// Call the `getTodoByIdRef()` function to get a reference to the query.
const ref = getTodoByIdRef(getTodoByIdVars);
// Variables can be defined inline as well.
const ref = getTodoByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTodoByIdRef(dataConnect, getTodoByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.todo);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.todo);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars?: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars?: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars?: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation has an optional argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  email?: string | null;
  displayName?: string | null;
  photoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@firebasegen/todo-connector';

// The `UpsertUser` mutation has an optional argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., // optional
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ email: ..., displayName: ..., photoUrl: ..., });
// Since all variables are optional for this mutation, you can omit the `UpsertUserVariables` argument.
const { data } = await upsertUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@firebasegen/todo-connector';

// The `UpsertUser` mutation has an optional argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., // optional
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ email: ..., displayName: ..., photoUrl: ..., });
// Since all variables are optional for this mutation, you can omit the `UpsertUserVariables` argument.
const ref = upsertUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## AddTodo
You can execute the `AddTodo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addTodo(vars: AddTodoVariables): MutationPromise<AddTodoData, AddTodoVariables>;

interface AddTodoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTodoVariables): MutationRef<AddTodoData, AddTodoVariables>;
}
export const addTodoRef: AddTodoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addTodo(dc: DataConnect, vars: AddTodoVariables): MutationPromise<AddTodoData, AddTodoVariables>;

interface AddTodoRef {
  ...
  (dc: DataConnect, vars: AddTodoVariables): MutationRef<AddTodoData, AddTodoVariables>;
}
export const addTodoRef: AddTodoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addTodoRef:
```typescript
const name = addTodoRef.operationName;
console.log(name);
```

### Variables
The `AddTodo` mutation requires an argument of type `AddTodoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddTodoVariables {
  text: string;
}
```
### Return Type
Recall that executing the `AddTodo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTodoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddTodoData {
  todo_insert: Todo_Key;
}
```
### Using `AddTodo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTodo, AddTodoVariables } from '@firebasegen/todo-connector';

// The `AddTodo` mutation requires an argument of type `AddTodoVariables`:
const addTodoVars: AddTodoVariables = {
  text: ..., 
};

// Call the `addTodo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTodo(addTodoVars);
// Variables can be defined inline as well.
const { data } = await addTodo({ text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTodo(dataConnect, addTodoVars);

console.log(data.todo_insert);

// Or, you can use the `Promise` API.
addTodo(addTodoVars).then((response) => {
  const data = response.data;
  console.log(data.todo_insert);
});
```

### Using `AddTodo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTodoRef, AddTodoVariables } from '@firebasegen/todo-connector';

// The `AddTodo` mutation requires an argument of type `AddTodoVariables`:
const addTodoVars: AddTodoVariables = {
  text: ..., 
};

// Call the `addTodoRef()` function to get a reference to the mutation.
const ref = addTodoRef(addTodoVars);
// Variables can be defined inline as well.
const ref = addTodoRef({ text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTodoRef(dataConnect, addTodoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todo_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todo_insert);
});
```

## ToggleTodoCompletion
You can execute the `ToggleTodoCompletion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
toggleTodoCompletion(vars: ToggleTodoCompletionVariables): MutationPromise<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;

interface ToggleTodoCompletionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ToggleTodoCompletionVariables): MutationRef<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;
}
export const toggleTodoCompletionRef: ToggleTodoCompletionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
toggleTodoCompletion(dc: DataConnect, vars: ToggleTodoCompletionVariables): MutationPromise<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;

interface ToggleTodoCompletionRef {
  ...
  (dc: DataConnect, vars: ToggleTodoCompletionVariables): MutationRef<ToggleTodoCompletionData, ToggleTodoCompletionVariables>;
}
export const toggleTodoCompletionRef: ToggleTodoCompletionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the toggleTodoCompletionRef:
```typescript
const name = toggleTodoCompletionRef.operationName;
console.log(name);
```

### Variables
The `ToggleTodoCompletion` mutation requires an argument of type `ToggleTodoCompletionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ToggleTodoCompletionVariables {
  id: UUIDString;
  completed: boolean;
}
```
### Return Type
Recall that executing the `ToggleTodoCompletion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ToggleTodoCompletionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ToggleTodoCompletionData {
  todo_update?: Todo_Key | null;
}
```
### Using `ToggleTodoCompletion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, toggleTodoCompletion, ToggleTodoCompletionVariables } from '@firebasegen/todo-connector';

// The `ToggleTodoCompletion` mutation requires an argument of type `ToggleTodoCompletionVariables`:
const toggleTodoCompletionVars: ToggleTodoCompletionVariables = {
  id: ..., 
  completed: ..., 
};

// Call the `toggleTodoCompletion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await toggleTodoCompletion(toggleTodoCompletionVars);
// Variables can be defined inline as well.
const { data } = await toggleTodoCompletion({ id: ..., completed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await toggleTodoCompletion(dataConnect, toggleTodoCompletionVars);

console.log(data.todo_update);

// Or, you can use the `Promise` API.
toggleTodoCompletion(toggleTodoCompletionVars).then((response) => {
  const data = response.data;
  console.log(data.todo_update);
});
```

### Using `ToggleTodoCompletion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, toggleTodoCompletionRef, ToggleTodoCompletionVariables } from '@firebasegen/todo-connector';

// The `ToggleTodoCompletion` mutation requires an argument of type `ToggleTodoCompletionVariables`:
const toggleTodoCompletionVars: ToggleTodoCompletionVariables = {
  id: ..., 
  completed: ..., 
};

// Call the `toggleTodoCompletionRef()` function to get a reference to the mutation.
const ref = toggleTodoCompletionRef(toggleTodoCompletionVars);
// Variables can be defined inline as well.
const ref = toggleTodoCompletionRef({ id: ..., completed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = toggleTodoCompletionRef(dataConnect, toggleTodoCompletionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todo_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todo_update);
});
```

## UpdateTodoText
You can execute the `UpdateTodoText` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTodoText(vars: UpdateTodoTextVariables): MutationPromise<UpdateTodoTextData, UpdateTodoTextVariables>;

interface UpdateTodoTextRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTodoTextVariables): MutationRef<UpdateTodoTextData, UpdateTodoTextVariables>;
}
export const updateTodoTextRef: UpdateTodoTextRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTodoText(dc: DataConnect, vars: UpdateTodoTextVariables): MutationPromise<UpdateTodoTextData, UpdateTodoTextVariables>;

interface UpdateTodoTextRef {
  ...
  (dc: DataConnect, vars: UpdateTodoTextVariables): MutationRef<UpdateTodoTextData, UpdateTodoTextVariables>;
}
export const updateTodoTextRef: UpdateTodoTextRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTodoTextRef:
```typescript
const name = updateTodoTextRef.operationName;
console.log(name);
```

### Variables
The `UpdateTodoText` mutation requires an argument of type `UpdateTodoTextVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTodoTextVariables {
  id: UUIDString;
  text: string;
}
```
### Return Type
Recall that executing the `UpdateTodoText` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTodoTextData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTodoTextData {
  todo_update?: Todo_Key | null;
}
```
### Using `UpdateTodoText`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTodoText, UpdateTodoTextVariables } from '@firebasegen/todo-connector';

// The `UpdateTodoText` mutation requires an argument of type `UpdateTodoTextVariables`:
const updateTodoTextVars: UpdateTodoTextVariables = {
  id: ..., 
  text: ..., 
};

// Call the `updateTodoText()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTodoText(updateTodoTextVars);
// Variables can be defined inline as well.
const { data } = await updateTodoText({ id: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTodoText(dataConnect, updateTodoTextVars);

console.log(data.todo_update);

// Or, you can use the `Promise` API.
updateTodoText(updateTodoTextVars).then((response) => {
  const data = response.data;
  console.log(data.todo_update);
});
```

### Using `UpdateTodoText`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTodoTextRef, UpdateTodoTextVariables } from '@firebasegen/todo-connector';

// The `UpdateTodoText` mutation requires an argument of type `UpdateTodoTextVariables`:
const updateTodoTextVars: UpdateTodoTextVariables = {
  id: ..., 
  text: ..., 
};

// Call the `updateTodoTextRef()` function to get a reference to the mutation.
const ref = updateTodoTextRef(updateTodoTextVars);
// Variables can be defined inline as well.
const ref = updateTodoTextRef({ id: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTodoTextRef(dataConnect, updateTodoTextVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todo_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todo_update);
});
```

## DeleteTodo
You can execute the `DeleteTodo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTodo(vars: DeleteTodoVariables): MutationPromise<DeleteTodoData, DeleteTodoVariables>;

interface DeleteTodoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTodoVariables): MutationRef<DeleteTodoData, DeleteTodoVariables>;
}
export const deleteTodoRef: DeleteTodoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTodo(dc: DataConnect, vars: DeleteTodoVariables): MutationPromise<DeleteTodoData, DeleteTodoVariables>;

interface DeleteTodoRef {
  ...
  (dc: DataConnect, vars: DeleteTodoVariables): MutationRef<DeleteTodoData, DeleteTodoVariables>;
}
export const deleteTodoRef: DeleteTodoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTodoRef:
```typescript
const name = deleteTodoRef.operationName;
console.log(name);
```

### Variables
The `DeleteTodo` mutation requires an argument of type `DeleteTodoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTodoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTodo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTodoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTodoData {
  todo_delete?: Todo_Key | null;
}
```
### Using `DeleteTodo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTodo, DeleteTodoVariables } from '@firebasegen/todo-connector';

// The `DeleteTodo` mutation requires an argument of type `DeleteTodoVariables`:
const deleteTodoVars: DeleteTodoVariables = {
  id: ..., 
};

// Call the `deleteTodo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTodo(deleteTodoVars);
// Variables can be defined inline as well.
const { data } = await deleteTodo({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTodo(dataConnect, deleteTodoVars);

console.log(data.todo_delete);

// Or, you can use the `Promise` API.
deleteTodo(deleteTodoVars).then((response) => {
  const data = response.data;
  console.log(data.todo_delete);
});
```

### Using `DeleteTodo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTodoRef, DeleteTodoVariables } from '@firebasegen/todo-connector';

// The `DeleteTodo` mutation requires an argument of type `DeleteTodoVariables`:
const deleteTodoVars: DeleteTodoVariables = {
  id: ..., 
};

// Call the `deleteTodoRef()` function to get a reference to the mutation.
const ref = deleteTodoRef(deleteTodoVars);
// Variables can be defined inline as well.
const ref = deleteTodoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTodoRef(dataConnect, deleteTodoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todo_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todo_delete);
});
```

