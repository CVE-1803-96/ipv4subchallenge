import { useState } from 'react';
import { useGameState } from '@/lib/game-state';
import { calculateSubnetProperties, isValidIPAddress } from '@/lib/ip-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CalculationForm() {
  const { 
    gamePhase, 
    currentIPv4, 
    subnetMask, 
    nextRound, 
    loseHeart 
  } = useGameState();
  
  const [formData, setFormData] = useState({
    networkAddress: '',
    broadcastAddress: '',
    firstUsableAddress: '',
    lastUsableAddress: ''
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    // Validate all inputs are IP addresses
    const isValidForm = Object.values(formData).every(ip => 
      ip.trim() !== '' && isValidIPAddress(ip)
    );
    
    if (!isValidForm) {
      loseHeart();
      return;
    }
    
    // Calculate correct answers
    const correct = calculateSubnetProperties(currentIPv4, subnetMask);
    
    // Check if answers are correct
    const isCorrect = 
      formData.networkAddress === correct.networkAddress &&
      formData.broadcastAddress === correct.broadcastAddress &&
      formData.firstUsableAddress === correct.firstUsableAddress &&
      formData.lastUsableAddress === correct.lastUsableAddress;
    
    if (isCorrect) {
      nextRound();
    } else {
      loseHeart();
    }
    
    // Reset form
    setFormData({
      networkAddress: '',
      broadcastAddress: '',
      firstUsableAddress: '',
      lastUsableAddress: ''
    });
  };
  
  if (gamePhase !== 'calculation') return null;
  
  return (
    <div className="mb-8">
      <div className="bg-slate-900/30 rounded-xl p-6 border border-cyan-500/20">
        <h3 className="font-orbitron text-xl font-bold game-accent mb-6 text-center">
          Calculate Network Properties
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2">
                Network Address:
              </Label>
              <Input
                type="text"
                className="bg-slate-800/50 border border-cyan-500/30 text-white font-mono focus:ring-cyan-500/50 focus:border-cyan-500"
                placeholder="192.168.1.0"
                value={formData.networkAddress}
                onChange={(e) => handleInputChange('networkAddress', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2">
                Broadcast Address:
              </Label>
              <Input
                type="text"
                className="bg-slate-800/50 border border-cyan-500/30 text-white font-mono focus:ring-cyan-500/50 focus:border-cyan-500"
                placeholder="192.168.1.255"
                value={formData.broadcastAddress}
                onChange={(e) => handleInputChange('broadcastAddress', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2">
                First Usable Address:
              </Label>
              <Input
                type="text"
                className="bg-slate-800/50 border border-cyan-500/30 text-white font-mono focus:ring-cyan-500/50 focus:border-cyan-500"
                placeholder="192.168.1.1"
                value={formData.firstUsableAddress}
                onChange={(e) => handleInputChange('firstUsableAddress', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2">
                Last Usable Address:
              </Label>
              <Input
                type="text"
                className="bg-slate-800/50 border border-cyan-500/30 text-white font-mono focus:ring-cyan-500/50 focus:border-cyan-500"
                placeholder="192.168.1.254"
                value={formData.lastUsableAddress}
                onChange={(e) => handleInputChange('lastUsableAddress', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            onClick={handleSubmit}
          >
            Submit Calculation
          </Button>
        </div>
      </div>
    </div>
  );
}
