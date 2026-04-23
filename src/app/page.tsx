'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import Window from '@/components/Window';
import ProjectView from '@/components/ProjectView';
import AboutMe from '@/components/AboutMe';
import Links from '@/components/Links';
import BootSequence from '@/components/BootSequence';
import CommandPalette from '@/components/CommandPalette';
import SystemOverlay, { LogEntry } from '@/components/SystemOverlay';

import { PROJECTS } from '@/data/projects';
import { DESKTOP_ICONS } from '@/data/icons';
import { PROFILE } from '@/data/profile';
import { LINKS } from '@/data/links';
import { useWindowManager } from '@/hooks/useWindowManager';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { windows, openWindow, closeWindow, focusWindow, activeWindow } = useWindowManager(
    DESKTOP_ICONS.map((i) => i.id)
  );

  const logIdRef = useRef(0);
  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    setLogs((prev) => [...prev, { id: `${Date.now()}-${logIdRef.current++}`, timestamp, message }]);
  }, []);

  // Force exit booting after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isBooting) {
      addLog('System initialized');
      addLog('Kernel loaded successfully');
    }
  }, [isBooting, addLog]);

  const handleIconClick = (id: string) => {
    const icon = DESKTOP_ICONS.find(i => i.id === id);
    addLog(`Opening ${icon?.label || id}...`);
    openWindow(id);
  };

  const handleCloseWindow = (id: string) => {
    addLog(`Closing ${id}...`);
    closeWindow(id);
  };

  const commands = [
    { id: 'open-projects', label: 'open projects', action: () => handleIconClick('projects') },
    { id: 'open-about', label: 'open about', action: () => handleIconClick('about') },
    { id: 'open-links', label: 'open links', action: () => handleIconClick('links') },
    { id: 'clear-logs', label: 'clear logs', action: () => setLogs([]) },
  ];

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <main className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Topbar */}
      <Topbar onEmailClick={() => {
        addLog('Initiating mail client...');
        window.location.href = 'mailto:adnanrahmanrafi515@gmail.com';
      }} />

      {/* Main Content Area */}
      <div className="pt-20 pb-12">
        {/* Desktop Sidebar (Right side as updated) */}
        <Sidebar icons={DESKTOP_ICONS} onClick={handleIconClick} />

        {/* Mobile Section-Based Layout */}
        <div className="lg:hidden flex flex-col gap-12 px-6 py-8">
          <section id="mobile-hero" className="py-12 border-b-2 border-black/5">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
                <h1 className="text-5xl font-display font-bold mb-4 leading-tight tracking-tighter">
                   Adnan Rafi
                </h1>
                <p className="text-lg font-mono text-gray-500 uppercase tracking-widest mb-6">
                   Full Stack Developer
                </p>
                <div className="flex gap-2">
                   <button 
                     onClick={() => handleIconClick('projects')}
                     className="bg-black text-white px-6 py-3 font-mono font-bold text-xs rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                   >
                     VIEW_PROJECTS()
                   </button>
                </div>
             </motion.div>
          </section>

          {/* Mobile Grid Navigation */}
          <div className="grid grid-cols-1 gap-4">
             <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">Navigation_Nodes</p>
            {DESKTOP_ICONS.map((icon) => (
              <button
                key={icon.id}
                onClick={() => handleIconClick(icon.id)}
                className="flex items-center gap-4 p-5 bg-white border-2 border-black rounded-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                aria-label={`Open ${icon.label}`}
              >
                <span className="text-3xl">{icon.icon}</span>
                <div className="text-left">
                   <span className="block text-sm font-mono font-bold uppercase tracking-tighter">{icon.label}</span>
                   <span className="block text-[10px] text-gray-500">{icon.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Welcome State */}
        <AnimatePresence>
          {!activeWindow && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden lg:flex fixed inset-0 items-center justify-center -z-10"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4 }}
                  className="relative"
                >
                   <div className="absolute -inset-10 bg-black/5 blur-3xl rounded-full" />
                   <h1 className="text-[12rem] font-display font-bold opacity-[0.03] select-none tracking-tighter">
                      RAFI
                   </h1>
                </motion.div>
                <div className="mt-[-4rem]">
                   <h2 className="text-6xl font-display font-bold mb-4 tracking-tighter">Welcome</h2>
                   <p className="text-lg text-gray-500 font-mono tracking-widest uppercase">Kernel Version 2.0.4-PROD</p>
                   <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono text-gray-400">
                      <span>PRESS <kbd className="bg-gray-200 px-2 py-1 border border-black/10 rounded font-bold text-black">/</kbd> FOR COMMANDS</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>CLICK ICONS TO INTERACT</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Windows Layer */}
      {windows.map((win) => (
        <Window
          key={win.id}
          isOpen={win.isOpen}
          onClose={() => handleCloseWindow(win.id)}
          title={DESKTOP_ICONS.find(i => i.id === win.id)?.label || win.id}
          zIndex={win.zIndex}
          onFocus={() => focusWindow(win.id)}
          maxWidth={win.id === 'projects' ? 'max-w-6xl' : win.id === 'about' ? 'max-w-4xl' : 'max-w-2xl'}
        >
          {win.id === 'projects' && <ProjectView projects={PROJECTS} />}
          {win.id === 'about' && <AboutMe profile={PROFILE} />}
          {win.id === 'links' && <Links links={LINKS} />}
        </Window>
      ))}

      {/* Overlays */}
      <CommandPalette commands={commands} />
      <SystemOverlay logs={logs} />
    </main>
  );
}
