# Firebase Data Connect Todo App

A modern React-based todo application showcasing Firebase Data Connect integration with user authentication, real-time data synchronization, and an innovative SQL Editor.

## Features

- 🔐 **User Authentication** - Secure login/logout with Firebase Auth
- 📝 **Todo Management** - Create, read, update, and delete todos
- 🔄 **Real-time Sync** - Data updates in real-time across devices
- ⚡ **Firebase Data Connect** - Modern PostgreSQL-based backend with GraphQL
- 🗂️ **Multiple Views** - Card view, table view, and SQL editor
- 🔍 **SQL Editor** - Query your data using familiar SQL syntax (translates to GraphQL)
- 🎨 **Modern UI** - Clean, responsive design with intuitive interactions
- 🔒 **Secure Configuration** - Environment variables for API keys
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Firebase Data Connect (PostgreSQL + GraphQL)
- **Authentication**: Firebase Auth
- **Styling**: CSS with modern design patterns
- **Build Tool**: Create React App
- **Database**: Cloud SQL (PostgreSQL) via Firebase Data Connect

## Prerequisites

Before you begin, ensure you have:

- A Google Cloud Platform account
- Git installed (optional)

## AI Prompts

### Setup Firebase Data Connect

Here's a step-by-step approach for setting up Firebase Data Connect with AI assistants:

## Step-by-Step Setup

### Step 1: Prototype
Create an empty folder and open with your AI assistant, then ask:

```
Make me a todo app
```

### Step 2: Firebase Initialization

**First, setup the Firebase MCP server:**
Ask your AI assistant:

```
Setup Firebase MCP server based on this doc: https://firebase.google.com/docs/cli/mcp-server#before-you-begin
```
This will automatically install Node.js and Firebase CLI if needed.

**Then, create your Firebase project:**
Ask your AI assistant:

```
I want to use Firebase Data Connect for the database. 
Create a new Firebase project and a new Firebase web app on the Firebase Console, 
and connect to this app. Use environment variables for all Firebase configuration 
and never hard code API keys in the source code.
```

You should see Firebase MCP server tools triggered and your project and web app created on the Firebase console.

### Step 3: Billing Upgrade
Go to the console and update your billing plan.

### Step 4: Schema and Operations
Your AI assistant should automatically create a schema in your `schema.gql` file. If not, ask:

```
Help me generate the schema for this app under schema.gql file 
and make sure to use MCP tool
```

If there are no errors in the schema, query, and mutation.gql files, your AI assistant should be able to run Firebase deploy successfully. If there are any errors, ask your AI assistant:

```
run firebase deploy --dry-run.
Debug any issues in  .gql files.
Please use this doc as guidance for schema: https://firebase.google.com/docs/data-connect/schemas-guide and https://raw.githubusercontent.com/firebase/firebase-tools/refs/heads/master/templates/dataconnect-prompts/operation-generation-cursor-windsurf-rule.txt.
Use this doc for query and mutation: https://raw.githubusercontent.com/firebase/firebase-tools/refs/heads/master/templates/dataconnect-prompts/operation-generation-cursor-windsurf-rule.txt. 
```

This will compile the GraphQL locally and report any errors for your AI assistant to fix. 

### Step 5: Database Provision
Once your AI assistant fixed all issues, ask:

```
Now deploy Firebase Data Connect schema.
```

Make sure to acknowledge the changes in the database in the CLI tool. Your AI assistant should kick off Firebase CLI to deploy, which will provision a Cloud SQL database that might take 15 minutes. You can confirm on the console and check the Cloud SQL console at https://console.cloud.google.com/sql/

### Step 6: Ensure Your Database Read and Write Work
Ask your AI assistant:

```
Now design queries to communicate with the database in query.gql and mutation.gql files and
make sure to use MCP server tool to do this.
Then generate SDKs and use them in the app.
Once you are ready, deploy Firebase Data Connect operations.
```

If there are any errors blocking the deploy, ask your AI assistant:

```
run firebase deploy --dry-run.
Debug any issues in  .gql files.
Please use this doc as guidance for schema: https://firebase.google.com/docs/data-connect/schemas-guide, and https://raw.githubusercontent.com/firebase/firebase-tools/refs/heads/master/templates/dataconnect-prompts/operation-generation-cursor-windsurf-rule.txt.

Use this doc for query and mutation: https://raw.githubusercontent.com/firebase/firebase-tools/refs/heads/master/templates/dataconnect-prompts/operation-generation-cursor-windsurf-rule.txt. 
```

