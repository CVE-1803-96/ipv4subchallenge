import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

export function Notification({ message, type, show, onClose }: NotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show) return null;
  
  return (
    <div className="fixed top-24 right-4 z-40">
      <div className={`
        backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border transform transition-all duration-300
        ${type === 'success' 
          ? 'bg-emerald-500/90 border-emerald-500/30 text-white' 
          : 'bg-red-500/90 border-red-500/30 text-white animate-shake'
        }
        ${show ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center gap-2">
          {type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <XCircle className="w-5 h-5 text-red-400" />
          )}
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
