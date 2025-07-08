import { useEffect } from 'react';
import { useGameState } from '@/lib/game-state';

export function SpecialAddressSection() {
  const { 
    gamePhase, 
    specialAddressInfo, 
    setGamePhase, 
    nextRound, 
    loseHeart 
  } = useGameState();
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gamePhase !== 'special-address') return;
      
      const key = event.key.toLowerCase();
      if (['r', 'm', 'e'].includes(key)) {
        handleSpecialAddressSelection(key);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gamePhase]);
  
  const handleSpecialAddressSelection = (selectedType: string) => {
    if (!specialAddressInfo) return;
    
    const isCorrect = 
      (selectedType === 'r' && (specialAddressInfo.type === 'private' || specialAddressInfo.type === 'reserved')) ||
      (selectedType === 'm' && specialAddressInfo.type === 'multicast') ||
      (selectedType === 'e' && specialAddressInfo.type === 'experimental');
    
    if (isCorrect) {
      nextRound();
    } else {
      loseHeart();
    }
  };
  
  if (gamePhase !== 'special-address' || !specialAddressInfo) return null;
  
  return (
    <div className="mb-8">
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 text-center">
        <h3 className="font-orbitron text-xl font-bold game-warning mb-3">
          Special Address Detected!
        </h3>
        <p className="text-gray-300 mb-4">
          {specialAddressInfo.description}
        </p>
        <div className="flex justify-center gap-4">
          <button 
            className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 px-4 py-2 rounded-lg font-mono transition-all duration-200"
            onClick={() => handleSpecialAddressSelection('r')}
          >
            <kbd>R</kbd> - Reserved
          </button>
          <button 
            className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 px-4 py-2 rounded-lg font-mono transition-all duration-200"
            onClick={() => handleSpecialAddressSelection('m')}
          >
            <kbd>M</kbd> - Multicast
          </button>
          <button 
            className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-400 px-4 py-2 rounded-lg font-mono transition-all duration-200"
            onClick={() => handleSpecialAddressSelection('e')}
          >
            <kbd>E</kbd> - Experimental
          </button>
        </div>
      </div>
    </div>
  );
}
