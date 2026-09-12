// Professional-grade mock data for the Academia-Industry Collaboration Portal

export const USERS = {
  student: {
    name: 'Mehshid Ahmed',
    email: 'mehshid@university.com',
    role: 'student',
    profileCompletion: 88,
    avatar: 'https://in.pinterest.com/pin/10133167906755734/',
    college: 'Ramdeobaba University (RBU)',
    department: 'Computer Science & Engineering',
    gpa: '8.00 / 10.00',
    graduationYear: 2030,
    skills: {
      technical: [
        { name: 'React', current: 80, target: 90, required: 85, category: 'Web Development' },
        { name: 'JavaScript', current: 85, target: 95, required: 80, category: 'Web Development' },
        { name: 'Git', current: 75, target: 85, required: 70, category: 'Tools' },
        { name: 'Python', current: 80, target: 90, required: 75, category: 'Machine Learning' },
        { name: 'Data Structures', current: 70, target: 85, required: 80, category: 'Computer Science' },
        { name: 'SQL Databases', current: 65, target: 80, required: 75, category: 'Database' },
        { name: 'Testing (Jest/Cypress)', current: 40, target: 75, required: 70, category: 'Quality Assurance' },
        { name: 'Tailwind CSS', current: 90, target: 95, required: 75, category: 'Web Development' }
      ],
      soft: [
        { name: 'Technical Writing', current: 75, target: 85, required: 70 },
        { name: 'Collaboration', current: 85, target: 90, required: 80 },
        { name: 'Analytical Thinking', current: 80, target: 90, required: 85 },
        { name: 'Presentation', current: 65, target: 80, required: 75 }
      ]
    },
    careerPath: {
      role: 'Frontend Engineer',
      readiness: 78,
      requiredSkillsCount: 8,
      acquiredSkillsCount: 6
    },
    certifications: [
      { id: 'cert-1', title: 'Advanced React & Redux', issuer: 'Meta (via Coursera)', date: 'Mar 2026', verified: true },
      { id: 'cert-2', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Jan 2026', verified: true }
    ],
    projects: [
      { id: 'proj-1', title: 'DevConnect - Developer Network', description: 'A social network for developers to collaborate on open-source projects. Built using React, Tailwind CSS, and WebSockets.', github: 'github.com/alexmercer/devconnect', demo: 'devconnect-live.web.app', status: 'Completed' },
      { id: 'proj-2', title: 'Algovis Visualizer', description: 'Interactive React application demonstrating sorting and graph traversal algorithms with customizable speed controls.', github: 'github.com/alexmercer/algovis', demo: 'algovis.net', status: 'In Progress' }
    ]
  },

  industry: {
    companyName: 'Microsoft',
    representative: 'Sarah Jenkins',
    role: 'industry',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    industrySector: 'Enterprise SaaS & Cloud Systems',
    activePostingsCount: 12,
    totalApplicantsCount: 148,
    shortlistedCount: 32,
    averageMatchScore: 84
  },

  institution: {
    name: 'Metro State University of Technology',
    representative: 'Dr. Arthur Vance',
    role: 'institution',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
    totalStudentsCount: 2450,
    assessedStudentsCount: 1980,
    averageSkillScore: 72,
    placementRate: 86.4,
    internshipParticipation: 64.2
  },

  academician: {
    name: 'Prof. David Kael',
    email: 'david.kael@metrostate.edu',
    role: 'academician',
    department: 'Computer Science',
    researchInterests: ['Distributed Systems', 'Edge Computing', 'Program Synthesis'],
    activeCollaborationsCount: 3,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80',
    institution: 'Metro State University of Technology'
  }
};

export const OPPORTUNITIES = [
  {
    id: 'opp-1',
    company: 'Novex Technologies',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=64&h=64&q=80',
    title: 'Frontend Engineering Intern',
    type: 'Internship',
    location: 'San Francisco, CA (Hybrid)',
    compensation: '$45 - $55 / hour',
    postedDate: '2 days ago',
    deadline: 'Sep 15, 2026',
    matchScore: 92,
    skills: ['React', 'JavaScript', 'Git', 'REST APIs'],
    description: 'We are seeking an energetic Frontend Engineering Intern to join our core product team. You will work on building feature-rich interfaces using React, Tailwind CSS, and collaborate directly with product design and engineering leads.',
    requirements: [
      'Strong proficiency in HTML5, CSS3, and Modern JavaScript (ES6+)',
      'Experience building responsive web applications with React',
      'Familiarity with version control using Git & GitHub',
      'Understanding of API integrations and state management tools'
    ],
    responsibilities: [
      'Develop clean, responsive UI components from Figma specifications',
      'Optimize application performance and write unit/integration tests',
      'Participate in code reviews and agile planning sessions'
    ],
    eligibility: 'Open to Junior/Senior undergraduate students in Computer Science or related fields.'
  },
  {
    id: 'opp-2',
    company: 'Synergy Systems',
    logo: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=64&h=64&q=80',
    title: 'Junior Fullstack Developer',
    type: 'Full-time',
    location: 'Austin, TX (On-site)',
    compensation: '$85,000 - $95,000 / year',
    postedDate: '5 days ago',
    deadline: 'Sep 22, 2026',
    matchScore: 78,
    skills: ['React', 'JavaScript', 'SQL Databases', 'REST APIs', 'Git'],
    description: 'Looking for a Junior Fullstack Engineer to help scale our enterprise platforms. You will work across the React client application and NodeJS microservices.',
    requirements: [
      'Degree in Computer Science or equivalent practical experience',
      'Proficiency in JavaScript (ES6) and database query design (SQL)',
      'Basic understanding of server architecture and web security protocols'
    ],
    responsibilities: [
      'Maintain existing codebase and implement customer feature requests',
      'Write database migrations and build RESTful endpoints'
    ],
    eligibility: 'Graduating students or recent graduates with less than 2 years of professional experience.'
  },
  {
    id: 'opp-3',
    company: 'Apex AI Research',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=64&h=64&q=80',
    title: 'Machine Learning Research Associate',
    type: 'Apprenticeship',
    location: 'Remote',
    compensation: '$4,000 / month stipend',
    postedDate: '1 week ago',
    deadline: 'Oct 01, 2026',
    matchScore: 65,
    skills: ['Data Structures', 'Python', 'SQL Databases'],
    description: 'Collaborate with senior researchers to design, train, and test models in natural language processing and computer vision domains.',
    requirements: [
      'Strong foundations in Linear Algebra, Calculus, and Statistics',
      'Proficient in Python and libraries like PyTorch or TensorFlow'
    ],
    responsibilities: [
      'Run training jobs, clean raw training data, and compile experimental results'
    ],
    eligibility: 'Enrolled in MS or PhD program in STEM, or exceptional senior undergrads.'
  }
];

import { QUESTION_BANK as COMPREHENSIVE_QUESTION_BANK, ASSESSMENT_DOMAINS } from './assessmentQuestions';

export const QUESTION_BANK = COMPREHENSIVE_QUESTION_BANK;

export const MOCK_ASSESSMENT = {
  durationMinutes: 30,
  questions: QUESTION_BANK['React'].concat(QUESTION_BANK['JavaScript']).concat(QUESTION_BANK['Python'])
};


export const MOCK_APPLICATIONS = [
  {
    id: 'app-1',
    opportunityId: 'opp-1',
    company: 'Novex Technologies',
    title: 'Frontend Engineering Intern',
    type: 'Internship',
    status: 'Shortlisted', // Applied, Under Review, Shortlisted, Interview, Selected, Rejected
    appliedDate: 'Aug 24, 2026',
    timeline: [
      { stage: 'Applied', date: 'Aug 24, 2026', current: false },
      { stage: 'Under Review', date: 'Aug 25, 2026', current: false },
      { stage: 'Shortlisted', date: 'Aug 26, 2026', current: true }
    ]
  },
  {
    id: 'app-2',
    opportunityId: 'opp-2',
    company: 'Synergy Systems',
    title: 'Junior Fullstack Developer',
    type: 'Full-time',
    status: 'Applied',
    appliedDate: 'Aug 26, 2026',
    timeline: [
      { stage: 'Applied', date: 'Aug 26, 2026', current: true }
    ]
  }
];

export const INDUSTRY_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Alex Mercer',
    college: 'Metro State University of Technology',
    gpa: '3.82',
    matchScore: 94,
    skills: {
      matched: ['React', 'JavaScript', 'Git', 'REST APIs'],
      missing: ['Testing (Jest/Cypress)']
    },
    assessmentScore: '88%',
    topSkills: ['React', 'JavaScript', 'Tailwind CSS', 'Git'],
    interest: 'Frontend Engineer, UI/UX Architect',
    status: 'Shortlisted', // None, Shortlisted, Contacted, Compare
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'cand-2',
    name: 'Eleanor Vance',
    college: 'Metro State University of Technology',
    gpa: '3.90',
    matchScore: 82,
    skills: {
      matched: ['React', 'JavaScript', 'Git'],
      missing: ['REST APIs', 'Testing (Jest/Cypress)']
    },
    assessmentScore: '82%',
    topSkills: ['JavaScript', 'HTML/CSS', 'Python', 'React'],
    interest: 'Frontend Engineer, Software Dev',
    status: 'None',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'cand-3',
    name: 'Marcus Chen',
    college: 'Vanguard Technical Institute',
    gpa: '3.65',
    matchScore: 71,
    skills: {
      matched: ['JavaScript', 'REST APIs'],
      missing: ['React', 'Git', 'Testing (Jest/Cypress)']
    },
    assessmentScore: '74%',
    topSkills: ['Node.js', 'SQL Databases', 'JavaScript'],
    interest: 'Backend Engineer, Fullstack',
    status: 'None',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
  }
];

