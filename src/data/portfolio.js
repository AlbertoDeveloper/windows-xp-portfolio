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

export const cvHeaderLine =
  'Zacatecas / Guadalajara, Mexico | ruiz.windows@gmail.com | +52 493 107 08 35 | linkedin.com/in/alberto-ruiz-castro-08380a157'

export const cvProfessionalSummary =
  'Full Stack Software Engineer with 6+ years of experience building and improving enterprise applications for Fortune 500 organizations, including The Home Depot, Verizon, and 24 Hour Fitness. Specialized in Java, Spring Boot, and React, with a track record of increasing automated test coverage to 80%+, modernizing legacy systems, improving production reliability, and streamlining CI/CD pipelines in large-scale consulting environments.'

export const cvTechnicalSkills = [
  { category: 'Languages', items: 'Java, JavaScript, PHP' },
  { category: 'Frameworks', items: 'Spring Boot, React, Laravel' },
  { category: 'Cloud & DevOps', items: 'Google Cloud Platform, GitHub Actions, Jenkins, CI/CD' },
  { category: 'Databases', items: 'PostgreSQL, MySQL, Oracle' },
  { category: 'Testing & Tools', items: 'JUnit, Git, Postman, GitHub Copilot, Codex' },
]

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
    role: 'Full Stack Developer',
    company: 'Tata Consultancy Services | Client: The Home Depot',
    period: 'Nov 2024 - Present',
    points: [
      'Improved reliability of a nationwide internal employee platform by diagnosing and resolving production issues across Java/Spring Boot microservices and React frontend components.',
      'Increased automated test coverage from ~40% to 80%+ across multiple repositories by expanding JUnit test suites and strengthening regression coverage.',
      'Streamlined CI/CD delivery for high-availability enterprise services by migrating pipelines from Jenkins to GitHub Actions and standardizing modern deployment workflows.',
      'Delivered full-stack features for internal business applications used by store employees by building backend services in Spring Boot and frontend functionality in React.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Tata Consultancy Services | Client: Verizon',
    period: 'Oct 2022 - Oct 2024',
    points: [
      'Increased automated test coverage from ~30% to 80%+ across multiple Java/Spring services by building and expanding JUnit-based test suites, improving release stability and engineering confidence.',
      'Modernized legacy backend services by upgrading Java and Spring versions, improving maintainability, security posture, and long-term scalability.',
      'Delivered REST APIs for large-scale internal enterprise applications by developing and maintaining Java/Spring backend services that supported critical business workflows.',
      'Improved end-to-end system integration by partnering with frontend engineers to connect backend APIs with legacy UI systems.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Softtek | Client: 24 Hour Fitness',
    period: 'Jul 2021 - Sep 2022',
    points: [
      'Delivered customer-facing platform enhancements by building Java backend services and React frontend features for a nationwide fitness application.',
      'Improved platform reliability and user experience by contributing to backend API enhancements and frontend UI improvements across production features.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'TOPO',
    period: 'Dec 2019 - Jun 2021',
    points: [
      'Improved management reporting efficiency by approximately 40% by designing and developing a web-based reporting system with PHP/Laravel, relational databases, and automated reporting workflows.',
      'Increased visibility into business data by building reporting and visualization features that made operational information more accessible to management teams.',
    ],
  },
]

export const education = [
  "Bachelor's Degree in Computer Systems Engineering - Tecnologico Nacional de Mexico (TecNM), 2019",
]

export const certifications = ['GitHub Copilot Certification - Microsoft, 2025']

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
