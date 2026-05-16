import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

export function Home() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 space-y-12">
        {/* Games CTA */}
        <div className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-surface to-background p-8 md:p-12 group cursor-pointer shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/50 rounded-full text-accent font-bold text-sm uppercase tracking-wider mb-4">
                <Flame className="w-4 h-4" /> Daily Puzzles
              </div>
              <h1 className="text-5xl md:text-7xl font-black font-display italic tracking-tighter text-white mb-2 leading-none uppercase drop-shadow-xl">
                Prove Your Knowledge
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl">
                Play today's Fade Route, Chains, and Whistleblower puzzles. New challenges drop at midnight.
              </p>
            </div>
            <Link to="/games" className="inline-flex items-center justify-center gap-2 bg-accent text-white font-black font-display uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-white hover:text-accent transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(232,0,28,0.5)]">
              Play Now <Play className="w-5 h-5 fill-current" />
            </Link>
          </div>
        </div>

        {/* Real News Placeholder */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-black font-display italic tracking-tighter text-white uppercase">
              Latest Stories
            </h2>
          </div>
          <div className="bg-card border border-white/5 rounded-xl p-12 text-center">
             <p className="text-gray-400 font-medium">Real-time sports coverage and editorial content coming soon.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
