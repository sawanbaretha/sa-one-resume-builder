export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photoUrl?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1 to 5
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // e.g., Native, Fluent, Intermediate
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

export type TemplateId = 'modern' | 'minimal' | 'sidebar' | 'classic' | 'creative';

export type FontFamily = 'Inter' | 'Plus Jakarta Sans' | 'Roboto' | 'Merriweather' | 'Outfit';

export interface Customization {
  templateId: TemplateId;
  primaryColor: string;
  fontFamily: FontFamily;
  fontSize: 'sm' | 'md' | 'lg';
  spacing: 'compact' | 'normal' | 'spacious';
  showPhoto: boolean;
}
