'use client';

import { motion } from 'framer-motion';

interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  description?: string;
}

interface SidebarProps {
  icons: DesktopIcon[];
  onIconClick: (id: string) => void;
}

export default function Sidebar({ icons, onIconClick }: SidebarProps) {
  return (
    <div className="hidden lg:fixed right-0 top-20 flex-col gap-8 p-8 w-40">
      {icons.map((icon, index) => (
        <motion.button
          key={icon.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onIconClick(icon.id)}
          className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity group"
        >
          <div className="w-16 h-16 border-3 border-black rounded flex items-center justify-center bg-white text-3xl hover:bg-black hover:text-white transition-all">
            {icon.icon}
          </div>
          <span className="text-xs font-mono text-center font-semibold text-black group-hover:text-black">
            {icon.label}
          </span>
          {icon.description && (
            <span className="text-[10px] text-gray-600 text-center group-hover:text-black">
              {icon.description}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
