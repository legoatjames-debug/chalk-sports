import { create } from 'zustand';

// Mock persist implementation with localStorage
const getInitialState = () => {
  const storedUser = localStorage.getItem('chalk_user');
  if (storedUser) {
    try {
      return { user: JSON.parse(storedUser), isAuthenticated: true };
    } catch {
      return { user: null, isAuthenticated: false };
    }
  }
  return { user: null, isAuthenticated: false };
};

// Helper to save user to the global registry for leaderboards
const saveToRegistry = (user) => {
  try {
    const registry = JSON.parse(localStorage.getItem('chalk_all_users') || '[]');
    const existingIndex = registry.findIndex(u => u.username === user.username);
    if (existingIndex >= 0) {
      registry[existingIndex] = { ...registry[existingIndex], ...user };
    } else {
      registry.push(user);
    }
    localStorage.setItem('chalk_all_users', JSON.stringify(registry));
  } catch (e) {
    console.error('Failed to save to registry', e);
  }
};

export const useAuthStore = create((set) => ({
  ...getInitialState(),
  
  login: (email, password) => {
    // Check if user exists in registry
    let registry = [];
    try { registry = JSON.parse(localStorage.getItem('chalk_all_users') || '[]'); } catch(e){}
    const existingUser = registry.find(u => u.email === email);

    let userToLogin;
    if (existingUser) {
      userToLogin = existingUser;
    } else {
      // Create one if they don't exist
      userToLogin = {
        id: `usr_${Date.now()}`,
        username: email.split('@')[0],
        email,
        avatar: null,
        joinedDate: new Date().toISOString(),
        streak: 0,
        bestStreak: 0,
        score: 0,
        winRate: 0
      };
      saveToRegistry(userToLogin);
    }

    localStorage.setItem('chalk_user', JSON.stringify(userToLogin));
    localStorage.setItem('chalk_token', 'mock_jwt_token_123');
    set({ user: userToLogin, isAuthenticated: true });
  },

  signup: (email, username, password) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      username,
      email,
      avatar: null,
      joinedDate: new Date().toISOString(),
      streak: 0,
      bestStreak: 0,
      score: 0,
      winRate: 0
    };
    saveToRegistry(newUser);
    localStorage.setItem('chalk_user', JSON.stringify(newUser));
    localStorage.setItem('chalk_token', 'mock_jwt_token_123');
    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('chalk_user');
    localStorage.removeItem('chalk_token');
    set({ user: null, isAuthenticated: false });
  },
}));

