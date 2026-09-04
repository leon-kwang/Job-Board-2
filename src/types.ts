export type NavigationTab = 
  | 'find-jobs' 
  | 'skill-matcher' 
  | 'my-applications' 
  | 'career-conversion' 
  | 'company-reviews'
  | 'talk-to-us';

export interface SkillGapItem {
  skill: string;
  priority: 'Critical' | 'Moderate' | 'Nice-to-have';
  recommendedCourse: string;
  institution: string;
  subsidy: string;
  duration: string;
}

export interface BenefitItem {
  title: string;
  desc: string;
  icon: string;
}

export type JobSortOption = 
  | 'applicants-desc' 
  | 'applicants-asc' 
  | 'match-desc' 
  | 'days-asc' 
  | 'salary-desc';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  rating: number;
  reviewCount: number;
  glassdoorRating: number;
  glassdoorReviewCount: number;
  location: string;
  district: string;
  workArrangement: 'Hybrid' | 'On-site' | 'Remote';
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  salaryPeriod: 'month' | 'year';
  verifiedEmployer: boolean;
  fastResponse: boolean;
  graduateTrack: boolean;
  careerConversionEligible: boolean;
  skillsFutureApplicable: boolean;
  activelyHiring: boolean;
  postedDaysAgo: number;
  datePosted: string;
  postingDate: string;
  daysOpen: number;
  applicantsCount: number;
  industry: string;
  jobFamily: string;
  experienceLevel: 'Fresh Grad' | 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Lead / Director';
  jobType: 'Full-time' | 'Contract' | 'Permanent' | 'Part-time';
  description: string;
  responsibilities: string[];
  benefits: BenefitItem[];
  requiredSkills: string[];
  niceToHave: string[];
  photos: string[];
  address: string;
  interviewInsights: string;
  skillsMatchCount: number;
  totalSkillsCount: number;
  compatibilityPercent: number;
  goodFitReasons: string[];
  notGoodFitReasons: string[];
  skillGaps: SkillGapItem[];
  applicationStatus?: 'Not Applied' | 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Saved';
}

export interface CandidateProfile {
  id: string;
  name: string;
  headline: string;
  photoUrl: string;
  verifiedStatus: boolean;
  currentCvName: string;
  cvLastUpdated: string;
  cvSource: 'local' | 'gdrive' | 'dropbox' | 'onedrive' | 'linkedin';
  linkedInUrl: string;
  experienceYears: number;
  education: string;
  skills: string[];
  targetIndustries: string[];
  salaryExpectationMin: number;
  preferredWorkArrangement: string;
  bioSummary: string;
}

export interface SavedSearch {
  id: string;
  title: string;
  what: string;
  where: string;
  filters: {
    industries?: string[];
    jobFamilies?: string[];
    minSalary?: number;
    workArrangement?: string;
    experienceLevel?: string;
    datePosted?: string;
  };
  frequency: 'instant' | 'daily' | 'weekly';
  channels: ('email' | 'in_app' | 'push')[];
  createdAt: string;
  newOpeningsCount: number;
  active: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyIcon: string;
  location: string;
  appliedDate: string;
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'offer' | 'archived';
  statusLabel: string;
  skillFitPercent: number;
  salaryText: string;
  nextStep?: {
    title: string;
    datetime: string;
    duration: string;
    linkInfo: string;
    isUrgent?: boolean;
  };
  recruiterMilestone?: {
    viewsCount: number;
    shortlistedStage: string;
    expectedResponse: string;
  };
  currentStepIndex: number;
  totalSteps: number;
  currentStepName: string;
  avgReviewDays: number;
}

export interface Course {
  id: string;
  title: string;
  institution: string;
  category: string;
  ssgFundingPercent: number;
  originalFee: number;
  netPayableFee: number;
  description: string;
  salaryPotential: string;
  skillsFutureEligible: boolean;
  duration: string;
  badge?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Behavioral' | 'Technical' | 'Case Study';
  targetRole: string;
  rubric: string;
}
