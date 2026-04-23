'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type LogEntry = {
  timestamp: string;
  message: string;
  id: number;
};

export default function SystemOverlay({ logs }: { logs: LogEntry[] }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* System Log (Bottom Right) */}
      <div className="fixed bottom-12 right-4 z-[90] w-64 pointer-events-none hidden lg:block">
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {logs.slice(-5).map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-black/80 backdrop-blur-md text-[10px] font-mono text-green-400 p-2 border-l-4 border-green-500 rounded-sm shadow-xl"
              >
                <span className="opacity-50 mr-2">[{log.timestamp}]</span>
                {log.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-black text-white z-[100] flex items-center justify-between px-4 font-mono text-[10px] border-t-2 border-white/10 select-none">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-bold tracking-widest">STATUS: READY</span>
          </div>
          <div className="flex items-center gap-2">
             <span className={`w-1.5 h-1.5 ${isOnline ? 'bg-blue-500' : 'bg-red-500'} rounded-full`} />
             <span className="uppercase">NETWORK: {isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <div className="hidden md:block opacity-50">
             MODE: INTERACTIVE
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden sm:block">
              OS_BUILD: v2.0.4-PROD
           </div>
           <div className="font-bold bg-white text-black px-2 py-0.5 rounded-sm">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
           </div>
        </div>
      </div>
    </>
  );
}
