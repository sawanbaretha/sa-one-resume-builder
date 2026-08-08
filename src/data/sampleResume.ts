import type { ResumeData, Customization } from '../types/resume';

export const initialResumeData: ResumeData = {
  personalDetails: {
    fullName: "Sawan Baretha",
    jobTitle: "Senior Full Stack Engineer",
    email: "sawan@gmail.com",
    phone: "+91 7617XXXXXX",
    location: "Gwalior, MP",
    website: "https://sawanbaretha.dev",
    linkedin: "linkedin.com/in/sawanbaretha",
    github: "github.com/sawanbaretha",
    summary: "Dynamic Senior Software Engineer with expertise in building high-scale modern web applications, cloud microservices, and slick user interfaces. Proven track record of spearheading cross-functional engineering teams, optimizing performance, and architecting scalable backend APIs."
  },
  experiences: [
    {
      id: "exp-1",
      jobTitle: "Senior Full Stack Engineer",
      company: "Nexus Cloud Solutions",
      location: "Gwalior, MP",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      description: "• Architected micro-frontend architecture using React, Vite, and GraphQL, reducing initial page load time by 42%.\n• Managed a team of 5 engineers delivering high-performance SaaS cloud dashboard handling 2M+ monthly active users.\n• Implemented automated CI/CD deployment pipelines using GitHub Actions and AWS ECS with zero-downtime releases."
    },
    {
      id: "exp-2",
      jobTitle: "Software Engineer",
      company: "Apex Tech Labs",
      location: "India",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description: "• Developed responsive React web applications and Node.js RESTful APIs for fintech analytics platform.\n• Integrated WebSockets and Redis caching layer to handle real-time market data visualization for 500k active trade streams.\n• Mentored junior developers and introduced automated Jest & Cypress testing suites, raising code coverage from 60% to 92%."
    }
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Madhav Institute of Technology & Science",
      degree: "Bachelor of Technology",
      fieldOfStudy: "Computer Science & Engineering",
      startDate: "2015-08",
      endDate: "2019-05",
      location: "Gwalior, MP",
      gpa: "8.5 / 10"
    }
  ],
  skills: [
    { id: "sk-1", name: "React / Next.js", category: "Frontend", level: 5 },
    { id: "sk-2", name: "TypeScript / JavaScript", category: "Frontend", level: 5 },
    { id: "sk-3", name: "Node.js / Express", category: "Backend", level: 4 },
    { id: "sk-4", name: "PostgreSQL / Prisma", category: "Backend", level: 4 },
    { id: "sk-5", name: "Tailwind / Vanilla CSS", category: "Frontend", level: 5 },
    { id: "sk-6", name: "Docker & AWS", category: "DevOps", level: 3 },
    { id: "sk-7", name: "GraphQL & REST APIs", category: "Backend", level: 5 },
    { id: "sk-8", name: "Jest & Cypress", category: "Testing", level: 4 }
  ],
  projects: [
    {
      id: "proj-1",
      name: "PulseEngine AI - Developer Workspace",
      description: "An AI-powered live collaborative code editor featuring web containers, real-time sync, and intelligent code completions.",
      technologies: ["React", "TypeScript", "Node.js", "WebSockets", "TailwindCSS"],
      link: "https://pulseengine.dev",
      githubLink: "github.com/sawanbaretha/pulseengine"
    },
    {
      id: "proj-2",
      name: "CloudMetrics Dashboard",
      description: "Open-source monitoring analytics suite for Kubernetes clusters providing interactive metrics & alert routing.",
      technologies: ["Next.js", "Go", "Prometheus", "Chart.js"],
      link: "https://cloudmetrics.io",
      githubLink: "github.com/sawanbaretha/cloudmetrics"
    }
  ],
  certifications: [
    { id: "cert-1", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "2023" },
    { id: "cert-2", name: "Meta Professional Full-Stack Software Developer", issuer: "Coursera / Meta", date: "2021" }
  ],
  languages: [
    { id: "lang-1", name: "Hindi", proficiency: "Native / Bilingual" },
    { id: "lang-2", name: "English", proficiency: "Professional Working" }
  ]
};

export const defaultCustomization: Customization = {
  templateId: 'modern',
  primaryColor: '#2563eb', // Electric Slate Blue
  fontFamily: 'Plus Jakarta Sans',
  fontSize: 'md',
  spacing: 'normal',
  showPhoto: false
};