Your AI assistant will learn the generated SDK and how to use it. Try adding a few todo items and see if they show up on the Data Connect console.

### Step 7: Authentication
Now that Firebase Data Connect is working, ask:

```
Build login page using Firebase Auth so users can access their own todo list
```

Go to console and enable Email/Password and Google Sign-in.

### Step 8: Hosting
Ask your AI assistant:

```
Can you set up Firebase Hosting and deploy the app to production 🚀? 
Make sure we hide all the API keys before deploying to GitHub
```

If you're unsure which framework Firebase Hosting is asking about, ask your AI assistant which framework is used in this app.

### Step 9: (Optional) Commit to GitHub
Ask your AI assistant:

```
Now create a new repo in GitHub and commit the code in, 
make sure you hide all the API keys
```

Your AI assistant can use GitHub CLI to set up a repo and commit the changes with a detailed README.

### SQL Dashboard (Optional)
For admin users, you can build a separate SQL dashboard app using the Firebase Data Connect admin SDK. Ask your AI assistant to build a separate web app with table view and SQL editor for admin access to the Data Connect database.

### 📋 Manual Setup Alternative
For traditional manual setup without AI assistance, see our detailed [Firebase Setup Guide](FIREBASE_SETUP.md).

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/charlotteliang/firebase-dataconnect-todo-app.git
   cd firebase-dataconnect-todo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Firebase Setup Guide](FIREBASE_SETUP.md))

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── AddTodo.tsx     # Todo creation component
│   │   ├── Login.tsx       # Authentication component
│   │   ├── SQLEditor.tsx   # SQL Editor component
│   │   ├── TodoItem.tsx    # Individual todo item
│   │   ├── TodoList.tsx    # Todo list container
│   │   └── TodoTableView.tsx # Table view component
│   ├── config/
│   │   └── firebase.ts     # Firebase configuration
│   ├── contexts/
│   │   └── AuthContext.tsx # Authentication context
│   ├── services/           # API services
│   ├── types/             # TypeScript type definitions
│   └── lib/               # Generated Data Connect SDK
├── dataconnect/           # Firebase Data Connect configuration
│   ├── schema/            # GraphQL schema definitions
│   └── connector/         # GraphQL queries and mutations
├── firebase.json          # Firebase project configuration
└── .env.example          # Environment variables template
```

## Firebase Data Connect Schema

The app uses a simple todo schema:

```graphql
type User @table {
  id: String! @default(expr: "auth.uid")
  email: String
  displayName: String
  photoUrl: String
  createdAt: Timestamp! @default(expr: "request.time")
}

type Todo @table {
  id: UUID! @default(expr: "uuidV4()")
  text: String!
  completed: Boolean! @default(expr: "false")
  createdAt: Timestamp! @default(expr: "request.time")
  updatedAt: Timestamp! @default(expr: "request.time")
  user: User!
  userId: String!
}
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `firebase deploy`
Deploys the Data Connect schema and connectors to Firebase

### `firebase emulators:start`
Starts local Firebase emulators for development

## Development

### Authentication Flow

1. Users must sign up/login with email and password
2. Authentication state is managed through AuthContext
3. Todos are scoped to authenticated users via userId field

### Data Operations

- **Create Todo**: Add new todos with text and completion status
- **Read Todos**: Fetch all todos for authenticated user
- **Update Todo**: Toggle completion status or edit text
- **Delete Todo**: Remove todos from the database
- **SQL Queries**: Query data using familiar SQL syntax in the SQL Editor

### SQL Editor

The SQL Editor allows you to query your todo data using familiar SQL syntax that gets automatically translated to GraphQL queries:

**Supported SQL Operations:**
- `SELECT * FROM todos` - Get all your todos
- `SELECT id, text, completed FROM todos WHERE completed = true` - Filter todos
- `SELECT completed, COUNT(*) as count FROM todos GROUP BY completed` - Aggregate queries
- `SELECT * FROM todos WHERE id = "your-todo-id"` - Query specific todo

**Features:**
- Real-time query execution
- GraphQL query translation display
- Query history with timestamps
- Pre-built example queries
- Formatted result tables

## Security

- ✅ API keys are secured using environment variables
- ✅ `.env.local` is gitignored to prevent accidental commits
- ✅ User authentication required for all todo operations
- ✅ Data access is scoped to authenticated users
- ✅ Firebase Security Rules protect user data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

- [Firebase Data Connect Documentation](https://firebase.google.com/docs/data-connect)
- [React Documentation](https://reactjs.org/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)