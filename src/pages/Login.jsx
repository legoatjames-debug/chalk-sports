import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ArrowRight, AlertCircle } from 'lucide-react';

export function Login() {
  const [mode, setMode] = useState('login'); // login, signup, forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuthStore();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup' && !username) {
      setError('Username is required for leaderboards.');
      return;
    }
    
    if (mode === 'forgot') {
      alert('Password reset link sent to ' + email);
      setMode('login');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    try {
      if (mode === 'login') {
        login(email, password);
      } else {
        signup(email, username, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md glass p-8 rounded-xl shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-gold" />
        
        <h1 className="text-3xl font-display font-black text-white uppercase italic mb-2">
          {mode === 'login' ? 'Sign In to Play' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          {mode === 'login' 
            ? 'Access daily puzzles, save your streaks, and climb the ranks.'
            : mode === 'signup'
            ? 'Join the community and start your daily streak.'
            : 'Enter your email to receive a reset link.'}
        </p>

        {error && (
          <div className="bg-accent/10 border border-accent/50 text-accent p-3 rounded mb-6 flex items-start gap-2 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="you@example.com"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="player123"
                maxLength={15}
              />
              <p className="text-xs text-gray-500 mt-1">Displayed on leaderboards.</p>
            </div>
          )}

          {mode !== 'forgot' && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-xs text-gray-400 hover:text-white mt-2 font-medium"
                >
                  Forgot password?
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-white font-bold uppercase tracking-widest py-4 rounded hover:bg-white hover:text-accent transition-all flex items-center justify-center gap-2 group mt-4"
          >
            {mode === 'forgot' ? 'Send Link' : 'Continue'} 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-sm text-gray-400">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-white font-bold hover:text-accent transition-colors underline decoration-white/30 underline-offset-4"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
