export type Project = {
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
};

export type Icon = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type Education = {
  degree: string;
  school: string;
  year: string;
};

export type Link = {
  title: string;
  url: string;
  icon: string;
};

export type Profile = {
  name: string;
  role: string;
  summary: string;
  skills: SkillCategory[];
  education: Education[];
};
