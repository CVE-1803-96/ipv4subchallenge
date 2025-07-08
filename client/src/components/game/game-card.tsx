import { useGameState } from '@/lib/game-state';
import { SubnetCounter } from './subnet-counter';
import { SpecialAddressSection } from './special-address-section';
import { CalculationForm } from './calculation-form';

export function GameCard() {
  const { currentIPv4, gamePhase, setGamePhase, specialAddressInfo } = useGameState();
  
  // Handle phase transitions
  const handleSubnetMaskSelected = () => {
    if (specialAddressInfo) {
      setGamePhase('special-address');
    } else {
      setGamePhase('calculation');
    }
  };
  
  return (
    <div className="game-card rounded-2xl shadow-2xl p-8 animate-bounce-in">
      {/* Game Title */}
      <div className="text-center mb-8">
        <h1 className="font-orbitron text-4xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent mb-2">
          IPv4 Network Game
        </h1>
        <p className="text-gray-300 text-lg">Test your networking knowledge!</p>
      </div>

      {/* IPv4 Address Display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-slate-900/50 rounded-xl px-8 py-6 border-2 border-cyan-500/30 shadow-lg">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current IPv4 Address:
          </label>
          <div className="font-mono text-4xl font-bold game-accent tracking-wider">
            {currentIPv4}
          </div>
        </div>
      </div>

      {/* Game Phases */}
      <SubnetCounter />
      <SpecialAddressSection />
      <CalculationForm />

      {/* Game Instructions */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-slate-900/30 rounded-lg px-6 py-4 border border-cyan-500/20">
          <h4 className="font-orbitron text-lg font-bold game-accent mb-2">
            Instructions
          </h4>
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              • Press{' '}
              <kbd className="bg-cyan-500/20 px-1 rounded text-cyan-400 font-mono">
                Enter
              </kbd>{' '}
              to select subnet mask for normal addresses
            </p>
            <p>
              • Press{' '}
              <kbd className="bg-blue-500/20 px-1 rounded text-blue-400 font-mono">
                R
              </kbd>
              ,{' '}
              <kbd className="bg-purple-500/20 px-1 rounded text-purple-400 font-mono">
                M
              </kbd>
              , or{' '}
              <kbd className="bg-orange-500/20 px-1 rounded text-orange-400 font-mono">
                E
              </kbd>{' '}
              for special addresses
            </p>
            <p>• Calculate network properties for non-special addresses</p>
            <p>• You have 2 minutes per round and 5 lives</p>
          </div>
        </div>
      </div>
    </div>
  );
}
