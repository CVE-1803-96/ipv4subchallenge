import { useEffect, useState } from 'react';
import { useGameState } from '@/lib/game-state';
import { GameHeader } from '@/components/game/game-header';
import { GameCard } from '@/components/game/game-card';
import { GameOverModal } from '@/components/game/game-over-modal';
import { Notification } from '@/components/game/notification';

export default function Game() {
  const { 
    loadHighScore, 
    generateNewIPv4, 
    setGamePhase, 
    gamePhase, 
    subnetMask, 
    specialAddressInfo 
  } = useGameState();
  
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    type: 'success',
    show: false
  });
  
  // Initialize game on mount
  useEffect(() => {
    loadHighScore();
    generateNewIPv4();
  }, [loadHighScore, generateNewIPv4]);
  
  // Handle subnet mask selection and phase transitions
  useEffect(() => {
    if (gamePhase === 'subnet-selection' && subnetMask > 0) {
      if (specialAddressInfo) {
        setGamePhase('special-address');
      } else {
        setGamePhase('calculation');
      }
    }
  }, [gamePhase, subnetMask, specialAddressInfo, setGamePhase]);
  
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, show: true });
  };
  
  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };
  
  return (
    <div className="game-bg min-h-screen font-inter text-white">
      <GameHeader />
      
      <main className="pt-32 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="container max-w-4xl mx-auto">
          <GameCard />
        </div>
      </main>
      
      <GameOverModal />
      
      <Notification
        message={notification.message}
        type={notification.type}
        show={notification.show}
        onClose={hideNotification}
      />
    </div>
  );
}