export const INSTITUTION_ANALYTICS = {
  skillsGap: [
    { name: 'Testing', lack: 60, label: 'Testing (Jest/Cypress)' },
    { name: 'SQL DBs', lack: 45, label: 'Databases (SQL/NoSQL)' },
    { name: 'REST APIs', lack: 30, label: 'System Design/APIs' },
    { name: 'Git/CI-CD', lack: 20, label: 'Version Control & Deploy' },
    { name: 'JavaScript', lack: 10, label: 'Advanced Javascript' }
  ],
  studentDistribution: [
    { level: 'Expert', count: 120, fill: '#4f46e5' },
    { level: 'Advanced', count: 480, fill: '#2563eb' },
    { level: 'Intermediate', count: 980, fill: '#3b82f6' },
    { level: 'Beginner', count: 400, fill: '#f59e0b' }
  ],
  placementReadiness: [
    { name: 'Ready (Score >80%)', value: 450, fill: '#22c55e' },
    { name: 'Almost Ready (65-80%)', value: 920, fill: '#3b82f6' },
    { name: 'Needs Dev (<65%)', value: 610, fill: '#ef4444' }
  ],
  participationTimeline: [
    { month: 'Jan', internships: 120, placements: 80 },
    { month: 'Feb', internships: 150, placements: 95 },
    { month: 'Mar', internships: 210, placements: 140 },
    { month: 'Apr', internships: 280, placements: 210 },
    { month: 'May', internships: 420, placements: 310 },
    { month: 'Jun', internships: 550, placements: 400 }
  ]
};

