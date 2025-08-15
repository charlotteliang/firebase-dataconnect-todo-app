# Firebase Setup Guide

This guide provides step-by-step instructions for setting up Firebase services for the todo application.

## Prerequisites

Before you begin, ensure you have:

- Node.js 16+ installed
- A Google Cloud Platform account
- Firebase CLI installed (`npm install -g firebase-tools`)
- Git installed

## Firebase Setup

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "my-todo-app")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firebase Services

#### Enable Authentication
1. In Firebase Console, go to "Authentication" → "Get started"
2. Go to "Sign-in method" tab
3. Enable "Email/Password" provider
4. Click "Save"

#### Enable Firebase Data Connect
1. In Firebase Console, go to "Data Connect" in the left sidebar
2. Click "Get started"
3. Choose your preferred region (e.g., us-central1)
4. Create a new Cloud SQL instance or use existing one
5. Follow the setup wizard to configure your database

### 3. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app
4. Register your app with a nickname
5. Copy the Firebase config object

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

### 5. Deploy Firebase Data Connect Schema

1. Install Firebase CLI if not already installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Set your project:
   ```bash
   firebase use your_project_id
   ```

4. Deploy the Data Connect schema and connectors:
   ```bash
   firebase deploy --only dataconnect
   ```

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

3. **Set up environment variables** (follow Firebase Setup section above)

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Using Firebase Emulators (Recommended for Development)

1. Start the Firebase emulators:
   ```bash
   firebase emulators:start
   ```

2. Update your firebase config to use emulators (uncomment emulator connection in `src/config/firebase.ts`)

3. Start the React app:
   ```bash
   npm start
   ```

## Deployment

### Deploy to Firebase Hosting

1. Build the production app:
   ```bash
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```

### Deploy Data Connect Schema

```bash
firebase deploy --only dataconnect
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure your `.env.local` file is in the project root
   - Restart the development server after changing environment variables
   - Verify all `REACT_APP_` prefixes are correct

2. **Firebase Connection Errors**
   - Check that all Firebase services are enabled in the console
   - Verify your Firebase project ID and configuration
   - Ensure Firebase CLI is logged in: `firebase login`

3. **Data Connect Errors**
   - Make sure the schema is deployed: `firebase deploy --only dataconnect`
   - Check that Cloud SQL instance is running
   - Verify the Data Connect service is properly configured
