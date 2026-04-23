'use client';

import { motion } from 'framer-motion';
import { Link } from '@/types';

interface LinksProps {
  links: Link[];
}

export default function Links({ links }: LinksProps) {
  // Gracefully hide missing links
  const activeLinks = links.filter(link => link.url && link.url !== '#' && link.url !== 'mailto:');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-lg"
    >
      <div className="border-b-2 border-black/10 pb-4">
        <h2 className="text-2xl font-display font-bold tracking-tight">COMMUNICATION_CHANNELS</h2>
        <p className="text-sm text-gray-500 font-mono mt-1 italic">Establish a connection for collaboration</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {activeLinks.map((link, idx) => (
          <motion.a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            aria-label={`Visit my ${link.title}`}
            className="flex items-center gap-4 p-4 border-2 border-black rounded-sm bg-white hover:bg-black hover:text-white transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{link.icon}</span>
            <div className="flex-1">
              <p className="font-mono font-bold text-sm tracking-tighter uppercase">{link.title}</p>
              <p className="text-[10px] font-mono opacity-50 truncate group-hover:opacity-100">{link.url.replace('mailto:', '')}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center border-2 border-current rounded-full group-hover:rotate-45 transition-transform">
               <span className="text-sm">↗</span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="pt-6 border-t-2 border-black/5 flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">System Status: Active</p>
        </div>
        <p className="text-[10px] font-mono text-gray-400">© {new Date().getFullYear()} ADNAN_RAFI. ALL_RIGHTS_RESERVED.</p>
      </div>
    </motion.div>
  );
}
