import React, { useState } from 'react';
import { Trophy, Flame, Target, Medal } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Leaderboard Data
const MOCK_LEADERBOARD = Array.from({ length: 50 }).map((_, i) => ({
  id: `usr_${i}`,
  rank: i + 1,
  username: `Player${Math.floor(Math.random() * 9000) + 1000}`,
  score: Math.floor(Math.random() * 5000) + 1000 - (i * 20),
  streak: Math.floor(Math.random() * 30),
  winRate: Math.floor(Math.random() * 40) + 60,
}));

export function Leaderboard() {
  const [filter, setFilter] = useState('All-Time');
  const [gameFilter, setGameFilter] = useState('All Games');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
            <Trophy className="w-10 h-10 text-gold" />
            Global Rankings
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Compete against the community across all daily puzzles.</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 bg-surface p-1 rounded-lg">
            {['Daily', 'Weekly', 'All-Time'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors",
                  filter === tab ? "bg-accent text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <select 
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
            className="bg-surface text-sm font-bold uppercase tracking-wider text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
          >
            <option>All Games</option>
            <option>Chains [NFL]</option>
            <option>Fade Route [NFL]</option>
            <option>Full Court [NBA]</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 bg-surface/50">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-20 text-center">Rank</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Player</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Score</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Streak</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Win %</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.slice(0, 20).map((player) => (
                <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-center">
                    {player.rank === 1 ? <Medal className="w-6 h-6 text-gold mx-auto" /> :
                     player.rank === 2 ? <Medal className="w-6 h-6 text-gray-300 mx-auto" /> :
                     player.rank === 3 ? <Medal className="w-6 h-6 text-amber-700 mx-auto" /> :
                     <span className="font-display font-bold text-gray-400">{player.rank}</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center text-xs font-bold text-accent">
                        {player.username.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-200 group-hover:text-white transition-colors">{player.username}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-display font-black text-lg text-white">
                    {player.score.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 text-sm font-bold text-gray-300">
                      <Flame className="w-4 h-4 text-accent" /> {player.streak}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 text-sm font-bold text-gray-300">
                      <Target className="w-4 h-4 text-gray-500" /> {player.winRate}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
