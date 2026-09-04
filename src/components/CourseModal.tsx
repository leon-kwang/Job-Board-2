import React, { useState } from 'react';
import { Course } from '../types';
import { X, School, Check, CheckCircle2, Award, ExternalLink, Calendar, Clock, DollarSign } from 'lucide-react';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const [enrolled, setEnrolled] = useState(false);

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden text-left my-8">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#003f8b] text-white rounded-lg">
              <School className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#0F766E] uppercase tracking-wider bg-[#F0FDFA] px-2 py-0.5 rounded">
                SkillsFuture Accredited Training
              </span>
              <h2 className="text-base font-bold text-[#1a1b21] mt-0.5">
                {course.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#737783] hover:text-[#1a1b21] hover:bg-[#ededf5] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-[#EFF6FF] rounded-xl border border-[#adc6ff] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#003f8b]">{course.institution}</span>
              <span className="font-bold text-[#1E40AF] bg-white px-2 py-0.5 rounded border border-[#adc6ff]">
                {course.ssgFundingPercent}% SSG Co-Funded
              </span>
            </div>
            <p className="text-xs text-[#434751] leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Fee Breakdown */}
          <div className="p-4 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] space-y-2 text-xs">
            <h3 className="font-bold text-[#1a1b21]">Fee & SkillsFuture Credit Subsidy</h3>
            <div className="flex justify-between text-[#737783]">
              <span>Full Course Fee (before subsidy):</span>
              <span className="line-through">S${course.originalFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#0F766E] font-semibold">
              <span>Workforce Development Subsidy ({course.ssgFundingPercent}%):</span>
              <span>-S${(course.originalFee - course.netPayableFee).toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-[#E5E7EB] flex justify-between font-bold text-sm text-[#1a1b21]">
              <span>Net Payable by Singapore Citizen:</span>
              <span className="text-[#003f8b] text-base">S${course.netPayableFee}</span>
            </div>
            <p className="text-[11px] text-[#0F766E]">
              ✓ Fully offsettable with your available SkillsFuture Credit (Balance: S$1,000)
            </p>
          </div>

          {/* Curriculum highlights */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-[#1a1b21]">Key Modules Covered</h3>
            <ul className="space-y-1.5 text-[#434751]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Regulatory compliance and industry standards framework</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Hands-on lab simulations with production-grade tooling</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Direct industry recognition and digital credential badge</span>
              </li>
            </ul>
          </div>

          {enrolled && (
            <div className="p-3 bg-[#F0FDFA] border border-[#0F766E]/30 rounded-xl flex items-center gap-2 text-xs text-[#0F766E] font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Enrollment request submitted! Your SkillsFuture claim has been pre-authorized.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#f9f9ff] flex items-center justify-between">
          <div className="text-xs text-[#737783]">
            Estimated salary impact: <strong className="text-[#0F766E]">{course.salaryPotential}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#c3c6d3] text-xs font-bold rounded-xl hover:bg-[#f3f3fa]"
            >
              Cancel
            </button>
            <button
              onClick={() => setEnrolled(true)}
              disabled={enrolled}
              className="px-5 py-2 bg-[#003f8b] hover:bg-[#2557a7] text-white text-xs font-bold rounded-xl transition-colors"
            >
              {enrolled ? 'Enrolled' : 'Claim with SkillsFuture'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
