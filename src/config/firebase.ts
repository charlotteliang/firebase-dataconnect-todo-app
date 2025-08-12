import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '../lib/dataconnect-generated';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Validate that all required environment variables are present
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN', 
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}. Please check your .env.local file.`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);

// Initialize Data Connect with generated connector config
export const dataConnect = getDataConnect(app, connectorConfig);

// Connect to Data Connect emulator in development (commented out to use live service)
// if (process.env.NODE_ENV === 'development') {
//   try {
//     connectDataConnectEmulator(dataConnect, 'localhost:9399');
//   } catch (error) {
//     // Emulator connection might fail if already connected or not running
//     console.log('Data Connect emulator connection info:', error);
//   }
// }

console.log('Data Connect configured with:', {
  connector: 'default',
  service: 'todo-service', 
  location: 'us-central1',
  usingEmulator: false
});

export default app;
