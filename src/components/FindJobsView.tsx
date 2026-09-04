import React, { useState, useMemo } from 'react';
import { Job, CandidateProfile, JobSortOption } from '../types';
import { SearchFilterBar } from './SearchFilterBar';
import { JobCard } from './JobCard';
import { JobDetailPane } from './JobDetailPane';
import { Sparkles, Filter, SlidersHorizontal, CheckCircle2, ArrowUpDown, Users, Calendar, TrendingUp } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState<JobSortOption>('applicants-desc');

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

  // Sorted jobs logic (ability to sort by number of applicants, date posted / days open, match %, salary)
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    switch (sortBy) {
      case 'applicants-desc':
        return list.sort((a, b) => b.applicantsCount - a.applicantsCount);
      case 'applicants-asc':
        return list.sort((a, b) => a.applicantsCount - b.applicantsCount);
      case 'match-desc':
        return list.sort((a, b) => b.compatibilityPercent - a.compatibilityPercent);
      case 'days-asc':
        return list.sort((a, b) => a.daysOpen - b.daysOpen);
      case 'salary-desc':
        return list.sort((a, b) => b.salaryMax - a.salaryMax);
      default:
        return list;
    }
  }, [filteredJobs, sortBy]);

  // Selected job object
  const activeJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || sortedJobs[0] || jobs[0];
  }, [jobs, selectedJobId, sortedJobs]);

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
        totalResultsCount={sortedJobs.length}
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
                    Showing {sortedJobs.length} verified roles in Singapore • 94% Avg Match
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

            {/* Sorting & Job Count Controls */}
            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-extrabold text-[#1a1b21]">{sortedJobs.length} Roles Found</span>
                  <span className="text-[#c3c6d3]">•</span>
                  <span className="text-[#737783]">Real-time Singapore feed</span>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-jobs-by" className="text-xs font-bold text-[#434751] flex items-center gap-1 shrink-0">
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#003f8b]" />
                    <span>Sort by:</span>
                  </label>
                  <select
                    id="sort-jobs-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as JobSortOption)}
                    className="px-2.5 py-1.5 bg-[#f9f9ff] border border-[#c3c6d3] rounded-lg text-xs font-bold text-[#003f8b] hover:border-[#003f8b] focus:outline-none focus:ring-1 focus:ring-[#003f8b] cursor-pointer"
                  >
                    <option value="applicants-desc">👥 Most Applicants (High to Low)</option>
                    <option value="applicants-asc">👥 Fewest Applicants (Low to High)</option>
                    <option value="match-desc">✨ Highest Skills Match %</option>
                    <option value="days-asc">📅 Recently Posted (Days Open)</option>
                    <option value="salary-desc">💰 Salary: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Quick sort shortcut pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#f3f3fa] text-xs">
                <span className="text-[11px] font-semibold text-[#737783]">Quick sort:</span>
                <button
                  type="button"
                  onClick={() => setSortBy('applicants-desc')}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                    sortBy === 'applicants-desc'
                      ? 'bg-[#003f8b] text-white border-[#003f8b]'
                      : 'bg-[#f3f3fa] text-[#434751] border-transparent hover:border-[#c3c6d3]'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  Most Applicants
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('applicants-asc')}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                    sortBy === 'applicants-asc'
                      ? 'bg-[#003f8b] text-white border-[#003f8b]'
                      : 'bg-[#f3f3fa] text-[#434751] border-transparent hover:border-[#c3c6d3]'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  Fewest Applicants
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('days-asc')}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                    sortBy === 'days-asc'
                      ? 'bg-[#003f8b] text-white border-[#003f8b]'
                      : 'bg-[#f3f3fa] text-[#434751] border-transparent hover:border-[#c3c6d3]'
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  Newest / Least Days Open
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('match-desc')}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                    sortBy === 'match-desc'
                      ? 'bg-[#003f8b] text-white border-[#003f8b]'
                      : 'bg-[#f3f3fa] text-[#434751] border-transparent hover:border-[#c3c6d3]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  Best Match
                </button>
              </div>
            </div>

            {/* List of Job Cards */}
            {sortedJobs.length > 0 ? (
              <div className="space-y-3">
                {sortedJobs.map((job) => (
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
