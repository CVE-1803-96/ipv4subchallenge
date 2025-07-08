import { Heart, Clock, Trophy, Star } from 'lucide-react';
import { useGameState } from '@/lib/game-state';
import { useEffect } from 'react';

export function GameHeader() {
  const { hearts, timeRemaining, round, highScore, decrementTimer, gamePhase } = useGameState();
  
  useEffect(() => {
    if (gamePhase === 'game-over') return;
    
    const timer = setInterval(() => {
      decrementTimer();
    }, 1000);
    
    return () => clearInterval(timer);
  }, [decrementTimer, gamePhase]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const renderHearts = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Heart
        key={index}
        className={`w-5 h-5 ${
          index < hearts 
            ? 'text-red-500 fill-red-500 animate-pulse-glow' 
            : 'text-gray-600'
        }`}
      />
    ));
  };
  
  const timeProgress = (timeRemaining / 120) * 100;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-cyan-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Hearts Display */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Lives:</span>
            <div className="flex gap-1">
              {renderHearts()}
            </div>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 game-accent" />
            <div className="bg-slate-800/50 rounded-lg px-3 py-1 border border-cyan-500/30">
              <span className="font-mono text-lg font-bold game-accent">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Round Counter */}
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 game-warning" />
            <span className="text-sm font-medium text-gray-300">Round:</span>
            <span className="font-orbitron text-lg font-bold game-accent">{round}</span>
          </div>

          {/* High Score */}
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 game-warning" />
            <span className="text-sm font-medium text-gray-300">Best:</span>
            <span className="font-orbitron text-lg font-bold game-warning">{highScore}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-1000 ease-linear"
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      </div>
    </header>
  );
}
