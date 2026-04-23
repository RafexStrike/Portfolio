import { Profile } from '@/types';

export const PROFILE: Profile = {
  name: 'Adnan Rafi',
  role: 'Full Stack Developer',
  summary:
    'Aspiring full-stack developer focused on building scalable systems and real-world products. Passionate about AI, web technologies, and creating intuitive user experiences.',
  skills: [
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
  ],
  education: [
    {
      degree: 'BSc IoT & Robotics Engineering',
      school: 'University of Engineering',
      year: '4th Year',
    },
  ],
};
