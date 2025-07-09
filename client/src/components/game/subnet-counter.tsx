import { useEffect, useState } from 'react';
import { useGameState } from '@/lib/game-state';
import { getMinimumSubnetMask } from '@/lib/ip-utils';

export function SubnetCounter() {
  const { setSubnetMask, setCounterRunning, isCounterRunning, gamePhase, currentIPv4 } = useGameState();
  const [currentMask, setCurrentMask] = useState(1);
  
  const minimumMask = getMinimumSubnetMask(currentIPv4);
  
  useEffect(() => {
    // Reset counter to minimum when IP changes
    setCurrentMask(minimumMask);
  }, [currentIPv4, minimumMask]);
  
  useEffect(() => {
    if (gamePhase !== 'subnet-selection') return;
    
    setCounterRunning(true);
    const interval = setInterval(() => {
      setCurrentMask(prev => {
        const next = prev >= 32 ? minimumMask : prev + 1;
        return next;
      });
    }, 100);
    
    return () => {
      clearInterval(interval);
      setCounterRunning(false);
    };
  }, [gamePhase, setCounterRunning, minimumMask]);
  
  const handleSelection = () => {
    if (gamePhase === 'subnet-selection') {
      setSubnetMask(currentMask);
      setCounterRunning(false);
    }
  };
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSelection();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentMask, gamePhase]);
  
  if (gamePhase !== 'subnet-selection') return null;
  
  return (
    <div className="text-center mb-8">
      <div 
        className="inline-block bg-slate-900/50 rounded-xl px-6 py-4 border border-cyan-500/30 cursor-pointer hover:bg-slate-900/70 transition-all duration-200"
        onClick={handleSelection}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Subnet Mask:
        </label>
        <div className="font-mono text-3xl font-bold game-warning animate-counter-bounce">
          /<span>{currentMask}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Range: /{minimumMask} - /32
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-400">
          Press{' '}
          <kbd className="bg-cyan-500/20 px-2 py-1 rounded text-cyan-400 font-mono">
            Enter
          </kbd>{' '}
          to select subnet mask or click the counter
        </p>
      </div>
    </div>
  );
}
