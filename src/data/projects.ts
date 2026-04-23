import { Project } from '@/types';

export const PROJECTS: Project[] = [
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
      live: 'https://coduck.co',
      github: '', // Hidden if empty
    },
  },
];
