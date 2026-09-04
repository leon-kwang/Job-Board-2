import React, { useState } from 'react';
import { 
  NavigationTab, 
  Job, 
  CandidateProfile, 
  SavedSearch, 
  Application, 
  Course 
} from './types';
import { 
  INITIAL_CANDIDATE, 
  INITIAL_JOBS, 
  INITIAL_SAVED_SEARCHES, 
  INITIAL_APPLICATIONS, 
  INITIAL_COURSES 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { FindJobsView } from './components/FindJobsView';
import { SkillMatcherView } from './components/SkillMatcherView';
import { MyApplicationsView } from './components/MyApplicationsView';
import { CvUploadModal } from './components/CvUploadModal';
import { SavedSearchesModal } from './components/SavedSearchesModal';
import { MockInterviewModal } from './components/MockInterviewModal';
import { AdvisoryChatModal } from './components/AdvisoryChatModal';
import { NotificationsModal, NotificationItem } from './components/NotificationsModal';
import { CourseModal } from './components/CourseModal';
import { TalkToUsView } from './components/TalkToUsView';

export function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavigationTab>('find-jobs');

  // Candidate Profile (Can be updated via local CV, Cloud Drive, or LinkedIn)
  const [candidate, setCandidate] = useState<CandidateProfile>(INITIAL_CANDIDATE);

  // Jobs
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>(INITIAL_JOBS[0].id);

  // Saved & Applied jobs
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set(['job-03']));
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set(['job-01', 'job-06']));

  // Saved Searches & Notification Alerts
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(INITIAL_SAVED_SEARCHES);
  const [isCurrentSearchSaved, setIsCurrentSearchSaved] = useState(false);

  // Applications
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  // Courses
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Modals
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isSavedSearchesModalOpen, setIsSavedSearchesModalOpen] = useState(false);
  const [isMockInterviewModalOpen, setIsMockInterviewModalOpen] = useState(false);
  const [isAdvisoryChatModalOpen, setIsAdvisoryChatModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Interview Confirmed: GovTech Singapore',
      message: 'Technical panel scheduled for Thursday, 10:30 AM SGT. Google Meet link added to your calendar.',
      time: '1h ago',
      type: 'interview_reminder',
      read: false,
      jobId: 'job-01',
    },
    {
      id: 'notif-2',
      title: 'New Matching Opening: Straits Horizon Financial Group',
      message: 'Fintech Product Operations Lead (S$7,800 - S$9,500) matches your Senior UX & Banking parameters (96% fit).',
      time: '4h ago',
      type: 'job_alert',
      read: false,
      jobId: 'job-03',
    },
    {
      id: 'notif-3',
      title: 'Recruiter Update: Grab Holdings',
      message: 'Your CV was viewed 2 times and forwarded to the Engineering calibration panel.',
      time: '1d ago',
      type: 'application_update',
      read: true,
      jobId: 'job-02',
    },
  ]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Toggle Save Job
  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  // 1-Click Apply Job with TalentTrust Profile
  const handleApplyJob = (jobId: string) => {
    setAppliedJobIds((prev) => new Set(prev).add(jobId));

    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return;

    // Add new application to applications pipeline
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      company: targetJob.company,
      companyIcon: 'work',
      location: targetJob.location,
      appliedDate: 'Applied Just Now',
      status: 'submitted',
      statusLabel: 'Application Received',
      skillFitPercent: targetJob.compatibilityPercent,
      salaryText: `${targetJob.salaryCurrency}${targetJob.salaryMin.toLocaleString()} - ${targetJob.salaryCurrency}${targetJob.salaryMax.toLocaleString()} /mo`,
      currentStepIndex: 1,
      totalSteps: 4,
      currentStepName: 'Step 1 of 4: Profile Screening',
      avgReviewDays: 2.5,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Application Sent: ${targetJob.company}`,
        message: `Your verified profile was submitted for ${targetJob.title}. 3-Day response commitment active.`,
        time: 'Just now',
        type: 'application_update',
        read: false,
        jobId: targetJob.id,
      },
      ...prev,
    ]);
  };

  // Save Current Search Query as an Alert
  const handleSaveCurrentSearchAlert = (searchTitle: string, queryParams: any) => {
    const newSearch: SavedSearch = {
      id: `search-${Date.now()}`,
      title: searchTitle,
      what: queryParams.keyword || '',
      where: queryParams.location || 'Singapore',
      filters: {
        industries: queryParams.industry !== 'All Industries' ? [queryParams.industry] : undefined,
        jobFamilies: queryParams.jobFamily !== 'All Families' ? [queryParams.jobFamily] : undefined,
        minSalary: queryParams.minSalary > 0 ? queryParams.minSalary : undefined,
        workArrangement: queryParams.workArrangement !== 'Any' ? queryParams.workArrangement : undefined,
      },
      frequency: 'instant',
      channels: ['email', 'in_app'],
      createdAt: 'Just now',
      newOpeningsCount: 1,
      active: true,
    };

    setSavedSearches((prev) => [newSearch, ...prev]);
    setIsCurrentSearchSaved(true);

    // Trigger confirmation notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Saved Search Alert Active`,
        message: `You will now receive instant alerts whenever new roles matching "${searchTitle}" are posted.`,
        time: 'Just now',
        type: 'job_alert',
        read: false,
      },
      ...prev,
    ]);
  };

  // Trigger simulated notification from Saved Searches modal
  const handleTriggerSimulatedNotification = (searchTitle: string) => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `New Opening Alert: ${searchTitle}`,
        message: `Cognitive Cloud Systems just posted a new Enterprise AI Solutions Consultant opening in One-North (S$8,200 - S$10,200/mo).`,
        time: 'Just now',
        type: 'job_alert',
        read: false,
        jobId: 'job-04',
      },
      ...prev,
    ]);
  };

  // Toggle active status on a saved search
  const handleToggleActiveSearch = (searchId: string) => {
    setSavedSearches((prev) =>
      prev.map((s) => (s.id === searchId ? { ...s, active: !s.active } : s))
    );
  };

  // Delete saved search
  const handleDeleteSearch = (searchId: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== searchId));
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Select job from notification
  const handleSelectNotificationJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setActiveTab('find-jobs');
    setIsNotificationsModalOpen(false);
  };

  // Select course from fit pane
  const handleSelectCourseByName = (courseName: string) => {
    const found = courses.find((c) =>
      courseName.toLowerCase().includes(c.title.toLowerCase()) ||
      c.title.toLowerCase().includes(courseName.toLowerCase())
    ) || courses[0];
    setSelectedCourse(found);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#1a1b21] font-sans antialiased">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        candidate={candidate}
        savedJobsCount={savedJobIds.size}
        savedSearches={savedSearches}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenSavedSearchesModal={() => setIsSavedSearchesModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsModalOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* View Switcher */}
      <div className="flex-1">
        {activeTab === 'find-jobs' && (
          <FindJobsView
            jobs={jobs}
            candidate={candidate}
            selectedJobId={selectedJobId}
            onSelectJobId={setSelectedJobId}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
            appliedJobIds={appliedJobIds}
            onApplyJob={handleApplyJob}
            onOpenCvModal={() => setIsCvModalOpen(true)}
            onOpenSavedSearchesModal={() => setIsSavedSearchesModalOpen(true)}
            onSaveCurrentSearchAlert={handleSaveCurrentSearchAlert}
            isCurrentSearchSaved={isCurrentSearchSaved}
            onSelectCourse={handleSelectCourseByName}
          />
        )}

        {activeTab === 'skill-matcher' && (
          <SkillMatcherView
            candidate={candidate}
            jobs={jobs}
            courses={courses}
            onOpenCvModal={() => setIsCvModalOpen(true)}
            onSelectJob={(id) => {
              setSelectedJobId(id);
              setActiveTab('find-jobs');
            }}
            onApplyJob={handleApplyJob}
            appliedJobIds={appliedJobIds}
            onStartMockInterview={() => setIsMockInterviewModalOpen(true)}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        )}

        {activeTab === 'career-conversion' && (
          <SkillMatcherView
            candidate={candidate}
            jobs={jobs}
            courses={courses}
            onOpenCvModal={() => setIsCvModalOpen(true)}
            onSelectJob={(id) => {
              setSelectedJobId(id);
              setActiveTab('find-jobs');
            }}
            onApplyJob={handleApplyJob}
            appliedJobIds={appliedJobIds}
            onStartMockInterview={() => setIsMockInterviewModalOpen(true)}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        )}

        {activeTab === 'my-applications' && (
          <MyApplicationsView
            candidate={candidate}
            applications={applications}
            onOpenMockInterview={() => setIsMockInterviewModalOpen(true)}
            onOpenAdvisoryChat={() => setIsAdvisoryChatModalOpen(true)}
            onViewJob={(id) => {
              setSelectedJobId(id);
              setActiveTab('find-jobs');
            }}
          />
        )}

        {activeTab === 'company-reviews' && (
          <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
            <h1 className="text-2xl font-bold text-[#1a1b21]">
              Singapore Verified Company Reviews & Workplace Transparencies
            </h1>
            <p className="text-sm text-[#434751]">
              Browse verified candidate interview experiences and salary compensation benchmarks for GovTech Singapore, Grab, and DBS Bank.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
                <span className="text-xs font-bold text-[#003f8b]">GovTech Singapore</span>
                <p className="text-lg font-black mt-1">★ 4.4 / 5.0</p>
                <p className="text-xs text-[#737783] mt-1">312 Verified Reviews • 88% Recommend to a Friend</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
                <span className="text-xs font-bold text-[#003f8b]">Grab Holdings</span>
                <p className="text-lg font-black mt-1">★ 4.2 / 5.0</p>
                <p className="text-xs text-[#737783] mt-1">489 Verified Reviews • Fast Response Employer</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
                <span className="text-xs font-bold text-[#003f8b]">DBS Bank</span>
                <p className="text-lg font-black mt-1">★ 4.4 / 5.0</p>
                <p className="text-xs text-[#737783] mt-1">520 Verified Reviews • Top Employer for Fintech</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('find-jobs')}
              className="mt-6 px-6 py-2.5 bg-[#003f8b] text-white rounded-xl text-xs font-bold"
            >
              Back to Job Search
            </button>
          </div>
        )}

        {activeTab === 'talk-to-us' && (
          <TalkToUsView />
        )}
      </div>

      {/* Interactive Modals */}
      <CvUploadModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        candidate={candidate}
        onUpdateCandidate={setCandidate}
      />

      <SavedSearchesModal
        isOpen={isSavedSearchesModalOpen}
        onClose={() => setIsSavedSearchesModalOpen(false)}
        savedSearches={savedSearches}
        onToggleActive={handleToggleActiveSearch}
        onDeleteSearch={handleDeleteSearch}
        onTriggerSimulatedNotification={handleTriggerSimulatedNotification}
      />

      <MockInterviewModal
        isOpen={isMockInterviewModalOpen}
        onClose={() => setIsMockInterviewModalOpen(false)}
        candidateName={candidate.name}
      />

      <AdvisoryChatModal
        isOpen={isAdvisoryChatModalOpen}
        onClose={() => setIsAdvisoryChatModalOpen(false)}
        candidateName={candidate.name}
      />

      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotificationJob={handleSelectNotificationJob}
      />

      <CourseModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
      />
    </div>
  );
}

export default App;
