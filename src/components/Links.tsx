'use client';

import { motion } from 'framer-motion';

interface Link {
  title: string;
  url: string;
  icon: string;
}

interface LinksProps {
  links?: Link[];
}

export default function Links({
  links = [
    {
      title: 'GitHub',
      url: 'https://github.com/RafexStrike',
      icon: '🔗',
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/adnan-rafi/',
      icon: '💼',
    },
    {
      title: 'Portfolio',
      url: 'https://adnan-rafi.netlify.app/',
      icon: '🌐',
    },
    {
      title: 'Email',
      url: 'mailto:adnanrahmanrafi515@gmail.com',
      icon: '✉',
    },
  ],
}: LinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 max-w-md"
    >
      <div className="border-b-2 border-black pb-4">
        <h2 className="text-2xl font-display font-bold">GET IN TOUCH</h2>
        <p className="text-sm text-gray-700 mt-1">Let's connect and collaborate</p>
      </div>

      <div className="space-y-3">
        {links.map((link, idx) => (
          <motion.a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className="flex items-center gap-3 p-3 border-2 border-black rounded hover:bg-black hover:text-white transition-all group"
          >
            <span className="text-2xl">{link.icon}</span>
            <div className="flex-1">
              <p className="font-mono font-bold text-sm">{link.title}</p>
              <p className="text-xs opacity-70 group-hover:opacity-100">{link.url}</p>
            </div>
            <span className="text-xl group-hover:scale-125 transition-transform">→</span>
          </motion.a>
        ))}
      </div>

      <div className="pt-4 border-t-2 border-black text-xs text-gray-600">
        <p>Built with Next.js, Tailwind CSS & Framer Motion</p>
        <p className="mt-2">© 2024 Adnan Rafi. All rights reserved.</p>
      </div>
    </motion.div>
  );
}
