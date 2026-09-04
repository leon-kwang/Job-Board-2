import { Job, CandidateProfile, Application, Course, SavedSearch } from '../types';

export const INITIAL_CANDIDATE: CandidateProfile = {
  id: 'cand-01',
  name: 'May Tan',
  headline: 'Product & UX Specialist',
  photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1sL_eM_SgG0TwXYD4CppuaeRUQJsVMmZG61Y6tR0jeGNSV-vYJLz-tyFwGipDnoBoeR6TUHOE_dAVIttsmg99p9T7L0VtBfR8FBsV7K8HneenEc-2ozrFG4HTR8pPerxPgsKwsVAnEQfLpaGOQHY3SYhhXyWyvS21WFgomv86RBB23ggbBUVNU4roSUyWgKbPP7bvITz3pFBbJpds_SlgTQEUxTwDLZ582bi4PbzUYQWEzc9p3KxU',
  verifiedStatus: true,
  currentCvName: 'Resume_May_Tan_2025.pdf',
  cvLastUpdated: '3 days ago',
  cvSource: 'local',
  linkedInUrl: 'https://linkedin.com/in/maytan-product-ux',
  experienceYears: 5,
  education: 'Polytechnic Diploma in InfoTech + B.Sc. Interaction & Digital Media',
  skills: [
    'Figma',
    'Design Systems',
    'User Research & Testing',
    'Interactive Prototyping',
    'Design Strategy',
    'Agile Scrum',
    'Wireframing',
    'Stakeholder Roadmap',
    'KYC / AML Workflow',
    'Payment Rails (FAST/PayNow)'
  ],
  targetIndustries: ['Public Sector', 'Fintech & Banking', 'Enterprise Tech', 'E-Commerce'],
  salaryExpectationMin: 6500,
  preferredWorkArrangement: 'Hybrid',
  bioSummary: 'Senior UX & Product specialist experienced in high-trust digital services, government civic applications, and agile banking transformations across Singapore.'
};

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-01',
    title: 'Senior UX/Product Designer',
    company: 'GovTech Singapore',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBFFzIUAcTxALn21KC9Y96cAwAkYIBhHGSp3umcW4c5AyqxSSLPbIpEk6SQA0badx96ldYo2RZoHtKetYJvHKXI7hEPHiq-AwlnUhIZFKZ0tiObm_h7ABH8cvdIt2mF_xPAyuvkMkLziHQeqieQ4vXVrUHLi165w-f3hQdnPW7aO0vHRT6BQkT_maVLK15LV96IHZEyoKaIjqL6XF28zSdmuuC9LftKNVz6EBNM-IkQ3U60NkxT1De',
    rating: 4.4,
    reviewCount: 312,
    location: 'Central Business District (CBD), Singapore',
    district: 'Central / CBD',
    workArrangement: 'Hybrid',
    salaryMin: 6500,
    salaryMax: 8800,
    salaryCurrency: 'S$',
    salaryPeriod: 'month',
    verifiedEmployer: true,
    fastResponse: true,
    graduateTrack: false,
    careerConversionEligible: false,
    skillsFutureApplicable: true,
    activelyHiring: true,
    postedDaysAgo: 2,
    datePosted: '2d ago',
    industry: 'Public Sector',
    jobFamily: 'Design & UX',
    experienceLevel: 'Senior Level',
    jobType: 'Full-time',
    description: 'As a Senior UX/Product Designer at GovTech Singapore, you will lead the evolution of national digital public products utilized by millions of residents and commercial enterprises daily. You will translate complex regulatory pathways into delightful, simple, and universally accessible citizen touchpoints.',
    responsibilities: [
      'Drive end-to-end design strategy from discovery, user journey mapping, wireframing, to multi-variant usability testing across public platforms.',
      'Champion the Singapore Government Design System (SGDS), authoring reusable React-ready Figma components for distributed agency teams.',
      'Collaborate directly with cross-functional triads consisting of engineering leads, product managers, and policy domain directors.',
      'Advocate relentlessly for universal accessibility and elder-friendly digital citizen literacy.'
    ],
    benefits: [
      {
        title: 'Comprehensive Medical Care',
        desc: 'Full family outpatient, dental, and wellness allowance.',
        icon: 'health_and_safety'
      },
      {
        title: 'S$3,000 Annual Learning Grant',
        desc: 'Separate from standard national SkillsFuture allocation.',
        icon: 'school'
      },
      {
        title: 'Staggered & Hybrid Hours',
        desc: 'Up to 2 work-from-home days weekly with core hours flex.',
        icon: 'schedule'
      },
      {
        title: 'Full CPF + Performance Bonus',
        desc: 'Annual variable component + guaranteed 13th-month AWS.',
        icon: 'savings'
      }
    ],
    requiredSkills: ['Figma', 'Design Systems', 'User Research & Testing', 'Interactive Prototyping', 'Design Strategy'],
    niceToHave: ['WCAG 2.1 AAA Accessibility', 'Government Design Systems (SGDS)', 'Citizen Portal Experience'],
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVjuylQHDlevK1NgBEoMN3O4O5uY9qNpvURQNOSHCWdmxF2X6TylSrB3aDuq3TTKoeclnMkIP1Wwq3R3B97Oki-pJRTpJt8iizBLN9gL8_LcAvLnmp719Xw7K4japbcve-6TnRpNCYHt5LWaQaNBjgyWuaC8LtOpD_5e8U_RgB_UxQ6F87J2a8Qrn0WLGbpJTPjYeMcviTHbAWxbROTESZTXI-F5nsH9zcmlXiSApWX-5hBQlMWfCO',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQIjgn17AICr7T3o22E6kVody0azUURyXlbBTjZWBWYgTzmSkizrigE2kM17FllZ4519ITtlYia4t_hqqgvmVourhvClpoXifunDDIS8mkvBPW2idirpV1IFE0_H5rvjcfWCwLwcIFUOvr72wROaTeL3hzUyZeZfRl_sNOaWy30VKNgqy2IqYcYDBMWz1AXqk0QKDZQbERaHjOuxpNiVnS3iNhToT17aqhXVMSSRxqsUbKYURQCU8h'
    ],
    address: '10 Pasir Panjang Road, Mapletree Business City, Singapore 117438',
    interviewInsights: 'Based on 48 reported GovTech Singapore designer interviews: The portfolio review places heavy weighting on rationale behind abandoned design iterations rather than solely final pixel polish. Expect a 45-minute whiteboard session addressing citizen services scaling.',
    skillsMatchCount: 5,
    totalSkillsCount: 5,
    compatibilityPercent: 94,
    goodFitReasons: [
      '10/10 Core CV match for design systems, Figma master libraries, and responsive UX architectures.',
      'Proven background in high-trust portals and complex multi-stakeholder workflows aligned with Fair Consideration Guidelines.',
      'Strong communication track record partnering with product triads and technical architects in Singapore.'
    ],
    notGoodFitReasons: [
      'Strict emphasis on Web Content Accessibility Guidelines (WCAG 2.1 AAA) certification which is not explicitly listed in your current CV.',
      'Public agency review loops require navigating statutory board approval milestones which differs from fast-paced startup cadence.'
    ],
    skillGaps: [
      {
        skill: 'Web Content Accessibility Guidelines (WCAG 2.1 AAA)',
        priority: 'Critical',
        recommendedCourse: 'SkillsFuture Funded Course in Universal Accessibility',
        institution: 'Singapore Polytechnic Academy',
        subsidy: 'SkillsFuture Funded Course (90% Subsidy)',
        duration: '3-Day Intensive'
      }
    ],
    applicationStatus: 'Interview Scheduled'
  },
  {
    id: 'job-02',
    title: 'Associate Software Engineer (Graduate Conversion)',
    company: 'Grab',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ZokyvS8jMSoevlzQnq7-f2y3ncj43wUmYPAllM2e1RXiUxZTqhvzjG0YjDo114E7kJt8LdeAKtsz1FxdJaIP6WM1BdswH1zuCDGA_3C3zGBG50UjVMOq8VXvnVi-5p4gRsBSY1rnQWatFij9t6kHcgKLnj9JNMvmMWy0Xq3rmpnL09kKo2jGZX_sNoi5ezvJgAWR0kx6EtNBaraSfmOiWySqbRttmevb_1mU9670S-ktHiWSgcex',
    rating: 4.2,
    reviewCount: 489,
    location: 'One-North, Singapore',
    district: 'One-North / Buona Vista',
    workArrangement: 'On-site',
    salaryMin: 4800,
    salaryMax: 6200,
    salaryCurrency: 'S$',
    salaryPeriod: 'month',
    verifiedEmployer: true,
    fastResponse: false,
    graduateTrack: true,
    careerConversionEligible: true,
    skillsFutureApplicable: false,
    activelyHiring: true,
    postedDaysAgo: 1,
    datePosted: '1d ago',
    industry: 'Tech & Software',
    jobFamily: 'Software Engineering',
    experienceLevel: 'Fresh Grad',
    jobType: 'Full-time',
    description: 'Accelerated 18-month engineering foundation program. Build resilient microservices power delivery dispatch across Southeast Asia. Structured mentoring provided by senior staff engineers.',
    responsibilities: [
      'Write scalable, production-grade microservice code in Golang and Java.',
      'Participate in code reviews, distributed tracer telemetry, and CI/CD pipelines.',
      'Collaborate with product designers and test automation specialists.'
    ],
    benefits: [
      { title: 'GrabFlex Allowance', desc: 'S$1,500 yearly for wellness, gadgets, and gym.', icon: 'fitness_center' },
      { title: 'Sponsored AWS/GCP Certs', desc: 'Full exam fee reimbursement + study leave.', icon: 'school' }
    ],
    requiredSkills: ['Golang', 'Data Structures', 'Microservices', 'REST APIs', 'SQL'],
    niceToHave: ['Kubernetes', 'Kafka', 'Redis'],
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ZokyvS8jMSoevlzQnq7-f2y3ncj43wUmYPAllM2e1RXiUxZTqhvzjG0YjDo114E7kJt8LdeAKtsz1FxdJaIP6WM1BdswH1zuCDGA_3C3zGBG50UjVMOq8VXvnVi-5p4gRsBSY1rnQWatFij9t6kHcgKLnj9JNMvmMWy0Xq3rmpnL09kKo2jGZX_sNoi5ezvJgAWR0kx6EtNBaraSfmOiWySqbRttmevb_1mU9670S-ktHiWSgcex'
    ],
    address: '3 Media Close, Grab HQ @ One-North, Singapore 138498',
    interviewInsights: 'Expect 2 coding rounds covering algorithms (arrays, trees) and system design trade-offs for high concurrency dispatch.',
    skillsMatchCount: 3,
    totalSkillsCount: 5,
    compatibilityPercent: 84,
    goodFitReasons: [
      'Eligible under Workforce Singapore Career Conversion Programme (CCP).',
      'Strong conceptual design and system architecture foundations.'
    ],
    notGoodFitReasons: [
      'Heavy backend coding requirements in Go/Kafka rather than front-facing UX.',
      'Requires full 5 days on-site presence at One-North during initial 6 months.'
    ],
    skillGaps: [
      {
        skill: 'Golang Microservices & Concurrency',
        priority: 'Critical',
        recommendedCourse: 'Applied Golang for High-Scale Backend Systems',
        institution: 'National University of Singapore (NUS-ISS)',
        subsidy: '70% SSG Subsidised',
        duration: '4-Week Bootcamp'
      }
    ]
  },
  {
    id: 'job-03',
    title: 'Fintech Product Operations Lead',
    company: 'Straits Horizon Financial Group',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIigCgny0PshZvdnucVXIiudL7rM_b0ttYPHiulKi8lY8tutZ-tBqDXo8EBIvmKB9t9tWUt4-gJQttNBNU492i6YGJ4hWIbJvx2t0aPnQzaZn8hVis753qfOo-BO-wNtS49VQJgsjmoceYypuVX_On01SOZDft33YbwEHAfhj1Aim5MOsu_t4kRj5SKntRw2KuUtCsXL6l8Gmmjh6i5u9OjSfATADQ19Nh6MUwiNJi-mVLBByaTRoC',
    rating: 4.6,
    reviewCount: 198,
    location: 'Central (Raffles Place), Singapore',
    district: 'Central / CBD',
    workArrangement: 'Hybrid',
    salaryMin: 7800,
    salaryMax: 9500,
    salaryCurrency: 'S$',
    salaryPeriod: 'month',
    verifiedEmployer: true,
    fastResponse: true,
    graduateTrack: false,
    careerConversionEligible: false,
    skillsFutureApplicable: true,
    activelyHiring: true,
    postedDaysAgo: 1,
    datePosted: '1d ago',
    industry: 'Banking & Fintech',
    jobFamily: 'Product Management',
    experienceLevel: 'Senior Level',
    jobType: 'Full-time',
    description: 'Lead next-generation digital payment orchestration and wealth operations. Direct fit for candidates with banking background, regulatory familiarity with MAS guidelines, and high-velocity product sprint experience.',
    responsibilities: [
      'Manage cross-border payment rails (FAST, PayNow, PayNet) operational integrations.',
      'Optimize digital KYC and anti-money laundering automated approval workflows.',
      'Liaise between executive leadership, MAS audit teams, and engineering sprint squads.'
    ],
    benefits: [
      { title: 'Annual Variable Bonus', desc: 'Historically 2.5 - 4.5 months based on performance.', icon: 'payments' },
      { title: 'Executive Health Screening', desc: 'Annual full-spectrum health panel at Raffles Hospital.', icon: 'medical_services' }
    ],
    requiredSkills: ['KYC / AML Workflow', 'Agile Scrum', 'Payment Rails (FAST/PayNow)', 'Stakeholder Roadmap'],
    niceToHave: ['MAS Tech Risk Guidelines', 'Swift MX ISO20022'],
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIigCgny0PshZvdnucVXIiudL7rM_b0ttYPHiulKi8lY8tutZ-tBqDXo8EBIvmKB9t9tWUt4-gJQttNBNU492i6YGJ4hWIbJvx2t0aPnQzaZn8hVis753qfOo-BO-wNtS49VQJgsjmoceYypuVX_On01SOZDft33YbwEHAfhj1Aim5MOsu_t4kRj5SKntRw2KuUtCsXL6l8Gmmjh6i5u9OjSfATADQ19Nh6MUwiNJi-mVLBByaTRoC'
    ],
    address: 'One Raffles Quay, North Tower, Singapore 048583',
    interviewInsights: 'Turnaround is fast (~4 days). Emphasize compliance with MAS Technology Risk Management guidelines in round 2.',
    skillsMatchCount: 5,
    totalSkillsCount: 5,
    compatibilityPercent: 96,
    goodFitReasons: [
      'Direct domain match with banking & fintech product workflows.',
      '10/10 Core CV skills matched with verified credential validation.',
      'Fast-track candidate status with priority recruiter screening.'
    ],
    notGoodFitReasons: [
      'Strict quarterly compliance audits under MAS regulatory scrutiny.',
      'Occasional weekend change management standby during core payment rail releases.'
    ],
    skillGaps: [],
    applicationStatus: 'Saved'
  },
  {
    id: 'job-04',
    title: 'Enterprise AI Solutions Consultant',
    company: 'Cognitive Cloud Systems',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ZokyvS8jMSoevlzQnq7-f2y3ncj43wUmYPAllM2e1RXiUxZTqhvzjG0YjDo114E7kJt8LdeAKtsz1FxdJaIP6WM1BdswH1zuCDGA_3C3zGBG50UjVMOq8VXvnVi-5p4gRsBSY1rnQWatFij9t6kHcgKLnj9JNMvmMWy0Xq3rmpnL09kKo2jGZX_sNoi5ezvJgAWR0kx6EtNBaraSfmOiWySqbRttmevb_1mU9670S-ktHiWSgcex',
    rating: 4.5,
    reviewCount: 84,
    location: 'One-North (Hybrid 3d), Singapore',
    district: 'One-North / Buona Vista',
    workArrangement: 'Hybrid',
    salaryMin: 8200,
    salaryMax: 10200,
    salaryCurrency: 'S$',
    salaryPeriod: 'month',
    verifiedEmployer: true,
    fastResponse: true,
    graduateTrack: false,
    careerConversionEligible: false,
    skillsFutureApplicable: true,
    activelyHiring: true,
    postedDaysAgo: 2,
    datePosted: '2d ago',
    industry: 'Tech & Software',
    jobFamily: 'Cloud & DevOps',
    experienceLevel: 'Senior Level',
    jobType: 'Full-time',
    description: 'Partner with regional enterprise clients to scope and deploy Generative AI assistants, LLM agent workflows, and cognitive automation pipelines. Series B funded FinTech innovator.',
    responsibilities: [
      'Lead discovery workshops with enterprise CTOs and digital heads.',
      'Formulate solution architecture combining multi-modal LLMs and enterprise data stores.',
      'Draft proof-of-concept specifications and benchmark token latency.'
    ],
    benefits: [
      { title: 'Equity Options Package', desc: 'Stock options granted after 6 months.', icon: 'trending_up' },
      { title: 'Generous WFH Budget', desc: 'S$1,200 home office hardware subsidy.', icon: 'home' }
    ],
    requiredSkills: ['Solution Scoping', 'Client Discovery', 'API Integration', 'Prompt Engineering'],
    niceToHave: ['LangChain', 'Vector Databases', 'Python'],
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ZokyvS8jMSoevlzQnq7-f2y3ncj43wUmYPAllM2e1RXiUxZTqhvzjG0YjDo114E7kJt8LdeAKtsz1FxdJaIP6WM1BdswH1zuCDGA_3C3zGBG50UjVMOq8VXvnVi-5p4gRsBSY1rnQWatFij9t6kHcgKLnj9JNMvmMWy0Xq3rmpnL09kKo2jGZX_sNoi5ezvJgAWR0kx6EtNBaraSfmOiWySqbRttmevb_1mU9670S-ktHiWSgcex'
    ],
    address: 'Fusionopolis Way, Connexis North, Singapore 138632',
    interviewInsights: 'Requires presenting a mock GenAI discovery deck solving customer churn in wealth management.',
    skillsMatchCount: 3,
    totalSkillsCount: 4,
    compatibilityPercent: 89,
    goodFitReasons: [
      'Exceptional stakeholder communication and product narrative skills.',
      'High salary premium range (+34% vs baseline).',
      'Flexible 3-day work-from-home schedule.'
    ],
    notGoodFitReasons: [
      'Identified skill gap in advanced LLM prompt orchestration and vector retrieval architecture.',
      'Requires consultative enterprise pre-sales quota responsibility.'
    ],
    skillGaps: [
      {
        skill: 'Prompt Engineering & LLM Architecture',
        priority: 'Critical',
        recommendedCourse: '2-Day SSG Masterclass: LLM Integration & Enterprise Orchestration',
        institution: 'Tech Management Institute',
        subsidy: 'Auto-claim $500 SkillsFuture Subsidy',
        duration: '2-Day Masterclass'
      }
    ]
  },
  {
    id: 'job-05',
    title: 'Digital Transformation Associate (CCP Track)',
    company: 'SingaApex Logistics Technologies',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm8R8cA_sxgEPoahhaEYBCdZlSPSqMcIrcNs54l_JIoiiKuhtDcpCaOJXSgcUCdpPPylHPq8DtHYLctVAWsyQDsPocM6OHZg2s8IawHssmfOJPZNxTvo1rwGmaP97pCZoVi3lN4_vMBml-iBBtvV43TCjz-NNezfe7IsSeFTs6HuqnGj6ndpYCzi1zQlFQTj1k-70MJMRdrFvTjQMpbGNShq9nNcpmZbeGjHQ_vXY4EKBb_AyIXghC',
    rating: 4.3,
    reviewCount: 142,
    location: 'Jurong East / Central, Singapore',
    district: 'West / Jurong',
    workArrangement: 'Hybrid',
    salaryMin: 6500,
    salaryMax: 7500,
    salaryCurrency: 'S$',
    salaryPeriod: 'month',
    verifiedEmployer: true,
    fastResponse: false,
    graduateTrack: true,
    careerConversionEligible: true,
    skillsFutureApplicable: true,
    activelyHiring: true,
    postedDaysAgo: 3,
    datePosted: '3d ago',
    industry: 'Supply Chain & Logistics',
    jobFamily: 'Product Management',
    experienceLevel: 'Mid Level',
    jobType: 'Full-time',
    description: 'Workforce Development Singapore (WSG) registered Career Conversion Programme (CCP). Full salary on-the-job with up to 90% salary government co-funding. Lead enterprise ERP automation and process mapping.',
    responsibilities: [
      'Document as-is warehouse workflows and map to automated microservice pipelines.',
      'Deploy PowerBI automated metric dashboards for logistics terminal operations.',
      'Run change management clinics with ground operations staff.'
    ],
    benefits: [
      { title: '90% Wage Support', desc: 'Government wage co-funding provides peace of mind.', icon: 'verified_user' },
      { title: 'Dual Certification', desc: 'Receive WSQ Specialist Diploma upon graduation.', icon: 'card_membership' }
    ],
    requiredSkills: ['Process Mapping', 'Change Management', 'ERP Modernization', 'PowerBI'],
    niceToHave: ['Supply Chain Logistics', 'Six Sigma Green Belt'],
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBm8R8cA_sxgEPoahhaEYBCdZlSPSqMcIrcNs54l_JIoiiKuhtDcpCaOJXSgcUCdpPPylHPq8DtHYLctVAWsyQDsPocM6OHZg2s8IawHssmfOJPZNxTvo1rwGmaP97pCZoVi3lN4_vMBml-iBBtvV43TCjz-NNezfe7IsSeFTs6HuqnGj6ndpYCzi1zQlFQTj1k-70MJMRdrFvTjQMpbGNShq9nNcpmZbeGjHQ_vXY4EKBb_AyIXghC'
    ],
    address: '2 International Business Park, The Strategy, Singapore 609930',
    interviewInsights: 'Panel focuses on adaptability and empathy when training frontline operational users during digital rollouts.',
    skillsMatchCount: 3,
    totalSkillsCount: 4,
    compatibilityPercent: 88,
    goodFitReasons: [
      'Full salary during career conversion with government wage subsidy.',
      'Strong fit for polytechnic + university graduates wanting structured transition.'
    ],
    notGoodFitReasons: [
      'Industrial supply chain domain requires learning logistics jargon and warehousing KPIs.',
      'Requires frequent visits to logistics parks in Jurong and Tuas.'
    ],
    skillGaps: [
      {
        skill: 'PowerBI & Logistics Telemetry',
        priority: 'Moderate',
        recommendedCourse: 'Business Intelligence & Automated Data Dashboards',
        institution: 'Singapore Polytechnic Academy',
        subsidy: '80% SSG Subsidised',
        duration: '3-Week Module'
      }
    ]
  },
  {
    id: 'job-06',
    title: 'Digital Marketing Specialist',
    company: 'DBS Bank',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIigCgny0PshZvdnucVXIiudL7rM_b0ttYPHiulKi8lY8tutZ-tBqDXo8EBIvmKB9t9tWUt4-gJQttNBNU492i6YGJ4hWIbJvx2t0aPnQzaZn8hVis753qfOo-BO-wNtS49VQJgsjmoceYypuVX_On01SOZDft33YbwEHAfhj1Aim5MOsu_t4kRj5SKntRw2KuUtCsXL6l8Gmmjh6i5u9OjSfATADQ19Nh6MUwiNJi-mVLBByaTRoC',
    rating: 4.4,
    reviewCount: 520,
    location: 'Marina Bay Financial Centre, Singapore',
    district: 'Central / CBD',
    workArrangement: 'Hybrid',
    salaryMin: 4200,
    salaryMax: 5500,
    salaryCurrency: 'S$',
    salaryPeriod: 'month',
    verifiedEmployer: true,
    fastResponse: false,
    graduateTrack: false,
    careerConversionEligible: false,
    skillsFutureApplicable: true,
    activelyHiring: false,
    postedDaysAgo: 3,
    datePosted: '3d ago',
    industry: 'Banking & Fintech',
    jobFamily: 'Marketing',
    experienceLevel: 'Mid Level',
    jobType: 'Full-time',
    description: 'Drive digital acquisition and customer personalization strategies for wealth banking. Plan omnichannel campaigns across search, social, and program analytics.',
    responsibilities: [
      'Execute paid search and organic growth strategies across Google & LinkedIn.',
      'Analyze customer funnel data using Adobe Experience Platform.',
      'A/B test landing page conversion funnels.'
    ],
    benefits: [
      { title: 'Banking Privileges', desc: 'Preferential staff loan rates and wealth advisory.', icon: 'account_balance' }
    ],
    requiredSkills: ['Growth Marketing', 'SEO', 'Google Analytics', 'A/B Testing'],
    niceToHave: ['MarTech Stack', 'Content Strategy'],
    photos: [],
    address: '12 Marina Boulevard, Marina Bay Financial Centre Tower 3, Singapore 018982',
    interviewInsights: 'Prepare to discuss CAC and LTV optimization across wealth banking demographics.',
    skillsMatchCount: 2,
    totalSkillsCount: 4,
    compatibilityPercent: 78,
    goodFitReasons: [
      'Wealth banking context aligns with financial sector knowledge.',
      'Strong UX landing page testing background.'
    ],
    notGoodFitReasons: [
      'Lower base salary ceiling compared to candidate current target range.',
      'Primarily performance marketing focused rather than product design.'
    ],
    skillGaps: [
      {
        skill: 'Performance Growth Marketing & SEO',
        priority: 'Moderate',
        recommendedCourse: 'Executive Certificate in Search Engine & Paid Funnels',
        institution: 'SMU Academy',
        subsidy: 'SkillsFuture Eligible',
        duration: '2-Week Evening'
      }
    ],
    applicationStatus: 'Submitted'
  }
];

