import React, { useState } from 'react';
import { Application, CandidateProfile } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Eye, 
  ExternalLink,
  ChevronRight,
  Video,
  FileText,
  Briefcase,
  UserCheck,
  TrendingUp
} from 'lucide-react';

interface MyApplicationsViewProps {
  candidate: CandidateProfile;
  applications: Application[];
  onOpenMockInterview: () => void;
  onOpenAdvisoryChat: () => void;
  onViewJob: (jobId: string) => void;
}

export const MyApplicationsView: React.FC<MyApplicationsViewProps> = ({
  candidate,
  applications,
  onOpenMockInterview,
  onOpenAdvisoryChat,
  onViewJob,
}) => {
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'applied' | 'review' | 'interviews' | 'offer'>('all');

  const filteredApps = applications.filter((app) => {
    if (activeStatusFilter === 'all') return true;
    if (activeStatusFilter === 'applied') return app.status === 'submitted';
    if (activeStatusFilter === 'review') return app.status === 'under_review';
    if (activeStatusFilter === 'interviews') return app.status === 'interview_scheduled';
    if (activeStatusFilter === 'offer') return app.status === 'offer';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f9f9ff] py-6 text-left">
      <div className="max-w-[75rem] mx-auto px-4 lg:px-6 space-y-6">
        {/* Top Candidate Status Banner */}
        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0F766E] border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-[#1a1b21]">
                  {candidate.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDFA] text-[#0F766E] border border-[#ccfbf1] flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs text-[#434751] font-medium">
                {candidate.headline} • Singapore Citizen
              </p>
              <p className="text-[11px] text-[#737783]">
                CV: {candidate.currentCvName} • Last refreshed {candidate.cvLastUpdated}
              </p>
            </div>
          </div>

          {/* Metric Counters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="px-4 py-2 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] text-center min-w-[5rem]">
              <span className="text-xl font-black text-[#003f8b]">4</span>
              <span className="text-[10px] uppercase font-bold text-[#737783] block">Submitted</span>
            </div>
            <div className="px-4 py-2 bg-[#EFF6FF] rounded-xl border border-[#adc6ff] text-center min-w-[5rem]">
              <span className="text-xl font-black text-[#1E40AF]">2</span>
              <span className="text-[10px] uppercase font-bold text-[#1E40AF] block">Shortlisted</span>
            </div>
            <div className="px-4 py-2 bg-[#FFFBEB] rounded-xl border border-[#fde68a] text-center min-w-[5rem]">
              <span className="text-xl font-black text-[#B45309]">1</span>
              <span className="text-[10px] uppercase font-bold text-[#B45309] block">Interview</span>
            </div>
            <div className="px-4 py-2 bg-[#F0FDFA] rounded-xl border border-[#ccfbf1] text-center min-w-[5rem]">
              <span className="text-xl font-black text-[#0F766E]">1</span>
              <span className="text-[10px] uppercase font-bold text-[#0F766E] block">Offer</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Applications Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2 text-xs font-bold overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeStatusFilter === 'all'
                    ? 'bg-[#003f8b] text-white'
                    : 'text-[#434751] hover:bg-[#f3f3fa]'
                }`}
              >
                All Applications ({applications.length})
              </button>
              <button
                onClick={() => setActiveStatusFilter('interviews')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeStatusFilter === 'interviews'
                    ? 'bg-[#003f8b] text-white'
                    : 'text-[#434751] hover:bg-[#f3f3fa]'
                }`}
              >
                Interviews Scheduled (1)
              </button>
              <button
                onClick={() => setActiveStatusFilter('review')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeStatusFilter === 'review'
                    ? 'bg-[#003f8b] text-white'
                    : 'text-[#434751] hover:bg-[#f3f3fa]'
                }`}
              >
                Under Review (2)
              </button>
              <button
                onClick={() => setActiveStatusFilter('applied')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeStatusFilter === 'applied'
                    ? 'bg-[#003f8b] text-white'
                    : 'text-[#434751] hover:bg-[#f3f3fa]'
                }`}
              >
                Applied (4)
              </button>
              <button
                onClick={() => setActiveStatusFilter('offer')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeStatusFilter === 'offer'
                    ? 'bg-[#003f8b] text-white'
                    : 'text-[#434751] hover:bg-[#f3f3fa]'
                }`}
              >
                Offers (1)
              </button>
            </div>

            {/* Application Cards Feed */}
            <div className="space-y-4">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4 hover:border-[#adc6ff] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            app.status === 'interview_scheduled'
                              ? 'bg-[#FFFBEB] text-[#B45309] border border-[#fde68a]'
                              : app.status === 'offer'
                              ? 'bg-[#F0FDFA] text-[#0F766E] border border-[#ccfbf1]'
                              : app.status === 'under_review'
                              ? 'bg-[#EFF6FF] text-[#1E40AF] border border-[#adc6ff]'
                              : 'bg-[#f3f3fa] text-[#434751]'
                          }`}
                        >
                          {app.statusLabel}
                        </span>
                        <span className="text-[11px] text-[#737783]">{app.appliedDate}</span>
                      </div>

                      <h2 className="text-lg font-bold text-[#1a1b21] mt-1">
                        {app.jobTitle}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#434751] mt-0.5">
                        <span className="font-bold text-[#1a1b21]">{app.company}</span>
                        <span className="text-[#c3c6d3]">•</span>
                        <span>{app.location}</span>
                        <span className="text-[#c3c6d3]">•</span>
                        <span className="font-bold text-[#0F766E]">{app.salaryText}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#003f8b] font-bold text-xs">
                        {app.skillFitPercent}% Fit
                      </span>
                    </div>
                  </div>

                  {/* NEXT STEP ALERT BOX (e.g. for interview or offer) */}
                  {app.nextStep && (
                    <div className="p-3.5 bg-[#FFFBEB] rounded-xl border border-[#fde68a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-[#B45309] flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {app.nextStep.title}
                        </span>
                        <p className="text-xs text-[#1a1b21] font-semibold">
                          {app.nextStep.datetime} ({app.nextStep.duration})
                        </p>
                        <p className="text-[11px] text-[#737783] flex items-center gap-1">
                          <Video className="w-3 h-3 text-[#003f8b]" />
                          {app.nextStep.linkInfo}
                        </p>
                      </div>

                      <button
                        onClick={onOpenMockInterview}
                        className="px-4 py-2 bg-[#003f8b] hover:bg-[#2557a7] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Practice with AI Simulator</span>
                      </button>
                    </div>
                  )}

                  {/* RECRUITER MILESTONE / TRANSPARENCY TIMELINE */}
                  {app.recruiterMilestone && (
                    <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#434751] flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-[#003f8b]" />
                          Recruiter Activity Tracker
                        </span>
                        <span className="text-[11px] text-[#0F766E] font-semibold">
                          Response expected: {app.recruiterMilestone.expectedResponse}
                        </span>
                      </div>
                      <p className="text-[#1a1b21] font-medium">
                        CV viewed {app.recruiterMilestone.viewsCount} times • {app.recruiterMilestone.shortlistedStage}
                      </p>
                    </div>
                  )}

                  {/* PROGRESS STEPPER */}
                  <div className="pt-2 border-t border-[#f3f3fa] space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#737783]">
                      <span>Stage: {app.currentStepName}</span>
                      <span>Step {app.currentStepIndex} of {app.totalSteps}</span>
                    </div>
                    <div className="w-full bg-[#f3f3fa] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#003f8b] h-full rounded-full transition-all duration-500"
                        style={{ width: `${(app.currentStepIndex / app.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Card footer CTA */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[#737783]">
                      Avg review turnaround: {app.avgReviewDays} days
                    </span>
                    <button
                      onClick={() => onViewJob(app.jobId)}
                      className="font-bold text-[#003f8b] hover:underline flex items-center gap-1"
                    >
                      <span>View Job Posting</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Candidate Protection Ribbon */}
            <div className="p-4 bg-[#F0FDFA] rounded-xl border border-[#ccfbf1] flex items-center gap-3 text-xs text-[#0F766E]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>
                All applications through TalentTrust are covered under the Singapore Fair Consideration Framework. Employers agree to minimum response time standards and wage transparency.
              </span>
            </div>
          </div>

          {/* Right Sidebar Tools & Advisory (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Interview Readiness Card */}
            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
              <h2 className="text-sm font-bold text-[#1a1b21] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#003f8b]" />
                Interview Readiness Toolkit
              </h2>

              <div className="space-y-2.5">
                <button
                  onClick={onOpenMockInterview}
                  className="w-full p-3 bg-[#f9f9ff] hover:bg-[#EFF6FF] rounded-xl border border-[#E5E7EB] hover:border-[#adc6ff] flex items-center justify-between text-left transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#003f8b] block">
                      AI Mock Interview Simulator
                    </span>
                    <span className="text-[11px] text-[#737783]">
                      Practice GovTech panel & tech questions
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#737783]" />
                </button>

                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#1a1b21]">
                    <span>Salary Benchmark Guide</span>
                    <span className="text-[#0F766E]">S$6.5k – S$9.2k</span>
                  </div>
                  <p className="text-[11px] text-[#737783]">
                    Verified median for Senior UX Designers with 5+ yrs in Singapore CBD.
                  </p>
                </div>

                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#1a1b21]">
                    <span>Recruiter Transparency Tracker</span>
                    <span className="text-[#003f8b]">2.1d avg</span>
                  </div>
                  <p className="text-[11px] text-[#737783]">
                    Fastest responses observed from GovTech & Straits Horizon this month.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Career Advisory Widget with Coach Rachel Lee */}
            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-BLbG9XJ7Bti2VOSY_AD4Mrms0dcDukk_ZCKvTV9ze8jLF9KnCdlyzZmfRep6koHE8l5-HxeShp1cz9xvfSlvX0n8O5OK-MJ5QLEQPkFkzrCFjeCqWFgBAb5M3j0VOeZjWqn4YffqedN-L-7HAVRauYwlV0eMHWiKS5K3bT3zu01iY-QoHfVnq_aUdIeLEemSHr4h3k8C-c10xK4CiCDzV9laAj9yoHPiIZ9rddf2OY0Quousc8Sr"
                    alt="Rachel Lee"
                    className="w-12 h-12 rounded-full object-cover border border-[#c3c6d3]"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1a1b21]">
                    Rachel Lee
                  </h3>
                  <p className="text-[11px] text-[#434751]">
                    Senior Workforce Dev Coach • Online Now
                  </p>
                  <span className="text-[10px] text-[#0F766E] font-semibold">
                    Assigned to your Tech & UX track
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#434751] leading-relaxed">
                "Hi May! GovTech has scheduled your technical panel for Thursday. Let me know if you need feedback on your design systems case study deck."
              </p>

              <button
                onClick={onOpenAdvisoryChat}
                className="w-full py-2.5 bg-[#003f8b] hover:bg-[#2557a7] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                id="chat-career-coach-btn"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Coach Rachel</span>
              </button>
            </div>

            {/* Upcoming Live Clinic Banner */}
            <div className="p-4 bg-[#EFF6FF] rounded-2xl border border-[#adc6ff] space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#1E40AF]">
                Upcoming Live Clinic
              </span>
              <h3 className="font-bold text-[#003f8b] text-sm">
                Tech Case Studies: Acing Panel Presentations
              </h3>
              <p className="text-[#434751] text-[11px]">
                Tomorrow, 7:30 PM SGT • Live Q&A with Lead Principal Designers.
              </p>
              <button className="text-xs font-bold text-[#003f8b] hover:underline flex items-center gap-1 pt-1">
                <span>Reserve Free Seat (SkillsFuture Partner)</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
