'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/types';

interface SidebarProps {
  icons: Icon[];
  onIconClick: (id: string) => void;
}

export default function Sidebar({ icons, onIconClick }: SidebarProps) {
  return (
    <div className="hidden lg:fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 p-4 w-32 z-20">
      {icons.map((icon, index) => (
        <motion.button
          key={icon.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          onClick={() => onIconClick(icon.id)}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Open ${icon.label} window`}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-16 h-16 border-3 border-black rounded-lg flex items-center justify-center bg-white text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-all group-hover:shadow-none">
            {icon.icon}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono font-bold uppercase tracking-tighter text-black bg-white px-1 border border-black">
              {icon.label}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
