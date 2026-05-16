import React, { useState, useEffect } from 'react';
import { GameShell } from '../../../components/games/GameShell';
import { useGameStore } from '../../../store/gameStore';
import { cn } from '../../../lib/utils';

// Mock daily puzzle for Fade Route
const DAILY_PUZZLE = {
  id: 'fade_route_1',
  groups: [
    { level: 1, color: 'bg-green-500', name: 'First Overall QBs', items: ['Burrow', 'Lawrence', 'Stafford', 'Goff'] },
    { level: 2, color: 'bg-yellow-500', name: 'Super Bowl MVP WRs', items: ['Kupp', 'Edelman', 'Ward', 'Branch'] },
    { level: 3, color: 'bg-orange-500', name: 'Cover of Madden', items: ['Mahomes', 'Jackson', 'Brady', 'Allen'] },
    { level: 4, color: 'bg-red-500', name: 'Drafted by the Bears', items: ['Trubisky', 'Fields', 'Grossman', 'McMahon'] },
  ]
};

// Flatten and shuffle items
const getInitialItems = () => {
  const items = DAILY_PUZZLE.groups.flatMap(g => g.items.map(text => ({ text, group: g.name, level: g.level })));
  return items.sort(() => Math.random() - 0.5);
};

export function FadeRoute() {
  const { recordGameResult } = useGameStore();
  
  const [items, setItems] = useState(getInitialItems());
  const [selected, setSelected] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [isComplete, setIsComplete] = useState(false);
  const [won, setWon] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 2500);
  };

  const handleSelect = (itemText) => {
    if (isComplete) return;
    
    if (selected.includes(itemText)) {
      setSelected(selected.filter(i => i !== itemText));
    } else if (selected.length < 4) {
      setSelected([...selected, itemText]);
    }
  };

  const handleSubmit = () => {
    if (selected.length !== 4 || isComplete) return;

    // Check if selected items all belong to the same group
    const selectedItems = items.filter(i => selected.includes(i.text));
    const firstGroup = selectedItems[0].group;
    const isCorrect = selectedItems.every(i => i.group === firstGroup);

    if (isCorrect) {
      // Find the full group info
      const groupInfo = DAILY_PUZZLE.groups.find(g => g.name === firstGroup);
      
      // Update state
      setSolvedGroups([...solvedGroups, groupInfo]);
      setItems(items.filter(i => !selected.includes(i.text)));
      setSelected([]);
      showToast('Correct route!');

      // Check win condition
      if (solvedGroups.length + 1 === 4) {
        setIsComplete(true);
        setWon(true);
        recordGameResult('fade-route', true, 100, 120); // mock score/speed
      }
    } else {
      // Count how many are from the same group (One away?)
      const groupCounts = {};
      selectedItems.forEach(i => {
        groupCounts[i.group] = (groupCounts[i.group] || 0) + 1;
      });
      const maxInGroup = Math.max(...Object.values(groupCounts));

      const newMistakes = mistakesRemaining - 1;
      setMistakesRemaining(newMistakes);
      
      if (newMistakes === 0) {
        setIsComplete(true);
        setWon(false);
        recordGameResult('fade-route', false, 0, 120);
      } else {
        showToast(maxInGroup === 3 ? 'One player away...' : 'Incorrect route.', true);
      }
    }
  };

  const handleShuffle = () => {
    if (isComplete) return;
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleShare = () => {
    const text = `Chalk Sports: Fade Route [NFL]\n${won ? 'Solved!' : 'Failed'}\n⬛⬛⬛⬛\n🔥 Play at chalksports.com`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <GameShell 
      title="Fade Route" 
      league="NFL"
      mistakesRemaining={mistakesRemaining}
      maxMistakes={4}
      isComplete={isComplete}
      won={won}
      onShare={handleShare}
    >
      <div className="relative">
        {/* Toast */}
        {toast && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50">
            <div className={cn("px-4 py-2 rounded-lg font-bold text-sm tracking-wide text-white shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2", toast.isError ? "bg-accent border border-accent/50" : "bg-surface border border-white/10")}>
              {toast.msg}
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
          {/* Solved Groups */}
          {solvedGroups.map(group => (
            <div key={group.name} className={cn("col-span-4 rounded-xl flex flex-col items-center justify-center p-4 min-h-[80px] animate-in zoom-in duration-500", group.color)}>
              <span className="font-bold uppercase tracking-widest text-black/80 text-sm mb-1">{group.name}</span>
              <span className="font-medium text-black/60 text-xs text-center">{group.items.join(', ')}</span>
            </div>
          ))}

          {/* Unsolved Items */}
          {!isComplete && items.map(item => {
            const isSelected = selected.includes(item.text);
            return (
              <button
                key={item.text}
                onClick={() => handleSelect(item.text)}
                className={cn(
                  "aspect-[4/3] md:aspect-[3/2] p-2 rounded-xl flex items-center justify-center text-center transition-all duration-200 uppercase font-bold text-xs md:text-sm tracking-wider select-none active:scale-95",
                  isSelected 
                    ? "bg-white text-background shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                    : "bg-surface text-gray-200 border border-white/5 hover:bg-white/10 hover:border-white/20"
                )}
              >
                {item.text}
              </button>
            );
          })}

          {/* Reveal All if Lost */}
          {isComplete && !won && DAILY_PUZZLE.groups.filter(g => !solvedGroups.find(sg => sg.name === g.name)).map(group => (
            <div key={group.name} className={cn("col-span-4 rounded-xl flex flex-col items-center justify-center p-4 min-h-[80px] opacity-80", group.color)}>
              <span className="font-bold uppercase tracking-widest text-black/80 text-sm mb-1">{group.name}</span>
              <span className="font-medium text-black/60 text-xs text-center">{group.items.join(', ')}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        {!isComplete && (
          <div className="flex items-center justify-center gap-4">
            <button onClick={handleShuffle} className="px-6 py-3 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-colors">
              Shuffle
            </button>
            <button onClick={handleDeselectAll} disabled={selected.length === 0} className="px-6 py-3 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Deselect All
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={selected.length !== 4} 
              className={cn(
                "px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300",
                selected.length === 4 ? "bg-white text-background shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105" : "bg-surface border border-white/10 text-gray-500 cursor-not-allowed"
              )}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </GameShell>
  );
}
