'use client';

import { motion } from 'framer-motion';

interface AboutMeProps {
  name?: string;
  role?: string;
  summary?: string;
  skills?: {
    category: string;
    items: string[];
  }[];
  education?: {
    degree: string;
    school: string;
    year?: string;
  }[];
}

export default function AboutMe({
  name = 'Adnan Rafi',
  role = 'Full Stack Developer',
  summary = 'Aspiring full-stack developer focused on building scalable systems and real-world products.',
  skills = [],
  education = [],
}: AboutMeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-2xl"
    >
      {/* Header */}
      <div className="border-b-2 border-black pb-4">
        <h2 className="text-3xl font-display font-bold mb-1">{name}</h2>
        <p className="text-sm font-mono text-gray-700 mb-3">{role}</p>
        <p className="text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 font-display">SKILLS</h3>
          <div className="space-y-3">
            {skills.map((skill, idx) => (
              <div key={idx}>
                <p className="text-xs font-mono font-bold text-gray-600 mb-1">{skill.category}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 border-2 border-black rounded text-xs font-mono bg-gray-100 hover:bg-black hover:text-white transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 font-display">EDUCATION</h3>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="border-l-3 border-black pl-3 py-1"
              >
                <p className="font-mono font-bold text-sm">{edu.degree}</p>
                <p className="text-xs text-gray-700">{edu.school}</p>
                {edu.year && <p className="text-xs text-gray-600 font-mono">{edu.year}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
