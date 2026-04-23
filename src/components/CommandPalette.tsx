'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  id: string;
  label: string;
  action: () => void;
}

export default function CommandPalette({ commands }: { commands: Command[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleExecute = (cmd: Command) => {
    cmd.action();
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 overflow-hidden"
          >
            <div className="p-4 border-b-4 border-black flex items-center gap-3">
              <span className="text-xl font-mono font-bold text-gray-400">/</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter command (e.g. open projects)..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-lg focus:ring-0 p-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredCommands.length > 0) {
                    handleExecute(filteredCommands[0]);
                  }
                }}
              />
              <div className="text-[10px] font-mono bg-gray-100 px-2 py-1 border-2 border-black rounded uppercase font-bold text-gray-400">
                ESC to Exit
              </div>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleExecute(cmd)}
                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-between group transition-colors"
                  >
                    <span className="font-mono font-bold uppercase tracking-tighter">{cmd.label}</span>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 font-mono">↵ EXECUTE</span>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 font-mono text-sm">
                  NO_COMMANDS_FOUND_MATCHING: "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
