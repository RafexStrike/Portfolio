'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  image?: string;
  links?: {
    live?: string;
    github?: string;
  };
}

interface ProjectViewProps {
  projects: Project[];
}

export default function ProjectView({ projects }: ProjectViewProps) {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Folder Sidebar */}
      <div className="w-full lg:w-40 border-r-2 border-black pr-4">
        <div className="mb-4">
          <p className="text-xs font-mono font-bold mb-3 text-gray-600">PROJECTS</p>
          <div className="space-y-2">
            {projects.map((project) => (
              <motion.button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
                className={`w-full text-left px-3 py-2 border-2 border-black rounded text-sm font-mono transition-all ${
                  selectedProject.id === project.id
                    ? 'bg-black text-white font-bold'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                📁 {project.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <motion.div
        key={selectedProject.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col gap-6"
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-1">{selectedProject.title}</h2>
          <p className="text-sm text-gray-700 font-mono">{selectedProject.subtitle}</p>
        </div>

        {/* Description & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm leading-relaxed mb-4">{selectedProject.description}</p>
            {selectedProject.features.length > 0 && (
              <div>
                <h3 className="font-bold text-sm mb-2">Features:</h3>
                <ul className="text-xs space-y-1 ml-4">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="list-disc">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Image */}
          {selectedProject.image && (
            <div className="border-3 border-black rounded overflow-hidden bg-gray-200">
              <div className="relative w-full h-48 lg:h-64">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-mono font-bold mb-2">TECH STACK</p>
          <div className="flex flex-wrap gap-2">
            {selectedProject.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 border-2 border-black rounded text-xs font-mono bg-gray-100 hover:bg-black hover:text-white transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {selectedProject.links && (
          <div className="flex gap-2 flex-wrap">
            {selectedProject.links.live && (
              <a
                href={selectedProject.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border-2 border-black rounded font-mono text-sm hover:bg-black hover:text-white transition-all"
              >
                → Live Demo
              </a>
            )}
            {selectedProject.links.github && (
              <a
                href={selectedProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border-2 border-black rounded font-mono text-sm hover:bg-black hover:text-white transition-all"
              >
                → GitHub
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
