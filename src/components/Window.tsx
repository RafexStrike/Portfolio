'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
  fullScreen?: boolean;
}

export default function Window({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-3xl',
  fullScreen = false,
}: WindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
          />

          {/* Window */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className={`fixed z-40 ${fullScreen ? 'inset-0' : `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${maxWidth} w-11/12 max-h-[90vh]`}`}
          >
            <div className="pixel-border bg-white shadow-lg overflow-hidden flex flex-col h-full">
              {/* Window Header */}
              <div className="window-header flex justify-between items-center">
                <h2 className="text-white font-mono font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="bg-transparent border-0 text-white text-xl hover:bg-white hover:text-black w-6 h-6 flex items-center justify-center rounded"
                  aria-label="Close window"
                >
                  ✕
                </button>
              </div>

              {/* Window Body */}
              <div className="window-body overflow-y-auto flex-1">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