export const INITIAL_SAVED_SEARCHES: SavedSearch[] = [
  {
    id: 'search-01',
    title: 'Senior UX / Product Designer in Singapore (Hybrid)',
    what: 'Senior UX/Product Designer',
    where: 'Singapore, Central / CBD',
    filters: {
      workArrangement: 'Hybrid',
      minSalary: 6000,
      jobFamilies: ['Design & UX'],
      experienceLevel: 'Senior Level'
    },
    frequency: 'instant',
    channels: ['email', 'in_app', 'push'],
    createdAt: '2025-08-28',
    newOpeningsCount: 4,
    active: true
  },
  {
    id: 'search-02',
    title: 'Fintech & Banking Product Leads (S$7,500+)',
    what: 'Fintech Product Lead',
    where: 'Raffles Place / Marina Bay, Singapore',
    filters: {
      minSalary: 7500,
      industries: ['Banking & Fintech'],
      jobFamilies: ['Product Management']
    },
    frequency: 'daily',
    channels: ['email', 'in_app'],
    createdAt: '2025-08-30',
    newOpeningsCount: 2,
    active: true
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-01',
    jobId: 'job-01',
    jobTitle: 'Senior UX Designer',
    company: 'GovTech Singapore',
    companyIcon: 'account_balance',
    location: 'Pasir Panjang, Singapore (Hybrid)',
    appliedDate: 'Applied 4 days ago',
    status: 'interview_scheduled',
    statusLabel: 'Interview Scheduled',
    skillFitPercent: 96,
    salaryText: 'S$6,500 - S$8,800 /mo',
    nextStep: {
      title: 'Next Step: Technical Panel Interview',
      datetime: 'Thursday, 10:30 AM SGT',
      duration: '60 mins',
      linkInfo: 'Google Meet link attached to calendar',
      isUrgent: true
    },
    currentStepIndex: 3,
    totalSteps: 4,
    currentStepName: 'Technical Panel & Portfolio Review',
    avgReviewDays: 1.4
  },
  {
    id: 'app-02',
    jobId: 'job-02',
    jobTitle: 'Associate Product Manager',
    company: 'Grab Holdings',
    companyIcon: 'local_taxi',
    location: 'One-North, Singapore',
    appliedDate: 'Applied 1 week ago',
    status: 'under_review',
    statusLabel: 'Under Review',
    skillFitPercent: 91,
    salaryText: 'S$6,800 - S$8,200 /mo',
    recruiterMilestone: {
      viewsCount: 2,
      shortlistedStage: 'Recruiter shortlisted profile for Engineering sync',
      expectedResponse: 'Within 48 hours'
    },
    currentStepIndex: 2,
    totalSteps: 4,
    currentStepName: 'Internal Engineering Calibration',
    avgReviewDays: 2.0
  },
  {
    id: 'app-03',
    jobId: 'job-06',
    jobTitle: 'Digital Transformation Lead',
    company: 'DBS Bank',
    companyIcon: 'account_balance_wallet',
    location: 'Marina Bay Financial Centre',
    appliedDate: 'Applied Yesterday',
    status: 'submitted',
    statusLabel: 'Application Received',
    skillFitPercent: 88,
    salaryText: 'Direct TalentTrust Portal',
    currentStepIndex: 1,
    totalSteps: 4,
    currentStepName: 'Step 1 of 4: Profile Screening',
    avgReviewDays: 2.8
  },
  {
    id: 'app-04',
    jobId: 'job-03',
    jobTitle: 'Product Operations Specialist',
    company: 'OCBC Bank',
    companyIcon: 'savings',
    location: 'Changi Business Park',
    appliedDate: 'Applied 2 weeks ago',
    status: 'offer',
    statusLabel: 'Offer Extended',
    skillFitPercent: 95,
    salaryText: 'S$8,000 /mo + Bonus',
    nextStep: {
      title: 'Offer Letter Review Period',
      datetime: 'Decision due in 3 days',
      duration: 'MAS Accredited Terms',
      linkInfo: 'Full healthcare & CPF guaranteed package'
    },
    currentStepIndex: 4,
    totalSteps: 4,
    currentStepName: 'Offer & Contract Stage',
    avgReviewDays: 1.6
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-01',
    title: 'Executive Certificate in Generative AI for Business Operations',
    institution: 'National University Partner (NUS-ISS)',
    category: 'Artificial Intelligence',
    ssgFundingPercent: 90,
    originalFee: 3600,
    netPayableFee: 360,
    description: 'Covers prompt workflows, enterprise compliance, and AI orchestration. Unlocks +S$1,800/mo salary potential.',
    salaryPotential: '+S$1,800/mo',
    skillsFutureEligible: true,
    duration: '4 Saturdays (Hybrid)',
    badge: '90% SSG Funding'
  },
  {
    id: 'course-02',
    title: 'Modern Cloud Infrastructure & Kubernetes Architecture',
    institution: 'Singapore Polytechnic Academy',
    category: 'Cloud Engineering',
    ssgFundingPercent: 70,
    originalFee: 1600,
    netPayableFee: 480,
    description: 'Hands-on lab training preparing candidate for AWS Certified Solutions Architect and multi-cloud systems.',
    salaryPotential: '+S$1,200/mo',
    skillsFutureEligible: true,
    duration: '3 Weeks (Evening)',
    badge: '70% SSG Funding'
  },
  {
    id: 'course-03',
    title: 'Product Management for Fintech & Digital Payments',
    institution: 'Tech Management Institute',
    category: 'Product & Strategy',
    ssgFundingPercent: 85,
    originalFee: 2600,
    netPayableFee: 390,
    description: 'Bridging banking operational skills to fast-paced agile product ownership with Singapore local case studies.',
    salaryPotential: '+S$1,500/mo',
    skillsFutureEligible: true,
    duration: '5 Sessions (Weekend)',
    badge: '85% SSG Funding'
  }
];

export const FILTER_OPTIONS = {
  industries: [
    'All Industries',
    'Tech & Software',
    'Banking & Fintech',
    'Public Sector',
    'Supply Chain & Logistics',
    'Healthcare & MedTech'
  ],
  jobFamilies: [
    'All Families',
    'Design & UX',
    'Software Engineering',
    'Product Management',
    'Cloud & DevOps',
    'Data & Analytics',
    'Marketing'
  ],
  experienceLevels: [
    'Any Level',
    'Fresh Grad',
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Lead / Director'
  ],
  workArrangements: ['Any', 'Hybrid', 'On-site', 'Remote'],
  salaryRanges: [
    { label: 'All Salaries', min: 0 },
    { label: 'Min S$4,000+', min: 4000 },
    { label: 'Min S$6,000+', min: 6000 },
    { label: 'Min S$7,500+', min: 7500 },
    { label: 'Min S$9,000+', min: 9000 }
  ]
};
