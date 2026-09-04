import React from 'react';
import { Job } from '../types';
import { Bookmark, CheckCircle2, Clock, MapPin, Sparkles, Building2 } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: () => void;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSelected,
  onSelect,
  isSaved,
  onToggleSave,
}) => {
  return (
    <div
      onClick={onSelect}
      id={`job-card-${job.id}`}
      className={`p-4 rounded-xl border transition-all cursor-pointer relative text-left bg-white ${
        isSelected
          ? 'border-[#003f8b] ring-2 ring-[#003f8b]/15 shadow-md bg-[#ffffff]'
          : 'border-[#E5E7EB] hover:border-[#adc6ff] hover:shadow-xs'
      }`}
    >
      {/* Active Left indicator strip */}
      {isSelected && (
        <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#003f8b] rounded-r-full" />
      )}

      {/* Top Badges: Fast Response, Graduate Track, Date */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {job.fastResponse && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#fde68a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-pulse"></span>
              FAST RESPONSE
            </span>
          )}
          {job.graduateTrack && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1E40AF]">
              GRADUATE TRACK
            </span>
          )}
          {job.careerConversionEligible && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDFA] text-[#0F766E]">
              CCP ELIGIBLE
            </span>
          )}
          {job.skillsFutureApplicable && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f3f3fa] text-[#434751]">
              SKILLSFUTURE
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#737783] shrink-0">
          <Clock className="w-3 h-3" />
          <span>{job.datePosted}</span>
          <button
            onClick={onToggleSave}
            className={`p-1 rounded-md hover:bg-[#f3f3fa] transition-colors ml-1 ${
              isSaved ? 'text-[#0F766E]' : 'text-[#737783] hover:text-[#1a1b21]'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job'}
            aria-label="Save Job"
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Job Title & Company */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#1a1b21] group-hover:text-[#003f8b] leading-snug">
            {job.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-[#434751] mt-1">
            <span className="font-semibold text-[#1a1b21]">{job.company}</span>
            {job.verifiedEmployer && (
              <span className="inline-flex items-center text-[#0F766E]" title="Verified Employer">
                <CheckCircle2 className="w-3.5 h-3.5 fill-[#0F766E] text-white" />
              </span>
            )}
            <span className="text-[#c3c6d3]">•</span>
            <span>★ {job.rating} ({job.reviewCount})</span>
          </div>
        </div>

        {/* Company Logo */}
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-10 h-10 rounded-lg object-cover border border-[#E5E7EB] shrink-0 bg-white"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-[#f3f3fa] flex items-center justify-center text-[#737783] shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Location & Arrangement */}
      <div className="flex items-center gap-2 text-xs text-[#737783] mt-2">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {job.district || job.location}
        </span>
        <span className="text-[#c3c6d3]">•</span>
        <span className="font-medium text-[#434751]">{job.workArrangement}</span>
      </div>

      {/* Salary Range Badge */}
      <div className="mt-2.5 inline-block px-2.5 py-1 rounded-md bg-[#F0FDFA] border border-[#ccfbf1] text-xs font-bold text-[#0F766E]">
        {job.salaryCurrency}{job.salaryMin.toLocaleString()} - {job.salaryCurrency}{job.salaryMax.toLocaleString()} a {job.salaryPeriod}
      </div>

      {/* Snippet */}
      <p className="text-xs text-[#434751] line-clamp-2 mt-2 leading-relaxed">
        {job.description}
      </p>

      {/* Skills Match Indicator */}
      <div className="mt-3 pt-2.5 border-t border-[#f3f3fa] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-[#003f8b] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skills Match: {job.skillsMatchCount} of {job.totalSkillsCount}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#1E40AF]">
            {job.compatibilityPercent}% Match
          </span>
        </div>
      </div>

      {/* Key Skill Pills */}
      <div className="flex flex-wrap gap-1 mt-2">
        {job.requiredSkills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded bg-[#f3f3fa] text-[10px] font-medium text-[#434751]"
          >
            {skill}
          </span>
        ))}
        {job.requiredSkills.length > 3 && (
          <span className="px-1.5 py-0.5 text-[10px] text-[#737783]">
            +{job.requiredSkills.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};
