'use client';

import { useState } from 'react';
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import Window from '@/components/Window';
import ProjectView from '@/components/ProjectView';
import AboutMe from '@/components/AboutMe';
import Links from '@/components/Links';

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

const PROJECTS: Project[] = [
  {
    id: 'coduck',
    name: 'Coduck',
    title: 'CoDuck',
    subtitle: 'Innovation in Web Maintenance',
    description:
      'CoDuck is a platform specialized in offering unlimited maintenance and technical support for websites. Designed for small businesses, it ensures content updating, technical troubleshooting, speed optimization and design customization. All managed efficiently through Trello. CoDuck\'s website, built on WordPress with integrations in Stripe, JavaScript, and PHP, focused on a minimalist design optimized for conversion. The main challenge was to create a fast and functional platform that facilitated the user experience, ensuring intuitive and efficient navigation.',
    features: [
      'Unlimited maintenance and support',
      'Content updating and optimization',
      'Speed optimization',
      'Design customization',
      'Trello-based workflow management',
      'Stripe payment integration',
    ],
    tech: ['WordPress', 'Elementor', 'PHP', 'JavaScript', 'Stripe'],
    image: 'https://i.postimg.cc/QMVmwqTk/formal-dp1687098306233.jpg',
    links: {
      live: '#',
      github: '#',
    },
  },
  {
    id: 'luminal',
    name: 'Luminal',
    title: 'Luminal AI',
    subtitle: 'All-in-one Learning Platform for Students',
    description:
      'AI-powered student platform with conversational tutoring and adaptive learning workflows. Luminal AI leverages cutting-edge language models to provide personalized tutoring experiences, spaced repetition learning, and adaptive difficulty progression. Built with scalable architecture and modern web technologies.',
    features: [
      'RAG-based retrieval system using embeddings',
      'Context-aware AI responses',
      'Spaced repetition system (FSRS-inspired)',
      'Adaptive difficulty progression',
      'Conversational tutoring interface',
      'Progress tracking and analytics',
    ],
    tech: ['Next.js', 'HuggingFace', 'MongoDB', 'Tailwind', 'Better Auth', 'LLMs', 'RAG'],
    image: 'https://i.postimg.cc/5ypFfhc8/Screenshot-from-2026-04-23-12-19-51.png',
    links: {
      live: 'https://luminal-ai.vercel.app',
      github: 'https://github.com/RafexStrike/Luminal-AI',
    },
  },
  {
    id: 'flatmotion',
    name: 'FlatMotion',
    title: 'FlatMotion',
    subtitle: 'AI-powered Mathematical Animation Generator',
    description:
      'Transform math prompts into beautiful, animated visualizations. FlatMotion uses advanced rendering and async job queue systems to generate complex mathematical animations from natural language descriptions. Built for educators and students who want to visualize abstract concepts.',
    features: [
      'Async rendering system with job queue',
      'Retry and failure handling',
      'Real-time polling updates',
      'Cloudinary video storage',
      'Multiple animation templates',
      'High-performance rendering engine',
    ],
    tech: ['Next.js', 'Express', 'PostgreSQL', 'Prisma', 'Docker', 'Cloudinary', 'Canvas API'],
    image: 'https://i.postimg.cc/6QR282Jw/Screenshot-from-2026-04-23-12-21-33.png',
    links: {
      live: 'https://flat-motion.vercel.app',
      github: 'https://github.com/RafexStrike/FlatMotion-Client',
    },
  },
];

const DESKTOP_ICONS = [
  {
    id: 'projects',
    label: 'Projects',
    icon: '🗂️',
    description: 'View my projects',
  },
  {
    id: 'about',
    label: 'About Me',
    icon: '👤',
    description: 'About me',
  },
  {
    id: 'links',
    label: 'Links',
    icon: '🔗',
    description: 'Contact & socials',
  },
];

const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma'],
  },
  {
    category: 'AI & ML',
    items: ['LLMs', 'RAG', 'Embeddings', 'HuggingFace'],
  },
  {
    category: 'DevOps',
    items: ['Docker', 'Vercel', 'Render', 'GitHub Actions'],
  },
];

const EDUCATION = [
  {
    degree: 'BSc IoT & Robotics Engineering',
    school: 'University of Engineering',
    year: '4th Year',
  },
];

export default function Home() {
  const [openWindow, setOpenWindow] = useState<string | null>(null);

  const handleIconClick = (id: string) => {
    setOpenWindow(id);
  };

  const handleCloseWindow = () => {
    setOpenWindow(null);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Topbar */}
      <Topbar onEmailClick={() => window.location.href = 'mailto:adnanrahmanrafi515@gmail.com'} />

      {/* Main Content Area */}
      <div className="pt-16 pb-8">
        {/* Desktop Sidebar */}
        <Sidebar icons={DESKTOP_ICONS} onIconClick={handleIconClick} />

        {/* Mobile Navigation */}
        <div className="lg:hidden px-4 py-8">
          <div className="grid grid-cols-3 gap-4">
            {DESKTOP_ICONS.map((icon) => (
              <button
                key={icon.id}
                onClick={() => handleIconClick(icon.id)}
                className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded hover:bg-black hover:text-white transition-all"
              >
                <span className="text-2xl">{icon.icon}</span>
                <span className="text-xs font-mono font-semibold text-center">{icon.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Welcome Message for Desktop */}
        {openWindow === null && (
          <div className="flex items-center justify-center min-h-screen -mt-16">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Welcome</h1>
              <p className="text-lg text-gray-700 font-mono">to RafiHeras' Portfolio</p>
              <p className="text-sm text-gray-600 mt-4">Click an icon to explore</p>
            </div>
          </div>
        )}
      </div>

      {/* Windows */}
      <Window
        isOpen={openWindow === 'projects'}
        onClose={handleCloseWindow}
        title="Projects"
        maxWidth="max-w-5xl"
      >
        <ProjectView projects={PROJECTS} />
      </Window>

      <Window
        isOpen={openWindow === 'about'}
        onClose={handleCloseWindow}
        title="About Me"
        maxWidth="max-w-3xl"
      >
        <AboutMe
          name="Adnan Rafi"
          role="Full Stack Developer"
          summary="Aspiring full-stack developer focused on building scalable systems and real-world products. Passionate about AI, web technologies, and creating intuitive user experiences."
          skills={SKILLS}
          education={EDUCATION}
        />
      </Window>

      <Window
        isOpen={openWindow === 'links'}
        onClose={handleCloseWindow}
        title="Get In Touch"
        maxWidth="max-w-2xl"
      >
        <Links
          links={[
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
              icon: '✉️',
            },
          ]}
        />
      </Window>
    </main>
  );
}
