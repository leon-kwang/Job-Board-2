import React, { useState, useMemo } from 'react';
import { Job, CandidateProfile } from '../types';
import { SearchFilterBar } from './SearchFilterBar';
import { JobCard } from './JobCard';
import { JobDetailPane } from './JobDetailPane';
import { Sparkles, Filter, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

interface FindJobsViewProps {
  jobs: Job[];
  candidate: CandidateProfile;
  selectedJobId: string;
  onSelectJobId: (id: string) => void;
  savedJobIds: Set<string>;
  onToggleSaveJob: (jobId: string) => void;
  appliedJobIds: Set<string>;
  onApplyJob: (jobId: string) => void;
  onOpenCvModal: () => void;
  onOpenSavedSearchesModal: () => void;
  onSaveCurrentSearchAlert: (searchTitle: string, queryParams: any) => void;
  isCurrentSearchSaved: boolean;
  onSelectCourse: (courseTitle: string) => void;
}

export const FindJobsView: React.FC<FindJobsViewProps> = ({
  jobs,
  candidate,
  selectedJobId,
  onSelectJobId,
  savedJobIds,
  onToggleSaveJob,
  appliedJobIds,
  onApplyJob,
  onOpenCvModal,
  onOpenSavedSearchesModal,
  onSaveCurrentSearchAlert,
  isCurrentSearchSaved,
  onSelectCourse,
}) => {
  // Search parameters
  const [keyword, setKeyword] = useState('Senior UX/Product Designer');
  const [location, setLocation] = useState('Singapore, Central / CBD');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedJobFamily, setSelectedJobFamily] = useState('All Families');
  const [selectedExperience, setSelectedExperience] = useState('Any Level');
  const [selectedWorkArrangement, setSelectedWorkArrangement] = useState('Any');
  const [selectedMinSalary, setSelectedMinSalary] = useState(4000);
  const [onlyFreshGrads, setOnlyFreshGrads] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(true);

  // Filtered jobs logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword match (title, company, description, skills)
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesSkills = job.requiredSkills.some((s) => s.toLowerCase().includes(query));
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) {
          return false;
        }
      }

      // Location match
      if (location.trim()) {
        const locQuery = location.toLowerCase();
        if (
          !job.location.toLowerCase().includes(locQuery) &&
          !job.district.toLowerCase().includes(locQuery) &&
          !locQuery.includes('singapore')
        ) {
          // If query has specific words
          const words = locQuery.split(/[\s,]+/);
          const anyWordMatches = words.some(w => w.length > 2 && (job.location.toLowerCase().includes(w) || job.district.toLowerCase().includes(w)));
          if (!anyWordMatches && !locQuery.includes('singapore')) {
            return false;
          }
        }
      }

      // Work arrangement
      if (selectedWorkArrangement !== 'Any' && job.workArrangement !== selectedWorkArrangement) {
        return false;
      }

      // Minimum salary
      if (selectedMinSalary > 0 && job.salaryMin < selectedMinSalary) {
        return false;
      }

      // Industry
      if (selectedIndustry !== 'All Industries' && job.industry !== selectedIndustry) {
        return false;
      }

      // Job Family
      if (selectedJobFamily !== 'All Families' && job.jobFamily !== selectedJobFamily) {
        return false;
      }

      // Experience
      if (selectedExperience !== 'Any Level' && job.experienceLevel !== selectedExperience) {
        return false;
      }

      // Fresh grads
      if (onlyFreshGrads && !job.graduateTrack) {
        return false;
      }

      // Verified employer
      if (onlyVerified && !job.verifiedEmployer) {
        return false;
      }

      return true;
    });
  }, [
    jobs,
    keyword,
    location,
    selectedWorkArrangement,
    selectedMinSalary,
    selectedIndustry,
    selectedJobFamily,
    selectedExperience,
    onlyFreshGrads,
    onlyVerified,
  ]);

  // Selected job object
  const activeJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || filteredJobs[0] || jobs[0];
  }, [jobs, selectedJobId, filteredJobs]);

  const handleSaveSearch = () => {
    const title = `${keyword || 'All Roles'} in ${location || 'Singapore'}`;
    onSaveCurrentSearchAlert(title, {
      keyword,
      location,
      industry: selectedIndustry,
      jobFamily: selectedJobFamily,
      minSalary: selectedMinSalary,
      workArrangement: selectedWorkArrangement,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9ff]">
      {/* Search Filter Header Bar */}
      <SearchFilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        location={location}
        onLocationChange={setLocation}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedJobFamily={selectedJobFamily}
        onJobFamilyChange={setSelectedJobFamily}
        selectedExperience={selectedExperience}
        onExperienceChange={setSelectedExperience}
        selectedWorkArrangement={selectedWorkArrangement}
        onWorkArrangementChange={setSelectedWorkArrangement}
        selectedMinSalary={selectedMinSalary}
        onMinSalaryChange={setSelectedMinSalary}
        onlyFreshGrads={onlyFreshGrads}
        onFreshGradsToggle={() => setOnlyFreshGrads(!onlyFreshGrads)}
        onlyVerified={onlyVerified}
        onVerifiedToggle={() => setOnlyVerified(!onlyVerified)}
        onSaveSearchAlert={handleSaveSearch}
        isSearchSaved={isCurrentSearchSaved}
        totalResultsCount={filteredJobs.length}
      />

      {/* Main Split-Pane Discovery Container */}
      <main className="flex-1 max-w-[75rem] w-full mx-auto px-4 lg:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Feed Column (approx 42% on desktop) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {/* Profile sync header bar */}
            <div className="p-3.5 bg-[#EFF6FF] border border-[#adc6ff] rounded-xl flex items-center justify-between gap-3 text-xs text-[#003f8b]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#003f8b] shrink-0" />
                <div>
                  <span className="font-bold block">
                    Jobs matched with {candidate.name}'s Profile
                  </span>
                  <span className="text-[11px] text-[#434751]">
                    Showing {filteredJobs.length} verified roles in Singapore • 94% Avg Match
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenCvModal}
                className="text-[11px] font-bold text-[#003f8b] hover:underline shrink-0 bg-white px-2 py-1 rounded-md border border-[#adc6ff]"
              >
                Edit Profile
              </button>
            </div>

            {/* List of Job Cards */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={activeJob?.id === job.id}
                    onSelect={() => onSelectJobId(job.id)}
                    isSaved={savedJobIds.has(job.id)}
                    onToggleSave={(e) => {
                      e.stopPropagation();
                      onToggleSaveJob(job.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-[#E5E7EB] space-y-3">
                <p className="text-sm font-bold text-[#1a1b21]">No matching jobs found with current filters</p>
                <p className="text-xs text-[#737783]">Try expanding your salary range, clearing specific filters, or modifying keywords.</p>
                <button
                  onClick={() => {
                    setKeyword('');
                    setLocation('');
                    setSelectedMinSalary(0);
                    setSelectedWorkArrangement('Any');
                    setSelectedIndustry('All Industries');
                    setSelectedJobFamily('All Families');
                  }}
                  className="px-4 py-2 bg-[#003f8b] text-white rounded-lg text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Detail Pane (approx 58% on desktop, sticky on large screens) */}
          <div className="lg:col-span-7 lg:sticky lg:top-20">
            {activeJob ? (
              <JobDetailPane
                job={activeJob}
                candidate={candidate}
                isSaved={savedJobIds.has(activeJob.id)}
                onToggleSave={() => onToggleSaveJob(activeJob.id)}
                onApply={() => onApplyJob(activeJob.id)}
                hasApplied={appliedJobIds.has(activeJob.id)}
                onSelectCourse={onSelectCourse}
              />
            ) : (
              <div className="p-12 text-center bg-white rounded-xl border border-[#E5E7EB] text-sm text-[#737783]">
                Select a job from the list to inspect full compatibility details
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
