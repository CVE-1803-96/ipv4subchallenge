import { useEffect, useState } from 'react';
import { useGameState } from '@/lib/game-state';

export function SubnetCounter() {
  const { setSubnetMask, setCounterRunning, isCounterRunning, gamePhase } = useGameState();
  const [currentMask, setCurrentMask] = useState(1);
  
  useEffect(() => {
    if (gamePhase !== 'subnet-selection') return;
    
    setCounterRunning(true);
    const interval = setInterval(() => {
      setCurrentMask(prev => {
        const next = prev >= 32 ? 1 : prev + 1;
        return next;
      });
    }, 100);
    
    return () => {
      clearInterval(interval);
      setCounterRunning(false);
    };
  }, [gamePhase, setCounterRunning]);
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gamePhase === 'subnet-selection' && event.key === 'Enter') {
        setSubnetMask(currentMask);
        setCounterRunning(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentMask, gamePhase, setSubnetMask, setCounterRunning]);
  
  if (gamePhase !== 'subnet-selection') return null;
  
  return (
    <div className="text-center mb-8">
      <div className="inline-block bg-slate-900/50 rounded-xl px-6 py-4 border border-cyan-500/30">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Subnet Mask:
        </label>
        <div className="font-mono text-3xl font-bold game-warning animate-counter-bounce">
          /<span>{currentMask}</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-400">
          Press{' '}
          <kbd className="bg-cyan-500/20 px-2 py-1 rounded text-cyan-400 font-mono">
            Enter
          </kbd>{' '}
          to select subnet mask
        </p>
      </div>
    </div>
  );
}
