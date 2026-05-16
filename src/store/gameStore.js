import { create } from 'zustand';

// Mock stats persistence
const getInitialStats = () => {
  const storedStats = localStorage.getItem('chalk_game_stats');
  if (storedStats) {
    try {
      return JSON.parse(storedStats);
    } catch {
      return {};
    }
  }
  return {};
};

export const useGameStore = create((set, get) => ({
  stats: getInitialStats(),
  
  recordGameResult: (gameId, won, score, speed) => {
    set((state) => {
      const currentStats = state.stats[gameId] || {
        streak: 0,
        bestStreak: 0,
        plays: 0,
        wins: 0,
        history: []
      };

      const newStreak = won ? currentStats.streak + 1 : 0;
      const newBestStreak = Math.max(currentStats.bestStreak, newStreak);
      
      const updatedStats = {
        ...currentStats,
        streak: newStreak,
        bestStreak: newBestStreak,
        plays: currentStats.plays + 1,
        wins: currentStats.wins + (won ? 1 : 0),
        history: [
          { date: new Date().toISOString(), won, score, speed },
          ...currentStats.history
        ].slice(0, 30) // keep last 30 days
      };

      const newState = { ...state.stats, [gameId]: updatedStats };
      localStorage.setItem('chalk_game_stats', JSON.stringify(newState));
      
      return { stats: newState };
    });
  }
}));
