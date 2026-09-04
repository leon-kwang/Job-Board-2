import React, { useState } from 'react';
import { Job, CandidateProfile } from '../types';
import { 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  AlertCircle, 
  School, 
  Building2, 
  MapPin, 
  Briefcase, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';

interface JobDetailPaneProps {
  job: Job;
  candidate: CandidateProfile;
  isSaved: boolean;
  onToggleSave: () => void;
  onApply: () => void;
  hasApplied: boolean;
  onSelectCourse: (courseName: string) => void;
}

export const JobDetailPane: React.FC<JobDetailPaneProps> = ({
  job,
  candidate,
  isSaved,
  onToggleSave,
  onApply,
  hasApplied,
  onSelectCourse,
}) => {
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    matchScore?: number;
    matchHeadline?: string;
    goodFitReasons?: string[];
    notGoodFitReasons?: string[];
    skillGaps?: any[];
  } | null>(null);

  const [appliedFeedback, setAppliedFeedback] = useState(false);

  // Trigger Gemini AI fit analysis from backend server route
  const handleRunAiFitAnalysis = async () => {
    setIsAnalyzingAi(true);
    try {
      const res = await fetch('/api/analyze-fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate,
          job,
        }),
      });
      const data = await res.json();
      setAiAnalysis(data);
    } catch (err) {
      console.error('Error running AI fit analysis:', err);
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  // Compute displayed values (either from Gemini server API or curated job data)
  const currentScore = aiAnalysis?.matchScore ?? job.compatibilityPercent;
  const goodFitReasons = aiAnalysis?.goodFitReasons ?? job.goodFitReasons;
  const notGoodFitReasons = aiAnalysis?.notGoodFitReasons ?? job.notGoodFitReasons;
  const skillGaps = aiAnalysis?.skillGaps ?? job.skillGaps;

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden text-left flex flex-col h-full">
      {/* Top Header Strip */}
      <div className="p-6 border-b border-[#E5E7EB] bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider bg-[#F0FDFA] px-2 py-0.5 rounded-sm">
              Open Position • Actively Reviewing
            </span>
            <h1 className="text-2xl font-extrabold text-[#1a1b21] mt-1.5 leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[#434751]">
              <span className="font-bold text-[#1a1b21]">{job.company}</span>
              {job.verifiedEmployer && (
                <span className="inline-flex items-center gap-1 text-[#0F766E] font-semibold text-xs bg-[#F0FDFA] px-2 py-0.5 rounded-full border border-[#ccfbf1]">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-[#0F766E] text-white" />
                  Verified Employer
                </span>
              )}
              <span className="text-[#c3c6d3]">•</span>
              <span className="text-amber-600 font-bold">★ {job.rating}</span>
              <span className="text-xs text-[#737783]">({job.reviewCount} reviews)</span>
              <span className="text-[#c3c6d3]">•</span>
              <span className="flex items-center gap-1 text-xs text-[#737783]">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
            </div>

            {/* Salary Highlight Badge */}
            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-black text-[#0F766E]">
                {job.salaryCurrency}{job.salaryMin.toLocaleString()} – {job.salaryCurrency}{job.salaryMax.toLocaleString()}
              </span>
              <span className="text-xs text-[#737783] font-medium">
                a {job.salaryPeriod} • Verified Full-Time Range
              </span>
            </div>
          </div>

          {/* Company Logo badge */}
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 rounded-xl object-cover border border-[#E5E7EB] shrink-0 bg-white shadow-xs p-1"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-[#f3f3fa] flex items-center justify-center text-[#737783] shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              onApply();
              setAppliedFeedback(true);
              setTimeout(() => setAppliedFeedback(false), 3500);
            }}
            disabled={hasApplied}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-xs ${
              hasApplied
                ? 'bg-[#10b981] text-white cursor-default'
                : 'bg-[#003f8b] hover:bg-[#2557a7] text-white hover:shadow-md active:scale-98'
            }`}
            id="job-detail-apply-btn"
          >
            {hasApplied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Application Submitted with Profile</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Apply Now (1-Click with TalentTrust Profile)</span>
              </>
            )}
          </button>

          <button
            onClick={onToggleSave}
            className={`px-4 py-3 rounded-xl border text-sm font-bold flex items-center gap-1.5 transition-colors ${
              isSaved
                ? 'bg-[#F0FDFA] border-[#0F766E] text-[#0F766E]'
                : 'bg-white border-[#c3c6d3] text-[#434751] hover:bg-[#f3f3fa]'
            }`}
            id="job-detail-save-btn"
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleRunAiFitAnalysis}
            disabled={isAnalyzingAi}
            className="px-3.5 py-3 rounded-xl border border-[#adc6ff] bg-[#EFF6FF] hover:bg-[#d8e2ff] text-[#003f8b] text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Refresh AI Match & Fit Analysis using Gemini"
            id="run-gemini-fit-btn"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAnalyzingAi ? 'animate-spin' : ''}`} />
            <span>{isAnalyzingAi ? 'Analyzing Fit...' : 'AI Deep-Dive Analysis'}</span>
          </button>
        </div>

        {appliedFeedback && (
          <div className="mt-3 p-2.5 bg-[#F0FDFA] border border-[#0F766E]/30 rounded-lg text-xs text-[#0F766E] font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Your verified TalentTrust CV was safely transmitted to {job.company}. Recruiter expected response: 3 business days!</span>
          </div>
        )}
      </div>

      {/* Candidate Peace of Mind Banner (Verified under Singapore Fair Consideration Framework) */}
      <div className="bg-[#f3f3fa] px-6 py-3 border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#003f8b] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
          <span>Candidate Peace of Mind Guarantee</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#434751]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
            Fair Consideration Framework Compliant
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
            Guaranteed Salary Transparency
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
            3-Day Response Target
          </span>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="p-6 space-y-7 overflow-y-auto flex-1">
        {/* SKILLS COMPATIBILITY MATCH SECTION */}
        <section className="p-5 rounded-2xl bg-[#EFF6FF] border border-[#adc6ff] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#003f8b]" />
                <h2 className="text-base font-bold text-[#003f8b]">
                  Skills Compatibility Match
                </h2>
              </div>
              <p className="text-xs text-[#434751]">
                AI-calculated match comparing {candidate.name}'s verified credentials and CV against {job.company}'s requirements.
              </p>
            </div>

            {/* Radial Match Indicator */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#adc6ff] shrink-0 shadow-2xs">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#E5E7EB"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#003f8b"
                    strokeWidth="4"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 - (125.6 * currentScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-xs font-black text-[#003f8b]">
                  {currentScore}%
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#737783] block">Compatibility</span>
                <span className="text-xs font-extrabold text-[#003f8b]">
                  {currentScore >= 90 ? 'Direct Strong Match' : 'High Potential Match'}
                </span>
              </div>
            </div>
          </div>

          {/* Matched Skills Pills */}
          <div className="mt-4 pt-3 border-t border-[#adc6ff]/50">
            <span className="text-xs font-bold text-[#1a1b21] block mb-2">
              Matched Skills in Your Profile:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-[#003f8b] border border-[#adc6ff] shadow-2xs"
                >
                  <Check className="w-3 h-3 text-[#0F766E]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* WHY THIS JOB IS A GOOD FIT vs NOT A GOOD FIT (Explicit User Requirement) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1a1b21]">
              Fit Analysis & Candidate Assessment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WHY IT IS A GOOD FIT */}
            <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#ccfbf1] space-y-3">
              <div className="flex items-center gap-2 text-[#0F766E] font-bold text-sm">
                <ThumbsUp className="w-4 h-4" />
                <span>Why this is a Good Fit</span>
              </div>
              <ul className="space-y-2 text-xs text-[#434751] leading-relaxed">
                {goodFitReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHY IT MAY NOT BE A GOOD FIT / POTENTIAL GAPS */}
            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#fde68a] space-y-3">
              <div className="flex items-center gap-2 text-[#B45309] font-bold text-sm">
                <ThumbsDown className="w-4 h-4" />
                <span>Areas to Consider / Potential Gaps</span>
              </div>
              <ul className="space-y-2 text-xs text-[#434751] leading-relaxed">
                {notGoodFitReasons.map((gapReason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                    <span>{gapReason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* IDENTIFIED SKILL GAPS & RECOMMENDED CERTIFICATIONS / TRAINING (Explicit User Requirement) */}
        {skillGaps && skillGaps.length > 0 && (
          <section className="p-5 rounded-2xl bg-[#FFFBEB]/40 border border-[#fde68a] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-[#B45309]" />
                <h2 className="text-sm font-bold text-[#B45309]">
                  Identified Skill Gap & Recommended Training Pathway
                </h2>
              </div>
              <span className="text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] px-2 py-0.5 rounded-full border border-[#fde68a]">
                SkillsFuture Subsidised
              </span>
            </div>

            <p className="text-xs text-[#434751]">
              Bridging these gaps elevates your candidate fit score and positions you in the top 5% of applicants for {job.title} roles.
            </p>

            <div className="space-y-2 mt-2">
              {skillGaps.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded-xl border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ba1a1a]/10 text-[#ba1a1a]">
                        {item.priority} Gap
                      </span>
                      <span className="text-xs font-bold text-[#1a1b21]">
                        {item.skill}
                      </span>
                    </div>
                    <p className="text-xs text-[#003f8b] font-medium">
                      {item.recommendedCourse}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-[#737783]">
                      <span>{item.institution}</span>
                      <span>•</span>
                      <span className="text-[#0F766E] font-semibold">{item.subsidy}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCourse(item.recommendedCourse)}
                    className="px-3 py-1.5 rounded-lg bg-[#003f8b] hover:bg-[#2557a7] text-white text-xs font-bold flex items-center justify-center gap-1 shrink-0 transition-colors"
                  >
                    <span>View Course</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WORKPLACE PHOTO GALLERY */}
        {job.photos && job.photos.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#1a1b21]">
              Workplace & Team Environment
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {job.photos.map((url, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden h-36 border border-[#E5E7EB] group">
                  <img
                    src={url}
                    alt={`Workplace photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide">
                    {idx === 0 ? 'Design Studio & Collaboration Hub' : 'UX Usability Testing Lab'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FULL JOB DESCRIPTION */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#1a1b21]">
            About the Role
          </h2>
          <p className="text-sm text-[#434751] leading-relaxed">
            {job.description}
          </p>
        </section>

        {/* KEY RESPONSIBILITIES */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#1a1b21]">
            Key Responsibilities
          </h2>
          <ul className="space-y-2 text-sm text-[#434751]">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#003f8b] mt-2 shrink-0"></span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CANDIDATE BENEFITS & PERKS */}
        {job.benefits && job.benefits.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1a1b21]">
              Candidate Benefits & Welfare
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#f9f9ff] flex items-start gap-3"
                >
                  <div className="p-2 bg-white rounded-lg border border-[#E5E7EB] text-[#003f8b] shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1a1b21]">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-[#737783] mt-0.5 leading-snug">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INTERVIEW INSIGHTS */}
        {job.interviewInsights && (
          <section className="p-4 rounded-xl bg-[#f3f3fa] border border-[#c3c6d3] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#003f8b]">
              <Info className="w-4 h-4" />
              <span>TalentTrust Verified Interview Insights</span>
            </div>
            <p className="text-xs text-[#434751] leading-relaxed">
              {job.interviewInsights}
            </p>
          </section>
        )}

        {/* WORKPLACE ADDRESS & LOCATION */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1a1b21]">
            Workplace Location
          </h2>
          <div className="p-3.5 rounded-xl border border-[#E5E7EB] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#EFF6FF] text-[#003f8b]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1a1b21]">{job.address}</p>
                <p className="text-[11px] text-[#737783] mt-0.5">5 mins walk from Pasir Panjang MRT (CC26) • Direct sheltered walkway</p>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#003f8b] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Apply Callout */}
      <div className="p-4 border-t border-[#E5E7EB] bg-[#f9f9ff] flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#1a1b21] block">
            Ready to apply with your TalentTrust profile?
          </span>
          <span className="text-[11px] text-[#737783]">
            {currentScore}% match based on your verified CV and skills.
          </span>
        </div>

        <button
          onClick={onApply}
          disabled={hasApplied}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            hasApplied
              ? 'bg-[#10b981] text-white cursor-default'
              : 'bg-[#003f8b] hover:bg-[#2557a7] text-white'
          }`}
        >
          {hasApplied ? 'Applied' : 'Instant 1-Click Apply'}
        </button>
      </div>
    </div>
  );
};
