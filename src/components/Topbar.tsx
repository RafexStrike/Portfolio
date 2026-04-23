'use client';

import Clock from './Clock';

interface TopbarProps {
  onEmailClick?: () => void;
}

export default function Topbar({ onEmailClick }: TopbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white z-40 border-b-2 border-black">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Name */}
        <div className="flex items-center gap-3">
          <h1 className="font-display text-lg font-bold tracking-tight">RafiHeras</h1>
        </div>

        {/* Center: Decorative lines */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-center px-8">
          <div className="h-px bg-white flex-1 max-w-xs opacity-50"></div>
          <span className="opacity-30 text-xs">sys</span>
          <div className="h-px bg-white flex-1 max-w-xs opacity-50"></div>
        </div>

        {/* Right: Email and Time */}
        <div className="flex items-center gap-4">
          <button
            onClick={onEmailClick}
            className="hidden sm:block text-xs hover:bg-white hover:text-black px-2 py-1 border border-white rounded"
          >
            ✉ adnanrahmanrafi515@gmail.com
          </button>
          <Clock />
        </div>
      </div>
    </div>
  );
}
