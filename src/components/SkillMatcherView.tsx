import React, { useState } from 'react';
import { Job, CandidateProfile, Course } from '../types';
import { 
  Sparkles, 
  FileText, 
  Upload, 
  Linkedin, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  School,
  Play,
  Check,
  Building2,
  MapPin,
  Bookmark
} from 'lucide-react';

interface SkillMatcherViewProps {
  candidate: CandidateProfile;
  jobs: Job[];
  courses: Course[];
  onOpenCvModal: () => void;
  onSelectJob: (jobId: string) => void;
  onApplyJob: (jobId: string) => void;
  appliedJobIds: Set<string>;
  onStartMockInterview: () => void;
  onSelectCourse: (course: Course) => void;
}

export const SkillMatcherView: React.FC<SkillMatcherViewProps> = ({
  candidate,
  jobs,
  courses,
  onOpenCvModal,
  onSelectJob,
  onApplyJob,
  appliedJobIds,
  onStartMockInterview,
  onSelectCourse,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ranked' | 'gaps' | 'ccp'>('ranked');

  // Sorted by match compatibility
  const rankedJobs = [...jobs].sort((a, b) => b.compatibilityPercent - a.compatibilityPercent);

  return (
    <div className="min-h-screen bg-[#f9f9ff] py-6 text-left">
      <div className="max-w-[75rem] mx-auto px-4 lg:px-6 space-y-6">
        {/* Top Match Engine Header Strip */}
        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F0FDFA] text-[#0F766E] border border-[#ccfbf1]">
                <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse"></span>
                Skills Development Agency Sync Active
              </div>
              <h1 className="text-2xl font-black text-[#1a1b21]">
                Your Career Match Engine
              </h1>
              <p className="text-sm text-[#434751]">
                AI matching your diploma & university qualifications against verified employer vacancies in Singapore. Powered by Workforce Development insights.
              </p>
            </div>

            {/* Candidate Resume & LinkedIn Sync Card */}
            <div className="flex items-center gap-3 p-3 bg-[#f3f3fa] rounded-xl border border-[#c3c6d3] shrink-0">
              <div className="p-2.5 bg-white rounded-lg border border-[#c3c6d3] text-[#003f8b]">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#1a1b21] block">
                  {candidate.currentCvName}
                </span>
                <span className="text-[11px] text-[#737783] block">
                  Last updated {candidate.cvLastUpdated} • {candidate.skills.length} skills parsed
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-[#0F766E] font-semibold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> LinkedIn Synced
                  </span>
                  <button
                    onClick={onOpenCvModal}
                    className="text-[11px] font-bold text-[#003f8b] hover:underline"
                    id="engine-update-cv-btn"
                  >
                    Update CV / Sync
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Key Metric Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#f3f3fa]">
            {/* Metric 1 */}
            <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#adc6ff]">
              <span className="text-xs font-bold text-[#003f8b] uppercase tracking-wider block">
                Target Fit Pipeline
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-[#003f8b]">18 Roles</span>
                <span className="text-xs text-[#434751] font-semibold">&gt;85% fit index</span>
              </div>
              <p className="text-xs text-[#434751] mt-1 leading-snug">
                Based on polytechnic diploma + 4-year degree in digital product strategy.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#ccfbf1]">
              <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider block">
                Top In-Demand Skill for You
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-[#0F766E]">+34% Premium</span>
              </div>
              <p className="text-xs text-[#434751] mt-1 leading-snug">
                Cloud Architecture & GenAI prompt mastery across 142 active vacancies.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#fde68a]">
              <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider block">
                Career Conversion Track
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-[#B45309]">6 Programmes</span>
              </div>
              <p className="text-xs text-[#434751] mt-1 leading-snug">
                Government co-funded with 70% - 90% salary wage support during conversion.
              </p>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2 text-sm font-bold">
          <button
            onClick={() => setActiveSubTab('ranked')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === 'ranked'
                ? 'bg-[#003f8b] text-white shadow-xs'
                : 'text-[#434751] hover:bg-[#f3f3fa]'
            }`}
          >
            Best Matched Roles (Ranked) ({rankedJobs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('gaps')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === 'gaps'
                ? 'bg-[#003f8b] text-white shadow-xs'
                : 'text-[#434751] hover:bg-[#f3f3fa]'
            }`}
          >
            Skill Gap & Micro-Courses
          </button>
          <button
            onClick={() => setActiveSubTab('ccp')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === 'ccp'
                ? 'bg-[#003f8b] text-white shadow-xs'
                : 'text-[#434751] hover:bg-[#f3f3fa]'
            }`}
          >
            Career Conversion Programmes (CCP) Subsidised
          </button>
        </div>

        {/* TAB CONTENT: Best Matched Roles (Ranked) */}
        {activeSubTab === 'ranked' && (
          <div className="space-y-4">
            {rankedJobs.map((job, idx) => {
              const hasApplied = appliedJobIds.has(job.id);
              return (
                <div
                  key={job.id}
                  className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-[#adc6ff] transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#003f8b] text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                        #{idx + 1}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-bold text-[#1a1b21]">
                            {job.title}
                          </h2>
                          {job.compatibilityPercent >= 92 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDFA] text-[#0F766E] border border-[#ccfbf1]">
                              Fast-Track Candidate
                            </span>
                          )}
                          {job.careerConversionEligible && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1E40AF]">
                              CCP Wage Support
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#434751] mt-1">
                          <span className="font-bold text-[#1a1b21]">{job.company}</span>
                          <span className="text-[#c3c6d3]">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#737783]" />
                            {job.district || job.location}
                          </span>
                          <span className="text-[#c3c6d3]">•</span>
                          <span className="font-bold text-[#0F766E]">
                            {job.salaryCurrency}{job.salaryMin.toLocaleString()} – {job.salaryCurrency}{job.salaryMax.toLocaleString()} / month
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Compatibility Index badge */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0">
                      <span className="text-2xl font-black text-[#003f8b]">
                        {job.compatibilityPercent}%
                      </span>
                      <span className="text-[11px] font-semibold text-[#737783]">
                        Compatibility Index
                      </span>
                    </div>
                  </div>

                  {/* Skills match bar */}
                  <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-[#1a1b21] block">
                        Verified Skills Matched ({job.skillsMatchCount} of {job.totalSkillsCount}):
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {job.requiredSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 bg-white border border-[#c3c6d3] rounded text-[11px] font-semibold text-[#003f8b] flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-[#0F766E]" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bridging gap callout if any */}
                    {job.skillGaps && job.skillGaps.length > 0 && (
                      <div className="md:max-w-xs p-2 bg-[#FFFBEB] rounded-lg border border-[#fde68a] text-[11px] text-[#B45309]">
                        <span className="font-bold block flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Bridging Skill: {job.skillGaps[0].skill}
                        </span>
                        <p className="mt-0.5 text-[#434751] line-clamp-1">
                          {job.skillGaps[0].recommendedCourse} ({job.skillGaps[0].subsidy})
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onSelectJob(job.id)}
                      className="text-xs font-bold text-[#003f8b] hover:underline flex items-center gap-1"
                    >
                      <span>View Fit Breakdown & Job Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onApplyJob(job.id)}
                      disabled={hasApplied}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                        hasApplied
                          ? 'bg-[#10b981] text-white cursor-default'
                          : 'bg-[#003f8b] hover:bg-[#2557a7] text-white'
                      }`}
                    >
                      {hasApplied ? 'Applied' : 'Instant Apply with Profile'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB CONTENT: Skill Gap & Micro-Courses */}
        {activeSubTab === 'gaps' && (
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] space-y-4">
              <h2 className="text-lg font-bold text-[#1a1b21]">
                Candidate Competency Matrix & Gap Identification
              </h2>
              <p className="text-xs text-[#434751]">
                Evaluated against the Singapore Skills Framework for Infocomm Technology and Financial Services.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Core Strengths */}
                <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#ccfbf1] space-y-3">
                  <h3 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Candidate Strengths
                  </h3>
                  <div className="space-y-2 text-xs">
                    {candidate.skills.map((skill) => (
                      <div key={skill} className="flex items-center justify-between bg-white p-2 rounded-lg border border-[#ccfbf1]">
                        <span className="font-semibold text-[#1a1b21]">{skill}</span>
                        <span className="text-[10px] font-bold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded">
                          Validated 95%+
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Identified Gaps for Next Salary Band */}
                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#fde68a] space-y-3">
                  <h3 className="text-xs font-bold text-[#B45309] uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Identified Gaps for S$10,000+ Band
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-[#fde68a] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1a1b21]">WCAG 2.1 AAA Digital Accessibility</span>
                        <span className="text-[10px] font-bold text-[#ba1a1a] bg-[#ba1a1a]/10 px-1.5 py-0.5 rounded">High Priority</span>
                      </div>
                      <p className="text-[11px] text-[#737783]">Required for GovTech & public sector lead positions.</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-[#fde68a] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1a1b21]">LLM Prompt & GenAI Architecture</span>
                        <span className="text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] px-1.5 py-0.5 rounded">Unlocks +34% Pay</span>
                      </div>
                      <p className="text-[11px] text-[#737783]">Bridging required for Cognitive Cloud Systems & Grab AI teams.</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-[#fde68a] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1a1b21]">MAS Technology Risk Management (TRM)</span>
                        <span className="text-[10px] font-bold text-[#003f8b] bg-[#EFF6FF] px-1.5 py-0.5 rounded">Fintech Standard</span>
                      </div>
                      <p className="text-[11px] text-[#737783]">Pre-requisite for executive banking roles at Straits Horizon & DBS.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: Career Conversion Programmes (CCP) */}
        {activeSubTab === 'ccp' && (
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1a1b21]">
                    Workforce Singapore (WSG) Career Conversion Programmes
                  </h2>
                  <p className="text-xs text-[#434751]">
                    Programmes aimed at reskilling mid-career professionals and graduates into growth sectors with salary support.
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#F0FDFA] text-[#0F766E] px-3 py-1 rounded-full border border-[#ccfbf1]">
                  Up to 90% Salary Support
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#f9f9ff] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#003f8b] bg-[#EFF6FF] px-2 py-0.5 rounded">
                    Infocomm Media (ICT) Track
                  </span>
                  <h3 className="text-sm font-bold text-[#1a1b21]">
                    CCP for Cloud Solutions & Generative AI Consultants
                  </h3>
                  <p className="text-xs text-[#737783] leading-relaxed">
                    6-month on-the-job training with accredited technology employers including SingaApex and Cognitive Cloud.
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0F766E]">
                    Monthly training allowance: S$5,500 – S$7,500
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#f9f9ff] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded">
                    Financial Services Track
                  </span>
                  <h3 className="text-sm font-bold text-[#1a1b21]">
                    CCP for Fintech Operations & Digital Wealth Orchestration
                  </h3>
                  <p className="text-xs text-[#737783] leading-relaxed">
                    Fast-track pathway for candidates with analytics background entering MAS-licensed digital asset and payment providers.
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0F766E]">
                    Monthly training allowance: S$6,500 – S$8,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UPSKILL TO UNLOCK 24 MORE ROLES WIDGET */}
        <section className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-[#003f8b]" />
                <h2 className="text-lg font-bold text-[#1a1b21]">
                  Upskill to Unlock 24 More High-Paying Roles
                </h2>
              </div>
              <p className="text-xs text-[#434751] mt-0.5">
                Eligible for SkillsFuture Credit + up to 90% SSG Course Fee Subsidies.
              </p>
            </div>
            <span className="text-xs font-bold text-[#003f8b] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#adc6ff]">
              Your SkillsFuture Balance: S$1,000
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl border border-[#E5E7EB] bg-[#f9f9ff] flex flex-col justify-between space-y-3 hover:border-[#003f8b] transition-all"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#ccfbf1]">
                    {course.badge || `${course.ssgFundingPercent}% SSG Funded`}
                  </span>
                  <h3 className="text-sm font-bold text-[#1a1b21] leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-[#737783]">
                    {course.institution} • {course.duration}
                  </p>
                  <p className="text-xs text-[#434751] mt-1 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-[#737783] line-through block">
                        S${course.originalFee.toLocaleString()}
                      </span>
                      <span className="text-base font-black text-[#0F766E]">
                        S${course.netPayableFee} Net
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#003f8b]">
                      {course.salaryPotential}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-2 bg-[#003f8b] hover:bg-[#2557a7] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Claim with SkillsFuture</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CANDIDATE COACHING & AI MOCK INTERVIEW PREP CARD (from Image 7.png) */}
        <section className="p-6 bg-gradient-to-r from-[#003f8b] to-[#2557a7] rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#adc6ff]" />
              Interactive AI Simulator
            </div>
            <h2 className="text-xl font-black tracking-tight">
              Preparing for your next interview: AI Mock Interview for Product & Tech roles
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              Practice real Singapore hiring panel questions for GovTech, Grab, and DBS. Receive real-time STAR framework scoring, technical accuracy reviews, and speech feedback.
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs">
              <span className="font-semibold text-[#adc6ff]">
                Session Readiness Score: <strong className="text-white font-bold">82%</strong>
              </span>
              <span className="text-white/60">•</span>
              <span className="text-[#ccfbf1] font-semibold">
                +14% higher acceptance rate vs peers
              </span>
            </div>
          </div>

          <button
            onClick={onStartMockInterview}
            className="px-6 py-3.5 bg-white text-[#003f8b] hover:bg-[#EFF6FF] rounded-xl font-bold text-sm shrink-0 flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
            id="start-ai-interview-prep-btn"
          >
            <Play className="w-4 h-4 fill-[#003f8b]" />
            <span>Start AI Mock Interview (15 min)</span>
          </button>
        </section>
      </div>
    </div>
  );
};
