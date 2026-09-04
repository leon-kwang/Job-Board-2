import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, Bell, Check, X, Sparkles, ChevronDown } from 'lucide-react';
import { FILTER_OPTIONS } from '../data/mockData';

interface SearchFilterBarProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  location: string;
  onLocationChange: (val: string) => void;
  selectedIndustry: string;
  onIndustryChange: (val: string) => void;
  selectedJobFamily: string;
  onJobFamilyChange: (val: string) => void;
  selectedExperience: string;
  onExperienceChange: (val: string) => void;
  selectedWorkArrangement: string;
  onWorkArrangementChange: (val: string) => void;
  selectedMinSalary: number;
  onMinSalaryChange: (val: number) => void;
  onlyFreshGrads: boolean;
  onFreshGradsToggle: () => void;
  onlyVerified: boolean;
  onVerifiedToggle: () => void;
  onSaveSearchAlert: () => void;
  isSearchSaved: boolean;
  totalResultsCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  selectedIndustry,
  onIndustryChange,
  selectedJobFamily,
  onJobFamilyChange,
  selectedExperience,
  onExperienceChange,
  selectedWorkArrangement,
  onWorkArrangementChange,
  selectedMinSalary,
  onMinSalaryChange,
  onlyFreshGrads,
  onFreshGradsToggle,
  onlyVerified,
  onVerifiedToggle,
  onSaveSearchAlert,
  isSearchSaved,
  totalResultsCount,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const popularSearches = [
    'Senior UX/Product Designer',
    'Fintech Product Operations',
    'Associate Software Engineer',
    'Enterprise AI Consultant',
    'Digital Marketing'
  ];

  const hasActiveFilters = 
    selectedIndustry !== 'All Industries' ||
    selectedJobFamily !== 'All Families' ||
    selectedExperience !== 'Any Level' ||
    selectedWorkArrangement !== 'Any' ||
    selectedMinSalary > 0 ||
    onlyFreshGrads ||
    onlyVerified;

  const resetFilters = () => {
    onIndustryChange('All Industries');
    onJobFamilyChange('All Families');
    onExperienceChange('Any Level');
    onWorkArrangementChange('Any');
    onMinSalaryChange(0);
    if (onlyFreshGrads) onFreshGradsToggle();
    if (onlyVerified) onVerifiedToggle();
  };

  return (
    <div className="bg-[#ffffff] border-b border-[#E5E7EB] shadow-xs pt-4 pb-4">
      <div className="max-w-[75rem] mx-auto px-4 lg:px-6 space-y-3">
        {/* Main Dual Search Input */}
        <div className="flex flex-col md:flex-row items-stretch gap-2 bg-[#f3f3fa] p-1.5 rounded-xl border border-[#c3c6d3]">
          {/* WHAT input */}
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-white rounded-lg border border-[#E5E7EB] focus-within:border-[#003f8b] focus-within:ring-1 focus-within:ring-[#003f8b] transition-all">
            <Search className="w-5 h-5 text-[#737783] shrink-0" />
            <div className="flex-1 flex flex-col">
              <label htmlFor="search-what" className="text-[10px] font-bold uppercase tracking-wider text-[#737783]">
                What
              </label>
              <input
                id="search-what"
                type="text"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="w-full text-sm font-medium text-[#1a1b21] placeholder-[#737783] bg-transparent focus:outline-none"
              />
            </div>
            {keyword && (
              <button 
                onClick={() => onKeywordChange('')}
                className="text-[#737783] hover:text-[#1a1b21] p-1"
                aria-label="Clear keyword"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* WHERE input */}
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-white rounded-lg border border-[#E5E7EB] focus-within:border-[#003f8b] focus-within:ring-1 focus-within:ring-[#003f8b] transition-all">
            <MapPin className="w-5 h-5 text-[#737783] shrink-0" />
            <div className="flex-1 flex flex-col">
              <label htmlFor="search-where" className="text-[10px] font-bold uppercase tracking-wider text-[#737783]">
                Where
              </label>
              <input
                id="search-where"
                type="text"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="City, district, or remote (e.g. Singapore, CBD)"
                className="w-full text-sm font-medium text-[#1a1b21] placeholder-[#737783] bg-transparent focus:outline-none"
              />
            </div>
            {location && (
              <button 
                onClick={() => onLocationChange('')}
                className="text-[#737783] hover:text-[#1a1b21] p-1"
                aria-label="Clear location"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search CTA and Advanced toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                showAdvancedFilters || hasActiveFilters
                  ? 'bg-[#EFF6FF] border-[#003f8b] text-[#003f8b]'
                  : 'bg-white border-[#c3c6d3] text-[#434751] hover:bg-[#f3f3fa]'
              }`}
              id="toggle-filters-btn"
              title="More search filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#003f8b]"></span>
              )}
            </button>

            <button
              className="flex-1 md:flex-initial px-6 py-3 bg-[#003f8b] hover:bg-[#2557a7] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
              id="find-jobs-search-btn"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Popular searches suggestions */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-[#737783] no-scrollbar">
          <span className="font-semibold text-[#434751] shrink-0">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => onKeywordChange(term)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                keyword === term
                  ? 'bg-[#EFF6FF] text-[#003f8b] border-[#adc6ff]'
                  : 'bg-[#f3f3fa] text-[#434751] border-transparent hover:border-[#c3c6d3] hover:bg-[#e8e7ef]'
              }`}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Quick Filter Pills Row & Save Alert Feature */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#f3f3fa]">
          {/* Quick pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Remote / Hybrid Toggle */}
            <select
              value={selectedWorkArrangement}
              onChange={(e) => onWorkArrangementChange(e.target.value)}
              className="px-3 py-1.5 bg-white border border-[#c3c6d3] rounded-full text-xs font-semibold text-[#434751] hover:border-[#003f8b] focus:outline-none cursor-pointer"
              id="filter-work-arrangement"
            >
              <option value="Any">Work Arrangement</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
            </select>

            {/* Min Salary Dropdown */}
            <select
              value={selectedMinSalary}
              onChange={(e) => onMinSalaryChange(Number(e.target.value))}
              className={`px-3 py-1.5 border rounded-full text-xs font-semibold focus:outline-none cursor-pointer ${
                selectedMinSalary > 0
                  ? 'bg-[#F0FDFA] border-[#0F766E] text-[#0F766E]'
                  : 'bg-white border-[#c3c6d3] text-[#434751] hover:border-[#003f8b]'
              }`}
              id="filter-salary"
            >
              {FILTER_OPTIONS.salaryRanges.map((range) => (
                <option key={range.label} value={range.min}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Fresh Grads Filter Toggle */}
            <button
              onClick={onFreshGradsToggle}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1 ${
                onlyFreshGrads
                  ? 'bg-[#d8e2ff] border-[#003f8b] text-[#001a41]'
                  : 'bg-white border-[#c3c6d3] text-[#434751] hover:border-[#003f8b]'
              }`}
              id="filter-fresh-grads"
            >
              {onlyFreshGrads && <Check className="w-3 h-3 text-[#003f8b]" />}
              Fresh Grads (Diploma & Degree)
            </button>

            {/* Verified Employer Toggle */}
            <button
              onClick={onVerifiedToggle}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1 ${
                onlyVerified
                  ? 'bg-[#F0FDFA] border-[#0F766E] text-[#0F766E]'
                  : 'bg-white border-[#c3c6d3] text-[#434751] hover:border-[#003f8b]'
              }`}
              id="filter-verified"
            >
              {onlyVerified && <Check className="w-3 h-3 text-[#0F766E]" />}
              Verified Employer ✓
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#ba1a1a] hover:underline font-semibold ml-1"
                id="reset-filters-btn"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Saved Search Notification Feature - Explicitly requested! */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSaveSearchAlert}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                isSearchSaved
                  ? 'bg-[#F0FDFA] text-[#0F766E] border-[#0F766E]'
                  : 'bg-[#EFF6FF] text-[#003f8b] border-[#adc6ff] hover:bg-[#d8e2ff]'
              }`}
              title="Save this search to get notified whenever new matching jobs are posted"
              id="save-search-alert-btn"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{isSearchSaved ? 'Search Alert Active' : 'Save Search & Alert Me'}</span>
            </button>
          </div>
        </div>

        {/* Expanded Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#f3f3fa] rounded-xl border border-[#c3c6d3] text-xs">
            {/* Job Industries */}
            <div>
              <label className="font-bold text-[#434751] block mb-1">Job Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => onIndustryChange(e.target.value)}
                className="w-full p-2 bg-white border border-[#c3c6d3] rounded-lg text-xs font-medium text-[#1a1b21]"
              >
                {FILTER_OPTIONS.industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Families */}
            <div>
              <label className="font-bold text-[#434751] block mb-1">Job Family</label>
              <select
                value={selectedJobFamily}
                onChange={(e) => onJobFamilyChange(e.target.value)}
                className="w-full p-2 bg-white border border-[#c3c6d3] rounded-lg text-xs font-medium text-[#1a1b21]"
              >
                {FILTER_OPTIONS.jobFamilies.map((fam) => (
                  <option key={fam} value={fam}>
                    {fam}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="font-bold text-[#434751] block mb-1">Experience Level</label>
              <select
                value={selectedExperience}
                onChange={(e) => onExperienceChange(e.target.value)}
                className="w-full p-2 bg-white border border-[#c3c6d3] rounded-lg text-xs font-medium text-[#1a1b21]"
              >
                {FILTER_OPTIONS.experienceLevels.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
