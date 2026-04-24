'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectViewProps {
  projects: Project[];
}

function ProjectView({ projects }: ProjectViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id || null);
  const [imgLoading, setImgLoading] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  // Debug log to verify render behavior
  console.log("ProjectView render - selectedProject:", selectedProject?.id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Folder Sidebar */}
      <div className="w-full lg:w-48 border-r-0 lg:border-r-2 border-black/10 lg:pr-4">
        <div className="mb-4">
          <p className="text-[10px] font-mono font-bold mb-3 text-gray-400 uppercase tracking-widest">Available Modules</p>
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {projects.map((project) => (
              <motion.button
                key={project.id}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setImgLoading(true);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`View ${project.name} project`}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 border-2 border-black rounded text-xs font-mono transition-all flex items-center gap-2 ${
                  selectedProjectId === project.id
                    ? 'bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <span className="text-base">{selectedProjectId === project.id ? '📂' : '📁'}</span>
                <span className="truncate">{project.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div>
                <h2 className="text-2xl lg:text-4xl font-display font-bold mb-1 tracking-tight text-black">
                  {selectedProject.title}
                </h2>
                <p className="text-sm text-gray-500 font-mono italic">{selectedProject.subtitle}</p>
              </div>

              {/* Description & Features */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-800 font-medium">
                    {selectedProject.description}
                  </p>
                  
                  {selectedProject.features.length > 0 && (
                    <div className="bg-gray-50 p-4 border-l-4 border-black rounded">
                      <h3 className="font-bold text-sm mb-3 uppercase tracking-tighter">Key Capabilities:</h3>
                      <ul className="text-xs space-y-2 ml-1">
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-black/30 mt-0.5">↳</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Image Section */}
                <div className="space-y-4">
                  {selectedProject.image && (
                    <div className="border-3 border-black rounded overflow-hidden bg-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] relative group">
                      {/* Skeleton Loader */}
                      {imgLoading && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
                          <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
                        </div>
                      )}
                      
                      <div className="relative w-full h-56 lg:h-72 ">
                        <Image
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          fill
                          unoptimized
                          className="object-cover"
                          onLoadingComplete={() => setImgLoading(false)}
                          onError={(e) => {
                            e.currentTarget.src = "/fallback.png";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 flex-wrap">
                    {selectedProject.links?.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-3  text-white rounded font-mono text-xs font-bold hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                        aria-label="Visit live project"
                      >
                        RUN_APPLICATION()
                      </a>
                    )}
                    {selectedProject.links?.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-3 border-2 border-black rounded font-mono text-xs font-bold hover:bg-gray-100 transition-all"
                        aria-label="View source code on GitHub"
                      >
                        VIEW_SOURCE.sh
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="pt-4 border-t-2 border-black/5">
                <p className="text-[10px] font-mono font-bold mb-3 text-gray-400 uppercase tracking-widest">Environment / Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 border-2 border-black/10 rounded text-[10px] font-mono font-bold bg-white hover:border-black transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400 font-mono">
              <span className="text-4xl mb-4">🔍</span>
              <p>Select a project from the sidebar to begin.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default React.memo(ProjectView);
