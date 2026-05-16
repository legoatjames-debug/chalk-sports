import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { GamesHub } from './pages/GamesHub';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { FadeRoute } from './pages/games/nfl/FadeRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          
          <Route path="article/:id" element={<div className="p-8 text-center text-white">Article Page</div>} />

          <Route path="games" element={<GamesHub />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Game Routes */}
          <Route path="games/nfl/fade-route" element={
            <ProtectedRoute>
              <FadeRoute />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
