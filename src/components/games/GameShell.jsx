import React, { useState } from 'react';
import { ArrowLeft, Share2, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function GameShell({ 
  title, 
  league, 
  mistakesRemaining, 
  maxMistakes,
  isComplete,
  won,
  onShare,
  children 
}) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <Link to="/games" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Hub
        </Link>
        <div className="text-center">
          <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border mb-1 inline-block", league === 'NFL' ? "text-blue-400 bg-blue-400/10 border-blue-400/20" : "text-orange-400 bg-orange-400/10 border-orange-400/20")}>
            {league}
          </span>
          <h1 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">{title}</h1>
        </div>
        <button onClick={() => setShowHelp(true)} className="text-gray-400 hover:text-white transition-colors">
          <HelpCircle className="w-6 h-6" />
        </button>
      </header>

      {/* Game Area */}
      <main className="flex-1 flex flex-col">
        {/* Mistakes Tracker */}
        {maxMistakes && !isComplete && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mistakes Remaining:</span>
            <div className="flex gap-1.5">
              {Array.from({ length: maxMistakes }).map((_, i) => (
                <div key={i} className={cn("w-3 h-3 rounded-full transition-colors", i < mistakesRemaining ? "bg-accent" : "bg-surface border border-white/10")} />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* End Game Overlay */}
        {isComplete && (
          <div className="mt-8 p-8 glass rounded-2xl border border-white/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl font-display font-black uppercase italic mb-2">
              {won ? <span className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">Perfect Route</span> : <span className="text-accent drop-shadow-[0_0_15px_rgba(232,0,28,0.5)]">Incomplete</span>}
            </h2>
            <p className="text-gray-400 font-medium mb-6">
              {won ? "You crushed today's puzzle. See you tomorrow." : "You ran out of lives. Better luck tomorrow."}
            </p>
            
            <button onClick={onShare} className="mx-auto flex items-center justify-center gap-2 bg-white text-background hover:bg-gray-200 font-black font-display uppercase tracking-widest px-8 py-4 rounded-lg transition-all hover:-translate-y-1">
              Share Result <Share2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm" onClick={() => setShowHelp(false)}>
          <div className="bg-card border border-white/10 p-8 rounded-xl max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-display font-black text-white uppercase italic mb-4">How to Play</h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Find groups of four items that share something in common.<br/><br/>
              • Select four items and tap "Submit"<br/>
              • You have 4 mistakes available.<br/>
              • Categories range from easy to tricky.<br/><br/>
              A new puzzle is released every day at midnight.
            </p>
            <button onClick={() => setShowHelp(false)} className="w-full bg-surface text-white font-bold uppercase tracking-wider py-3 rounded hover:bg-white/5 transition-colors">
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
