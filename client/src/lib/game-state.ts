import { create } from 'zustand';
import { generateRandomIPv4, classifyIPAddress, calculateSubnetProperties, AddressClassification } from './ip-utils';

export type GamePhase = 'subnet-selection' | 'special-address' | 'calculation' | 'game-over';

export interface GameState {
  currentIPv4: string;
  subnetMask: number;
  hearts: number;
  round: number;
  timeRemaining: number;
  highScore: number;
  isCounterRunning: boolean;
  gamePhase: GamePhase;
  specialAddressInfo: AddressClassification | null;
  
  // Actions
  generateNewIPv4: () => void;
  setSubnetMask: (mask: number) => void;
  setGamePhase: (phase: GamePhase) => void;
  loseHeart: () => void;
  resetHearts: () => void;
  decrementTimer: () => void;
  resetTimer: () => void;
  nextRound: () => void;
  gameOver: () => void;
  restartGame: () => void;
  setCounterRunning: (running: boolean) => void;
  updateHighScore: () => void;
  loadHighScore: () => void;
  saveHighScore: () => void;
}

export const useGameState = create<GameState>((set, get) => ({
  currentIPv4: '',
  subnetMask: 0,
  hearts: 5,
  round: 1,
  timeRemaining: 120,
  highScore: 0,
  isCounterRunning: false,
  gamePhase: 'subnet-selection',
  specialAddressInfo: null,
  
  generateNewIPv4: () => {
    const newIP = generateRandomIPv4();
    const classification = classifyIPAddress(newIP);
    set({ 
      currentIPv4: newIP,
      specialAddressInfo: classification
    });
  },
  
  setSubnetMask: (mask: number) => set({ subnetMask: mask }),
  
  setGamePhase: (phase: GamePhase) => set({ gamePhase: phase }),
  
  loseHeart: () => {
    const currentHearts = get().hearts;
    const newHearts = currentHearts - 1;
    set({ hearts: newHearts });
    
    if (newHearts <= 0) {
      get().gameOver();
    }
  },
  
  resetHearts: () => set({ hearts: 5 }),
  
  decrementTimer: () => {
    const currentTime = get().timeRemaining;
    const newTime = currentTime - 1;
    set({ timeRemaining: newTime });
    
    if (newTime <= 0) {
      get().loseHeart();
      if (get().hearts > 0) {
        get().nextRound();
      }
    }
  },
  
  resetTimer: () => set({ timeRemaining: 120 }),
  
  nextRound: () => {
    const state = get();
    set({ 
      round: state.round + 1,
      timeRemaining: 120,
      gamePhase: 'subnet-selection',
      isCounterRunning: false,
      subnetMask: 0
    });
    state.generateNewIPv4();
  },
  
  gameOver: () => {
    const state = get();
    state.updateHighScore();
    set({ gamePhase: 'game-over' });
  },
  
  restartGame: () => {
    const highScore = get().highScore;
    set({
      currentIPv4: '',
      subnetMask: 0,
      hearts: 5,
      round: 1,
      timeRemaining: 120,
      highScore,
      isCounterRunning: false,
      gamePhase: 'subnet-selection',
      specialAddressInfo: null
    });
    get().generateNewIPv4();
  },
  
  setCounterRunning: (running: boolean) => set({ isCounterRunning: running }),
  
  updateHighScore: () => {
    const state = get();
    if (state.round > state.highScore) {
      set({ highScore: state.round });
      state.saveHighScore();
    }
  },
  
  loadHighScore: () => {
    const saved = localStorage.getItem('ipv4-game-highscore');
    if (saved) {
      set({ highScore: parseInt(saved, 10) });
    }
  },
  
  saveHighScore: () => {
    const highScore = get().highScore;
    localStorage.setItem('ipv4-game-highscore', highScore.toString());
  }
}));
