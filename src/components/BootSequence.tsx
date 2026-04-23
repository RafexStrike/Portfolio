'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const bootMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING CORE MODULES...',
    'ESTABLISHING SECURE CONNECTION...',
    'MOUNTING FILESYSTEM...',
    'STARTING INTERFACE...',
    'READY.'
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setLines((prev) => [...prev, bootMessages[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-md space-y-1">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-sm ${i === bootMessages.length - 1 ? 'text-green-500 font-bold' : 'text-gray-400'}`}
          >
            <span className="mr-2 text-gray-600">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            {line}
          </motion.p>
        ))}
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-green-500 ml-1"
        />
      </div>
      
      {/* Retro CRT Scanlines Effect (duplicated from globals but stronger here) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
}
