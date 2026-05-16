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

export const useAuthStore = create((set) => ({
  ...getInitialState(),
  
  login: (email, password) => {
    // Mock login logic
    const mockUser = {
      id: 'usr_123',
      username: email.split('@')[0],
      email,
      avatar: null, // null will trigger initials fallback
      joinedDate: new Date().toISOString(),
      streak: 12,
      bestStreak: 25,
    };
    localStorage.setItem('chalk_user', JSON.stringify(mockUser));
    localStorage.setItem('chalk_token', 'mock_jwt_token_123');
    set({ user: mockUser, isAuthenticated: true });
  },

  signup: (email, username, password) => {
    // Mock signup
    const mockUser = {
      id: `usr_${Date.now()}`,
      username,
      email,
      avatar: null,
      joinedDate: new Date().toISOString(),
      streak: 0,
      bestStreak: 0,
    };
    localStorage.setItem('chalk_user', JSON.stringify(mockUser));
    localStorage.setItem('chalk_token', 'mock_jwt_token_123');
    set({ user: mockUser, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('chalk_user');
    localStorage.removeItem('chalk_token');
    set({ user: null, isAuthenticated: false });
  },
}));
