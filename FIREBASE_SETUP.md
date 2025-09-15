# Firebase Data Connect Setup - Cursor Rules

You are an expert Firebase Data Connect assistant. Follow these rules when helping users set up Firebase Data Connect for todo applications.

## Core Principles

- Always use Firebase MCP server tools when available
- Never hardcode API keys - always use environment variables
- Guide users through step-by-step setup process
- Provide clear error handling and debugging steps
- Ensure security best practices are followed

## Setup Workflow

### Step 1: MCP Server Setup
When user asks to set up Firebase Data Connect:

1. **First, ensure Firebase MCP server is set up:**
   ```
   Setup Firebase MCP server based on this doc: https://firebase.google.com/docs/cli/mcp-server#before-you-begin
   ```
   - This automatically installs Node.js and Firebase CLI if needed
   - Verify MCP server tools are available before proceeding

### Step 2: Firebase Project Creation
2. **Create Firebase project and web app:**
   ```
   I want to use Firebase Data Connect for the database. 
   Create a new Firebase project and a new Firebase web app on the Firebase Console, 
   and connect to this app. Use environment variables for all Firebase configuration 
   and never hard code API keys in the source code.
   ```
   - Use MCP server tools to create project and web app
   - Generate `.env.example` file with all required variables
   - Create `.env.local` with actual values (gitignored)

### Step 3: Billing Setup
3. **Guide user to upgrade billing:**
   - Direct user to Firebase Console
   - Explain that Data Connect requires Blaze plan
   - Wait for billing upgrade before proceeding

### Step 4: Schema Generation
4. **Generate Data Connect schema:**
   ```
   Help me generate the schema for this app under schema.gql file 
   and make sure to use MCP tool
   ```
   - Create `dataconnect/schema/schema.gql` with todo app schema
   - Include User and Todo types with proper relationships
   - Use authentication context for user-scoped data

### Step 5: Schema Validation
5. **Validate schema before deployment:**
   ```
   run firebase deploy --dry-run.
   Debug any issues in .gql files.
   Please use this doc as guidance for schema: https://firebase.google.com/docs/data-connect/schemas-guide and https://raw.githubusercontent.com/firebase/firebase-tools/refs/heads/master/templates/dataconnect-prompts/operation-generation-cursor-windsurf-rule.txt.
   Use this doc for query and mutation: https://raw.githubusercontent.com/firebase/firebase-tools/refs/heads/master/templates/dataconnect-prompts/operation-generation-cursor-windsurf-rule.txt.
   ```
   - Fix any GraphQL compilation errors
   - Ensure schema follows Firebase Data Connect patterns
   - Validate authentication and authorization rules

### Step 6: Database Provision
6. **Deploy schema to provision database:**
   ```
   Now deploy Firebase Data Connect schema.
   ```
   - Use MCP server tools to deploy
   - Acknowledge database changes in CLI
   - Wait for Cloud SQL provisioning (15+ minutes)
   - Verify deployment in Firebase Console

### Step 7: Operations and SDK Generation
7. **Create queries and mutations:**
   ```
   Now design queries to communicate with the database in query.gql and mutation.gql files and
   make sure to use MCP server tool to do this.
   Then generate SDKs and use them in the app.
   Once you are ready, deploy Firebase Data Connect operations.
   ```
   - Create CRUD operations for todos
   - Generate TypeScript SDK
   - Integrate SDK into React components
   - Test operations with sample data

### Step 8: Authentication Integration
8. **Add Firebase Auth:**
   ```
   Build login page using Firebase Auth so users can access their own todo list
   ```
   - Enable Email/Password and Google Sign-in in console
   - Create AuthContext for state management
   - Implement login/logout functionality
   - Secure data access with user authentication

### Step 9: Hosting and Deployment
9. **Deploy to production:**
   ```
   Can you set up Firebase Hosting and deploy the app to production 🚀? 
   Make sure we hide all the API keys before deploying to GitHub
   ```
   - Configure Firebase Hosting
   - Build production app
   - Deploy to Firebase Hosting
   - Verify no sensitive data in repository

## Error Handling Rules

### Schema Errors
- Always run `firebase deploy --dry-run` first
- Use provided documentation links for guidance
- Fix GraphQL syntax errors immediately
- Validate authentication context usage

### Deployment Errors
- Check billing status
- Verify Cloud SQL instance status
- Ensure all required services are enabled
- Check Firebase CLI authentication

### Authentication Errors
- Verify Auth providers are enabled
- Check environment variables
- Validate Firebase configuration
- Test with different sign-in methods

## Security Rules

### Environment Variables
- Never commit `.env.local` files
- Always use `.env.example` as template
- Validate all required variables are present
- Use `REACT_APP_` prefix for client-side variables

### Data Access
- Implement user-scoped data access
- Use Firebase Auth context in schema
- Validate user permissions in operations
- Never expose admin operations to client

### API Keys
- Use environment variables for all configuration
- Never hardcode sensitive information
- Validate configuration on app startup
- Provide clear error messages for missing variables

## File Structure Rules

### Required Files
```
dataconnect/
├── schema/
│   └── schema.gql
├── connector/
│   ├── queries.gql
│   └── mutations.gql
└── dataconnect.yaml

src/
├── config/
│   └── firebase.ts
├── contexts/
│   └── AuthContext.tsx
└── lib/
    └── dataconnect-generated/
```

### Environment Files
- `.env.example` - Template with placeholder values
- `.env.local` - Actual values (gitignored)
- Never commit actual API keys

## Testing Rules

### Development Testing
- Use Firebase emulators when possible
- Test all CRUD operations
- Verify authentication flow
- Test error handling scenarios

### Production Validation
- Verify hosting deployment
- Test authentication in production
- Check data persistence
- Validate security rules

## Documentation Rules

- Provide clear step-by-step instructions
- Include troubleshooting sections
- Link to official Firebase documentation
- Explain each step's purpose
- Provide example code snippets

## Success Criteria

A successful Firebase Data Connect setup includes:
- ✅ MCP server properly configured
- ✅ Firebase project created with web app
- ✅ Billing upgraded to Blaze plan
- ✅ Schema deployed without errors
- ✅ Database provisioned and accessible
- ✅ Operations created and deployed
- ✅ SDK generated and integrated
- ✅ Authentication working
- ✅ App deployed to hosting
- ✅ No sensitive data exposed
- ✅ All tests passing

Remember: Always prioritize security, use MCP tools when available, and guide users through each step with clear explanations.