export const ACADEMICIAN_OPPORTUNITIES = [
  {
    id: 'acad-opp-1',
    category: 'Faculty Internship',
    title: 'Summer Research Immersion in Quantum Cloud Compute',
    sponsor: 'Novex Technologies Research Labs',
    duration: '2 Months (Summer 2027)',
    stipend: '$8,500 / month',
    description: 'Work alongside lead researchers on quantum cryptography and key distribution networks.',
    requirements: ['PhD in Computer Science or Physics', 'Experience in Distributed Systems Research'],
    status: 'Recommended'
  },
  {
    id: 'acad-opp-2',
    category: 'Faculty Development Program',
    title: 'Advanced AI and Deep Learning System Design FDP',
    sponsor: 'Synergy Systems',
    duration: '5 Days (October 2026)',
    stipend: 'Sponsored (Novex Grant)',
    description: 'Hands-on bootcamp teaching latest deep learning scaling strategies on GPU clusters.',
    requirements: ['Teaching experience in Machine Learning or Algorithms'],
    status: 'Upcoming'
  },
  {
    id: 'acad-opp-3',
    category: 'Joint Research',
    title: 'Heterogeneous Edge Mesh Networks for Smart Infrastructure',
    sponsor: 'Government Digital Council & Novex Tech',
    duration: '1 Year Project Grant',
    stipend: '$120,000 Funding Budget',
    description: 'Collaborative academic-industry research project to design a resilient edge sensor communications standard.',
    requirements: ['Prior publication track record in IoT/Wireless Systems', 'Lab facilities for prototyping node chips'],
    status: 'Open'
  }
];

export const COLLABORATIONS = [
  {
    id: 'collab-1',
    type: 'Industry ↔ Institution',
    title: 'Co-Branded Cloud Architecture Center of Excellence',
    partners: ['Novex Technologies', 'Metro State University of Technology'],
    description: 'Establishment of a specialized training facility equipped with hardware and cloud nodes to teach enterprise cloud architecture.',
    date: 'Est. July 2026'
  },
  {
    id: 'collab-2',
    type: 'Industry ↔ Faculty',
    title: 'Consultancy for Edge Router Security Compliance',
    partners: ['Synergy Systems', 'Prof. David Kael'],
    description: 'Consulting agreement to audit firmware vulnerability scanners and define automated pen-testing suites.',
    date: 'Active'
  },
  {
    id: 'collab-3',
    type: 'Industry ↔ Students',
    title: 'Hack-the-Future Live Hackathon Sponsor',
    partners: ['Novex Technologies', 'MSUT Computer Society'],
    description: 'Open software competition focusing on sustainable, low-power APIs. Industry engineers will act as mentors and judges.',
    date: 'Oct 14-16, 2026'
  }
];

export const NOTIFICATIONS = [
  { id: 'notif-1', title: 'New Opportunity Match', message: 'Frontend Engineering Intern at Novex Technologies matches 92% of your skill profile.', time: '2 hrs ago', read: false },
  { id: 'notif-2', title: 'Skill Assessment Available', message: 'Complete the Cloud Infrastructure mini-test to unlock AWS job matching.', time: '1 day ago', read: true },
  { id: 'notif-3', title: 'Application Update', message: 'Your application for Frontend Engineering Intern has been updated to Shortlisted.', time: '2 days ago', read: false },
  { id: 'notif-4', title: 'FDP Registration Open', message: 'Prof. Kael, registration for synergy systems boot camp is now open.', time: '3 days ago', read: false }
];
