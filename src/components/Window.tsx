'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
  zIndex?: number;
  onFocus?: () => void;
}

export default function Window({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-3xl',
  zIndex = 40,
  onFocus,
}: WindowProps) {
  const constraintsRef = useRef(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-30 lg:bg-black/10 lg:backdrop-blur-[1px] lg:block hidden"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Window Container - wrapped in backdrop */}
          <motion.div
            ref={constraintsRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              drag
              dragMomentum={false}
              dragConstraints={constraintsRef}
              onPointerDown={onFocus}
              onClick={(e) => e.stopPropagation()}
              className={`pointer-events-auto absolute 
                lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 
                top-0 left-0 right-0 bottom-0 lg:bottom-auto lg:right-auto
                ${maxWidth} w-full lg:w-11/12 max-h-screen lg:max-h-[90vh] flex flex-col`}
            >
              <div className="pixel-border bg-white shadow-2xl overflow-hidden flex flex-col h-full m-2 lg:m-0">
                {/* Window Header */}
                <div 
                  className="window-header flex justify-between items-center cursor-grab active:cursor-grabbing select-none"
                  aria-label={`Drag ${title} window`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-xs font-mono">■</span>
                    <h2 className="text-white font-mono font-bold text-sm lg:text-base truncate">{title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={onClose}
                      className="bg-red-500/20 border-2 border-red-500/50 text-red-500 text-xs hover:bg-red-500 hover:text-white w-6 h-6 flex items-center justify-center rounded transition-colors"
                      aria-label={`Close ${title} window`}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Window Body */}
                <div className="window-body overflow-y-auto flex-1 p-4 lg:p-6 bg-white relative">
                  {/* Sticky close button for mobile as requested */}
                  <div className="lg:hidden sticky top-0 right-0 flex justify-end mb-4 z-10">
                     <button
                        onClick={onClose}
                        className="bg-black text-white px-3 py-1 text-xs font-mono rounded border-2 border-black"
                        aria-label="Close"
                      >
                        CLOSE [X]
                      </button>
                  </div>
                  {children}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
