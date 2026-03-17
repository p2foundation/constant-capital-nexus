export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  postedDate: string;
  closingDate?: string;
  summary: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  bonusSkills?: string[];
  qualifications: string[];
  whyJoinUs: string;
  applicationEmail: string;
  subjectLine: string;
  isActive: boolean;
  isFeatured?: boolean;
}

export const jobListings: JobListing[] = [
  {
    id: 'it-officer-2025',
    title: 'IT Officer',
    department: 'Information Technology',
    location: 'Accra, Ghana',
    type: 'Full-Time',
    workMode: 'On-site',
    postedDate: '2025-06-01',
    summary: 'Join our team as the backbone of day-to-day IT operations, capable of acting as second-in-command to the IT Manager.',
    aboutRole: 'Constant Capital (Ghana) Limited is seeking a driven and versatile IT Officer to join our team. Reporting directly to the IT Manager, this role is pivotal — you will serve as the backbone of our day-to-day IT operations and be capable of acting as second-in-command when the need arises. We need someone who takes ownership, thinks on their feet, and keeps systems running seamlessly.',
    responsibilities: [
      'Manage and maintain the company\'s IT infrastructure, systems, and hardware',
      'Administer and monitor local area networks (LAN), WAN, and internet connectivity',
      'Provide technical support and troubleshooting for all staff across the organisation',
      'Ensure cybersecurity best practices, system backups, and data integrity',
      'Coordinate with vendors, service providers, and IT procurement',
      'Document IT processes, configurations, and incident reports',
      'Step up as acting IT lead in the absence of the IT Manager',
    ],
    requirements: [
      'IT Management',
      'Networking (LAN/WAN)',
      'Systems Administration',
      'Hardware & Software Support',
      'Troubleshooting',
      'Cybersecurity Awareness',
      'Strong Communication',
      'Proactive & Reliable',
    ],
    bonusSkills: [
      'Python',
      'JavaScript',
      'SQL',
      'PowerShell / Bash',
      'IT Helpdesk Tools',
      'ERP Systems',
    ],
    qualifications: [
      'Bachelor\'s degree or HND in Information Technology, Computer Science, or a related field',
      'Minimum 2–4 years of relevant IT experience in a corporate or financial services environment',
      'Professional certifications (e.g. CompTIA A+, Network+, CCNA) are an advantage',
      'Ability to work independently and take initiative with minimal supervision',
    ],
    whyJoinUs: 'Constant Capital is one of Ghana\'s leading investment and financial services firms. You\'ll work in a fast-paced, professional environment where your contributions are visible, valued, and impactful — with real opportunity for growth and responsibility.',
    applicationEmail: 'info@constantcap.com.gh',
    subjectLine: 'Application – IT Officer',
    isActive: true,
    isFeatured: true,
  },
];

export const departments = [
  'All Departments',
  'Information Technology',
  'Investment Banking',
  'Research & Analytics',
  'Operations',
  'Compliance & Legal',
  'Human Resources',
  'Finance & Accounting',
  'Client Relations',
];

export const jobTypes = ['All Types', 'Full-Time', 'Part-Time', 'Contract', 'Internship'];
export const workModes = ['All Modes', 'On-site', 'Remote', 'Hybrid'];
