'use client';

import Clock from './Clock';
import { motion } from 'framer-motion';

interface TopbarProps {
  onEmailClick?: () => void;
}

export default function Topbar({ onEmailClick }: TopbarProps) {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-black text-white z-[90] border-b-2 border-white/10"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Name */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
             <span className="text-black font-mono font-bold text-xs">R</span>
          </div>
          <h1 className="font-display text-lg font-bold tracking-tighter uppercase">Adnan Rafi</h1>
        </div>

        {/* Center: Desktop Only */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-center px-8">
          <div className="h-[2px] bg-white/20 flex-1 max-w-[100px]"></div>
          <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.3em]">Kernel_Interface</span>
          <div className="h-[2px] bg-white/20 flex-1 max-w-[100px]"></div>
        </div>

        {/* Right: Email and Time */}
        <div className="flex items-center gap-4">
          <button
            onClick={onEmailClick}
            aria-label="Send email"
            className="hidden sm:flex items-center gap-2 text-[10px] font-mono font-bold hover:bg-white hover:text-black px-2 py-1 border border-white/30 rounded transition-all"
          >
            <span className="text-sm">✉</span>
            <span>CONTACT_ME</span>
          </button>
          <div className="h-4 w-[1px] bg-white/20 hidden sm:block"></div>
          <Clock />
        </div>
      </div>
    </motion.div>
  );
}
