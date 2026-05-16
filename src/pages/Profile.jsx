import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import { Flame, Trophy, Calendar, Target, LogOut } from 'lucide-react';
import { format } from 'date-fns';

export function Profile() {
  const { user, logout } = useAuthStore();
  const { stats } = useGameStore();

  const handleLogout = () => {
    logout();
  };

  const calculateTotalPlays = () => {
    return Object.values(stats).reduce((acc, game) => acc + (game.plays || 0), 0);
  };

  const calculateTotalWins = () => {
    return Object.values(stats).reduce((acc, game) => acc + (game.wins || 0), 0);
  };

  const totalPlays = calculateTotalPlays();
  const totalWins = calculateTotalWins();
  const winRate = totalPlays > 0 ? Math.round((totalWins / totalPlays) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <div className="glass p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-gold" />
        
        <div className="w-32 h-32 rounded-full bg-surface border-4 border-white/10 flex items-center justify-center overflow-hidden shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-black text-accent">
              {user?.username?.substring(0, 2).toUpperCase() || 'CH'}
            </span>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-display font-black text-white uppercase tracking-tight mb-2">
            {user?.username}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {format(new Date(user?.joinedDate || Date.now()), 'MMM yyyy')}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="bg-background border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded text-accent"><Flame className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Current Streak</p>
                <p className="text-2xl font-black font-display">{user?.streak || 0}</p>
              </div>
            </div>
            <div className="bg-background border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3">
              <div className="p-2 bg-gold/20 rounded text-gold"><Trophy className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Best Streak</p>
                <p className="text-2xl font-black font-display">{user?.bestStreak || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Plays', value: totalPlays },
          { label: 'Total Wins', value: totalWins },
          { label: 'Win Rate', value: `${winRate}%` },
          { label: 'Games Mastered', value: '0' }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-xl text-center">
            <p className="text-4xl font-black font-display text-white mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Per Game Stats */}
      <div>
        <h2 className="text-2xl font-display font-black italic text-white uppercase mb-4">Game Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['chains', 'fade-route', 'flags-or-nah', 'football-connections', 'whistleblower', 'full-court', 'pick-and-roll', 'sixth-man'].map(gameId => {
            const gameStat = stats[gameId] || { plays: 0, wins: 0, streak: 0 };
            return (
              <div key={gameId} className="bg-card border border-white/5 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold uppercase tracking-wider text-sm text-gray-200">
                    {gameId.replace(/-/g, ' ')}
                  </h3>
                  <div className="text-xs font-bold px-2 py-1 bg-surface rounded text-gray-400">
                    {gameStat.plays > 0 ? `${Math.round((gameStat.wins / gameStat.plays) * 100)}% Win` : 'No Plays'}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Plays: <span className="text-white font-bold">{gameStat.plays}</span></span>
                  <span className="text-gray-400">Streak: <span className="text-white font-bold">{gameStat.streak}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
