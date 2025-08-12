import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { upsertUser } from './dataConnectGenerated';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Auth service functions
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await syncUserToDataConnect(result.user);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await syncUserToDataConnect(result.user);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create account');
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await syncUserToDataConnect(result.user);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out');
  }
};

// Sync Firebase Auth user to Data Connect
const syncUserToDataConnect = async (user: User) => {
  try {
    await upsertUser({
      email: user.email || undefined,
      displayName: user.displayName || undefined,
      photoUrl: user.photoURL || undefined,
    });
  } catch (error) {
    console.error('Failed to sync user to Data Connect:', error);
    // Don't throw here as auth should still work even if sync fails
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};
