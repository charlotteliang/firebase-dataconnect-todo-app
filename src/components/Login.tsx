import React, { useState } from 'react';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../services/auth';

interface LoginProps {
  onError: (error: string) => void;
}

const Login: React.FC<LoginProps> = ({ onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      onError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: any) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <header className="login-header">
          <h1>✨ Welcome to Todo App</h1>
          <p>📝 Sign in to manage your tasks 🚀</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="📧 Email address"
              className="login-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="🔒 Password"
              className="login-input"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="login-btn primary"
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : isSignUp ? '🔐 Sign Up' : '🚪 Sign In'}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="login-btn google"
            disabled={loading}
          >
            🔗 Sign in with Google
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="toggle-btn"
            disabled={loading}
          >
            {isSignUp 
              ? '👋 Already have an account? Sign in' 
              : '✨ Need an account? Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
