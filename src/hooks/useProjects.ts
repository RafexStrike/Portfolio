import { useState, useMemo } from 'react';
import { Project } from '@/types';
import { PROJECTS } from '@/data/projects';

export function useProjects() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(PROJECTS[0]?.id || null);

  const selectedProject = useMemo(() => {
    return PROJECTS.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId]);

  const selectProject = (id: string) => {
    setSelectedProjectId(id);
  };

  return {
    projects: PROJECTS,
    selectedProject,
    selectProject,
  };
}
