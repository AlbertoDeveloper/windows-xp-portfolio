import {
  FileText,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  User,
  Wrench,
} from 'lucide-react'

export const profile = {
  name: 'Alberto Ruiz Castro',
  role: 'Software Engineer',
  summary:
    'Software engineer focused on Java, Spring Boot, React, enterprise platforms, automated testing, and CI/CD modernization.',
  email: 'your-email@example.com',
  phone: '+52 000 000 0000',
  linkedin: 'https://www.linkedin.com/in/alberto-ruiz-castro-08380a157/',
  github: 'https://github.com/AlbertoDeveloper',
}

export const desktopIcons = [
  { id: 'cv', label: 'Alberto CV', icon: FileText, type: 'window', windowId: 'cv' },
  { id: 'about', label: 'About Me', icon: User, type: 'window', windowId: 'about' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, type: 'window', windowId: 'projects' },
  { id: 'skills', label: 'Tech Stack', icon: Wrench, type: 'window', windowId: 'skills' },
  { id: 'contact', label: 'Contact', icon: Mail, type: 'window', windowId: 'contact' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, type: 'link', href: profile.linkedin },
  { id: 'github', label: 'GitHub', icon: Github, type: 'link', href: profile.github },
]

export const initialWindows = {
  about: { title: 'About Me', open: false, minimized: false },
  cv: { title: 'Alberto_CV.txt', open: true, minimized: false },
  projects: { title: 'Projects Explorer', open: false, minimized: false },
  skills: { title: 'Tech Stack', open: false, minimized: false },
  contact: { title: 'Contact Info', open: false, minimized: false },
}

export const experience = [
  {
    role: 'Software Engineer',
    company: 'TCS / The Home Depot',
    period: 'Nov 2024 – Mar 2026',
    points: [
      'Migrated CI pipelines from Jenkins to GitHub Actions using reusable workflows.',
      'Improved reliability and automated test coverage across multiple repositories.',
      'Supported modern Spring Boot and Java-based internal platforms used at enterprise scale.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'TCS / Verizon',
    period: 'Oct 2022 – Oct 2024',
    points: [
      'Worked on full-stack enterprise systems using Java, Spring Boot, React, and SQL.',
      'Contributed to stability improvements, testing, and ongoing maintenance of production apps.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Softtek / 24 Hour Fitness',
    period: 'Earlier Experience',
    points: [
      'Built and supported backend services with Spring Boot and relational databases.',
    ],
  },
]

export const projects = [
  {
    name: 'CI/CD Modernization',
    description:
      'Migrated legacy Jenkins pipelines to GitHub Actions with reusable workflows and a cleaner deployment flow.',
    stack: 'GitHub Actions, Jenkins, Java, Spring Boot',
  },
  {
    name: 'Enterprise Web Platforms',
    description:
      'Worked on employee-facing internal platforms focused on reliability, performance, and maintainability.',
    stack: 'React, JavaScript, Spring Boot, PostgreSQL',
  },
  {
    name: 'Test Coverage Initiative',
    description:
      'Raised automated test coverage significantly across several repositories and improved deployment confidence.',
    stack: 'JUnit, Java, CI pipelines',
  },
]

export const skills = [
  'Java',
  'Spring Boot',
  'React',
  'JavaScript',
  'GitHub Actions',
  'Jenkins',
  'PostgreSQL',
  'MySQL',
  'JUnit',
  'GCP',
  'PCF',
  'Pub/Sub',
  'REST APIs',
  'Grafana',
  'Looker',
]
