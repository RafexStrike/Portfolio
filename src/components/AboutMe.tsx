'use client';

import { motion } from 'framer-motion';
import { Profile } from '@/types';

interface AboutMeProps {
  profile: Profile;
}

export default function AboutMe({ profile }: AboutMeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-3xl"
    >
      {/* Header */}
      <div className="border-b-2 border-black/10 pb-6">
        <h2 className="text-4xl font-display font-bold mb-2 tracking-tight">{profile.name}</h2>
        <p className="text-base font-mono text-gray-500 mb-4 italic uppercase tracking-wider">{profile.role}</p>
        <div className="bg-black text-white p-4 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
           <p className="text-base leading-relaxed font-mono opacity-90">{profile.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills */}
        {profile.skills.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Core Competencies
            </h3>
            <div className="space-y-4">
              {profile.skills.map((skill, idx) => (
                <div key={idx} className="group">
                  <p className="text-[10px] font-mono font-bold text-gray-400 mb-2 uppercase tracking-widest group-hover:text-black transition-colors">
                    {skill.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 border-2 border-black rounded text-[10px] font-mono font-bold bg-white hover:bg-black hover:text-white transition-all cursor-default"
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
        {profile.education.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display flex items-center gap-2">
               <span className="w-2 h-2 bg-black rounded-full"></span>
               Academic Background
            </h3>
            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-black pl-4 py-2 bg-gray-50 rounded-r-sm hover:bg-gray-100 transition-colors"
                >
                  <p className="font-mono font-bold text-sm text-black">{edu.degree}</p>
                  <p className="text-xs text-gray-600 font-medium">{edu.school}</p>
                  {edu.year && (
                    <div className="mt-2 inline-block px-2 py-0.5 bg-black text-white text-[10px] font-mono rounded">
                      {edu.year}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
