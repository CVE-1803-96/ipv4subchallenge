import { useGameState } from '@/lib/game-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function GameOverModal() {
  const { gamePhase, round, highScore, restartGame, setGamePhase } = useGameState();
  
  if (gamePhase !== 'game-over') return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="bg-slate-800/90 border border-red-500/30 max-w-md w-full mx-4 animate-bounce-in">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">💀</div>
            <h2 className="font-orbitron text-3xl font-bold game-error mb-4">
              Game Over!
            </h2>
            <div className="space-y-2 mb-6">
              <p className="text-lg text-gray-300">
                Rounds Completed: <span className="font-bold game-accent">{round}</span>
              </p>
              <p className="text-lg text-gray-300">
                High Score: <span className="font-bold game-warning">{highScore}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                onClick={restartGame}
              >
                Play Again
              </Button>
              <Button
                variant="outline"
                className="bg-slate-800/50 hover:bg-slate-800/70 border border-gray-500/30 text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                onClick={() => setGamePhase('subnet-selection')}
              >
                Close
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
