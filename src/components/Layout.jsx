import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Flame, User, Home, Gamepad2, Trophy, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const NavLinks = () => (
    <>
      <Link to="/" className={cn("hover:text-accent font-semibold uppercase tracking-wide", location.pathname === '/' ? "text-accent" : "text-gray-300")}>Home</Link>
      <Link to="/games" className={cn("hover:text-accent font-semibold uppercase tracking-wide", location.pathname.startsWith('/games') ? "text-accent" : "text-gray-300")}>Games</Link>
      <Link to="/leaderboard" className={cn("hover:text-accent font-semibold uppercase tracking-wide", location.pathname === '/leaderboard' ? "text-accent" : "text-gray-300")}>Rankings</Link>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-display font-bold italic tracking-tighter text-white">
              CHALK<span className="text-accent">SPORTS</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-surface rounded-full border border-white/5">
                  <Flame className="w-4 h-4 text-accent" />
                  <span className="font-bold font-display text-sm">{user?.streak || 0}</span>
                </div>
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-accent text-xs">
                        {user?.username?.substring(0, 2).toUpperCase() || 'CH'}
                      </span>
                    )}
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/login" className="hidden md:inline-flex px-4 py-2 bg-white text-background font-bold uppercase tracking-wide text-sm hover:bg-gray-200 transition-colors">
                Sign In
              </Link>
            )}
            
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-white/10 flex flex-col p-4 gap-4">
          <NavLinks />
          {!isAuthenticated && (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 bg-white text-background font-bold uppercase tracking-wide text-center mt-4">
              Sign In
            </Link>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 flex justify-around items-center h-16 pb-safe z-50">
        <Link to="/" className={cn("flex flex-col items-center gap-1", location.pathname === '/' ? "text-accent" : "text-gray-400")}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
        </Link>
        <Link to="/games" className={cn("flex flex-col items-center gap-1", location.pathname.startsWith('/games') ? "text-accent" : "text-gray-400")}>
          <Gamepad2 className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Games</span>
        </Link>
        <Link to="/leaderboard" className={cn("flex flex-col items-center gap-1", location.pathname === '/leaderboard' ? "text-accent" : "text-gray-400")}>
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Rank</span>
        </Link>
        <Link to="/profile" className={cn("flex flex-col items-center gap-1", location.pathname === '/profile' ? "text-accent" : "text-gray-400")}>
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
