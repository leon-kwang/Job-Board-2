import React from 'react';
import { NavigationTab, CandidateProfile, SavedSearch } from '../types';
import { 
  Search, 
  Bookmark, 
  Bell, 
  ChevronDown, 
  Upload, 
  Sparkles,
  Briefcase,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  candidate: CandidateProfile;
  savedJobsCount: number;
  savedSearches: SavedSearch[];
  onOpenCvModal: () => void;
  onOpenSavedSearchesModal: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  candidate,
  savedJobsCount,
  savedSearches,
  onOpenCvModal,
  onOpenSavedSearchesModal,
  onOpenNotifications,
  unreadNotificationsCount
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#ffffff] border-b border-[#E5E7EB] shadow-xs">
      <div className="h-16 max-w-[75rem] mx-auto px-4 lg:px-6 flex items-center justify-between gap-3">
        {/* Brand and primary navigation */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onSelectTab('find-jobs')}
            className="flex items-center gap-2 text-left focus:outline-none focus:ring-2 focus:ring-[#003f8b] rounded-lg p-1 transition-transform active:scale-95"
            id="brand-logo-btn"
          >
            {/* SVG Logo matching TalentTrust brand */}
            <div className="h-9 w-9 rounded-lg bg-[#003f8b] flex items-center justify-center text-white font-bold relative shadow-xs">
              <span className="text-lg tracking-tight font-extrabold">TT</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#10b981] rounded-full ring-2 ring-white"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#003f8b] tracking-tight leading-tight">
                Talent<span className="text-[#2557a7]">Trust</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#737783] -mt-0.5">
                Verified Careers
              </span>
            </div>
          </button>

          <nav className="hidden xl:flex items-center gap-1 h-16" aria-label="Main Navigation">
            <button
              onClick={() => onSelectTab('find-jobs')}
              className={`h-full flex items-center px-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'find-jobs'
                  ? 'text-[#003f8b] border-b-2 border-[#003f8b]'
                  : 'text-[#434751] hover:text-[#1a1b21]'
              }`}
              id="nav-find-jobs"
            >
              Find Jobs
            </button>
            <button
              onClick={() => onSelectTab('skill-matcher')}
              className={`h-full flex items-center px-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'skill-matcher'
                  ? 'text-[#003f8b] border-b-2 border-[#003f8b]'
                  : 'text-[#434751] hover:text-[#1a1b21]'
              }`}
              id="nav-skill-matcher"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#2557a7]" />
              Skill Matcher
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-[#EFF6FF] text-[#1E40AF] rounded-full font-bold">
                AI Engine
              </span>
            </button>
            <button
              onClick={() => onSelectTab('career-conversion')}
              className={`h-full flex items-center px-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'career-conversion'
                  ? 'text-[#003f8b] border-b-2 border-[#003f8b]'
                  : 'text-[#434751] hover:text-[#1a1b21]'
              }`}
              id="nav-career-conversion"
            >
              Career Conversion & Training
            </button>
            <button
              onClick={() => onSelectTab('my-applications')}
              className={`h-full flex items-center px-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'my-applications'
                  ? 'text-[#003f8b] border-b-2 border-[#003f8b]'
                  : 'text-[#434751] hover:text-[#1a1b21]'
              }`}
              id="nav-my-applications"
            >
              My Applications
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-[#d8e2ff] text-[#001a41] rounded-full font-bold">
                4 Active
              </span>
            </button>
            <button
              onClick={() => onSelectTab('talk-to-us')}
              className={`h-full flex items-center px-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'talk-to-us'
                  ? 'text-[#003f8b] border-b-2 border-[#003f8b]'
                  : 'text-[#434751] hover:text-[#1a1b21]'
              }`}
              id="nav-talk-to-us"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1 text-[#2557a7]" />
              Talk to Us
            </button>
          </nav>
        </div>

        {/* Action icons and candidate menu */}
        <div className="flex items-center gap-2">
          {/* Quick upload CV / LinkedIn trigger button */}
          <button
            onClick={onOpenCvModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f3f3fa] hover:bg-[#e8e7ef] text-[#003f8b] text-xs font-semibold border border-[#c3c6d3] transition-colors"
            title="Upload CV from local/cloud or sync LinkedIn URL"
            id="nav-upload-cv-btn"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Update CV / LinkedIn</span>
          </button>

          {/* Saved Searches & Alerts */}
          <button
            onClick={onOpenSavedSearchesModal}
            className="p-2 text-[#434751] hover:text-[#1a1b21] hover:bg-[#ededf5] rounded-lg transition-colors relative flex items-center justify-center"
            title="Saved Searches & Alerts"
            id="nav-saved-searches-btn"
            aria-label="Saved Searches"
          >
            <Bookmark className="w-5 h-5" />
            {savedJobsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#0F766E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedJobsCount}
              </span>
            )}
          </button>

          {/* Notifications Alert with badge */}
          <button
            onClick={onOpenNotifications}
            className="p-2 text-[#434751] hover:text-[#1a1b21] hover:bg-[#ededf5] rounded-lg transition-colors relative flex items-center justify-center"
            title="New Job Openings & Application Alerts"
            id="nav-notifications-btn"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          <div className="h-6 w-px bg-[#E5E7EB] mx-1 hidden sm:block"></div>

          {/* Candidate Profile Widget */}
          <button
            onClick={onOpenCvModal}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-lg hover:bg-[#f3f3fa] focus:outline-none focus:ring-2 focus:ring-[#003f8b] transition-colors"
            title="View candidate profile and verified credentials"
            id="nav-profile-menu-btn"
          >
            <div className="relative">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-8 h-8 rounded-full object-cover border border-[#c3c6d3]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#0F766E] border-2 border-white rounded-full"></span>
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-[#1a1b21] leading-tight">
                {candidate.name}
              </span>
              <span className="text-[10px] text-[#0F766E] font-semibold leading-tight flex items-center gap-0.5">
                Verified ✓
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#737783] hidden md:block" />
          </button>
        </div>
      </div>

      {/* Mobile nav bar for small screens */}
      <div className="xl:hidden flex items-center justify-around border-t border-[#E5E7EB] bg-[#ffffff] py-2 px-3 text-xs">
        <button
          onClick={() => onSelectTab('find-jobs')}
          className={`px-2.5 py-1.5 rounded-md font-semibold flex items-center gap-1 ${
            activeTab === 'find-jobs' ? 'bg-[#EFF6FF] text-[#003f8b]' : 'text-[#434751]'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          Find Jobs
        </button>
        <button
          onClick={() => onSelectTab('skill-matcher')}
          className={`px-2.5 py-1.5 rounded-md font-semibold flex items-center gap-1 ${
            activeTab === 'skill-matcher' ? 'bg-[#EFF6FF] text-[#003f8b]' : 'text-[#434751]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Skill Matcher
        </button>
        <button
          onClick={() => onSelectTab('my-applications')}
          className={`px-2.5 py-1.5 rounded-md font-semibold flex items-center gap-1 ${
            activeTab === 'my-applications' ? 'bg-[#EFF6FF] text-[#003f8b]' : 'text-[#434751]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Applications
        </button>
        <button
          onClick={() => onSelectTab('talk-to-us')}
          className={`px-2.5 py-1.5 rounded-md font-semibold flex items-center gap-1 ${
            activeTab === 'talk-to-us' ? 'bg-[#EFF6FF] text-[#003f8b]' : 'text-[#434751]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Talk to Us
        </button>
        <button
          onClick={onOpenCvModal}
          className="px-2.5 py-1.5 rounded-md font-semibold text-[#003f8b] bg-[#f3f3fa] flex items-center gap-1"
        >
          <Upload className="w-3.5 h-3.5" />
          CV
        </button>
      </div>
    </header>
  );
};
