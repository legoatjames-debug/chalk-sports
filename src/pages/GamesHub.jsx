import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Lock, Play, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

const GAMES = {
  NFL: [
    { id: 'chains', name: 'Chains', desc: 'Connect 2 NFL players via teammate links.', diff: 'Medium', status: 'unplayed' },
    { id: 'fade-route', name: 'Fade Route', desc: 'Sort 16 NFL items into 4 hidden groups.', diff: 'Hard', status: 'unplayed' },
    { id: 'flags-or-nah', name: 'Flags or Nah', desc: 'Judge the call on controversial NFL plays.', diff: 'Easy', status: 'unplayed' },
    { id: 'football-connections', name: 'Football Connections', desc: 'Word association grid for NFL lore.', diff: 'Hard', status: 'unplayed' },
    { id: 'whistleblower', name: 'Whistleblower', desc: 'Catch the imposter using one-word clues.', diff: 'Medium', status: 'unplayed' },
  ],
  NBA: [
    { id: 'full-court', name: 'Full Court', desc: 'Connect 2 NBA players via teammate links.', diff: 'Medium', status: 'unplayed' },
    { id: 'pick-and-roll', name: 'Pick & Roll', desc: 'Sort 16 NBA items into 4 hidden groups.', diff: 'Hard', status: 'unplayed' },
    { id: 'sixth-man', name: 'Sixth Man', desc: 'NBA Imposter game. Find the fake player.', diff: 'Medium', status: 'unplayed' },
  ]
};

const DifficultyBadge = ({ diff }) => {
  const colors = {
    Easy: 'text-green-400 bg-green-400/10 border-green-400/20',
    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    Hard: 'text-red-400 bg-red-400/10 border-red-400/20',
  };
  return (
    <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border", colors[diff])}>
      {diff}
    </span>
  );
};

export function GamesHub() {
  const { isAuthenticated } = useAuthStore();

  const GameCard = ({ game, league }) => (
    <div className="relative group">
      {!isAuthenticated && (
        <div className="absolute inset-0 z-20 backdrop-blur-sm bg-background/50 rounded-xl flex flex-col items-center justify-center border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Lock className="w-8 h-8 text-gray-400 mb-2" />
          <Link to="/login" className="bg-white text-background font-bold text-sm uppercase px-4 py-2 rounded hover:bg-gray-200">
            Sign in to play
          </Link>
        </div>
      )}
      
      <Link 
        to={isAuthenticated ? `/games/${league.toLowerCase()}/${game.id}` : '#'}
        onClick={(e) => { if (!isAuthenticated) e.preventDefault(); }}
        className={cn(
          "block p-6 rounded-xl border transition-all duration-300 h-full flex flex-col",
          isAuthenticated ? "bg-card border-white/10 hover:border-accent hover:-translate-y-1 hover:shadow-lg shadow-accent/5" : "bg-card/50 border-white/5 grayscale pointer-events-none group-hover:pointer-events-auto group-hover:grayscale-0"
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className={cn("text-xs font-bold uppercase tracking-widest px-2 py-1 rounded", league === 'NFL' ? "bg-blue-600/20 text-blue-400" : "bg-orange-600/20 text-orange-400")}>
              {league}
            </span>
            <DifficultyBadge diff={game.diff} />
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-1 text-gray-500 text-xs font-bold uppercase">
              <Flame className="w-3 h-3 text-accent" /> 0
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tight mb-2">
          {game.name}
        </h3>
        <p className="text-sm text-gray-400 font-medium flex-1 mb-6">
          {game.desc}
        </p>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {game.status === 'played' ? 'Completed Today' : 'Daily Puzzle Available'}
          </span>
          {isAuthenticated && game.status !== 'played' && (
            <Play className="w-5 h-5 text-accent" />
          )}
        </div>
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!isAuthenticated && (
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-accent/20 to-surface border border-accent/30 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-2xl font-display font-black text-white uppercase italic mb-1">Play Daily Puzzles</h2>
            <p className="text-sm text-gray-300">Sign in or create an account to play, build streaks, and rank up.</p>
          </div>
          <Link to="/login" className="whitespace-nowrap bg-white text-background font-bold uppercase tracking-wide px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            Sign In Now
          </Link>
        </div>
      )}

      <div className="space-y-12">
        {/* NFL Games */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tight">NFL Gridiron</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.NFL.map(game => <GameCard key={game.id} game={game} league="NFL" />)}
          </div>
        </section>

        {/* NBA Games */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tight">NBA Hardwood</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.NBA.map(game => <GameCard key={game.id} game={game} league="NBA" />)}
          </div>
        </section>
      </div>
    </div>
  );
}
