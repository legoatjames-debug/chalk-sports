import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { cn } from '../lib/utils';

const TICKER_DATA = [
  { game: "KC 24, SF 21", time: "FINAL", status: "final" },
  { game: "BOS 112, MIA 108", time: "FINAL", status: "final" },
  { game: "DAL 101, MIN 98", time: "Q4 2:12", status: "live" },
  { game: "BAL 14, CIN 10", time: "Q2 12:00", status: "live" },
  { game: "LAL vs DEN", time: "10:00 PM EST", status: "upcoming" },
  { game: "PHI vs BUF", time: "SUN 1:00 PM", status: "upcoming" }
];

const ARTICLES = [
  { id: 1, sport: 'NFL', headline: "The New Dynasty: How Kansas City Built a Defense to Match Their MVP", byline: "Mina Kimes", readTime: "8 min", image: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=800" },
  { id: 2, sport: 'NBA', headline: "Why the Timberwolves Defense is Historically Great", byline: "Zach Lowe", readTime: "12 min", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=800" },
  { id: 3, sport: 'NFL', headline: "Rookie QBs Under Pressure: Who Survives Year One?", byline: "Robert Mays", readTime: "6 min", image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=800" },
  { id: 4, sport: 'NBA', headline: "The Rise of the Two-Way Wing", byline: "Kevin O'Connor", readTime: "5 min", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800" },
];

export function Home() {
  const [filter, setFilter] = useState('All');

  const filteredArticles = ARTICLES.filter(a => filter === 'All' || a.sport === filter);

  return (
    <div className="w-full">
      {/* Ticker */}
      <div className="w-full bg-surface border-b border-white/5 overflow-hidden h-10 flex items-center">
        <div className="animate-[ticker_30s_linear_infinite] whitespace-nowrap flex gap-8 px-4">
          {[...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
            <span key={i} className="text-sm font-bold font-display uppercase tracking-wider flex items-center gap-2">
              <span className={item.status === 'live' ? 'text-accent animate-pulse' : 'text-gray-400'}>
                {item.status === 'live' ? '●' : ''} {item.time}
              </span>
              <span className="text-white">{item.game}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Games CTA */}
        <div className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-surface to-background p-8 md:p-12 group cursor-pointer">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/50 rounded-full text-accent font-bold text-sm uppercase tracking-wider mb-4">
                <Flame className="w-4 h-4" /> Daily Puzzles
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-display italic tracking-tighter text-white mb-2 leading-none uppercase drop-shadow-xl">
                Prove Your Knowledge
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl">
                Play today's Chains, Fade Route, and Whistleblower puzzles. New challenges drop at midnight.
              </p>
            </div>
            <Link to="/games" className="inline-flex items-center justify-center gap-2 bg-accent text-white font-black font-display uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-white hover:text-accent transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(232,0,28,0.5)]">
              Play Now <Play className="w-5 h-5 fill-current" />
            </Link>
          </div>
        </div>

        {/* Editorial Section */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-black font-display italic tracking-tighter text-white uppercase">
              Top Stories
            </h2>
            <div className="flex gap-2">
              {['All', 'NFL', 'NBA'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors",
                    filter === tab ? "bg-white text-background" : "bg-surface text-gray-400 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Article */}
          {filter === 'All' && (
            <Link to={`/article/hero`} className="group block mb-8 relative overflow-hidden rounded-xl border border-white/5 bg-card">
              <div className="aspect-[21/9] w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1508344928928-7105b67de453?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Premium Feature</span>
                <h3 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors">
                  The Blueprint: Inside the Modern NBA Offense
                </h3>
                <p className="text-gray-300 font-medium md:text-lg mb-4 max-w-3xl hidden md:block">
                  A deep dive into how spacing, pace, and analytics have completely rewritten the playbook for championship contenders over the last decade.
                </p>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-wide">
                  <span>By Bill Simmons</span>
                  <span>•</span>
                  <span>15 min read</span>
                </div>
              </div>
            </Link>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArticles.map(article => (
              <Link key={article.id} to={`/article/${article.id}`} className="group flex flex-col bg-card rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white tracking-widest border border-white/10 uppercase">
                    {article.sport}
                  </div>
                  <img src={article.image} alt={article.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3 group-hover:text-accent transition-colors leading-snug flex-1">
                    {article.headline}
                  </h4>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wide mt-4 pt-4 border-t border-white/5">
                    <span>{article.byline}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      
      {/* Add CSS for Ticker in index.css or here via style tag */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
