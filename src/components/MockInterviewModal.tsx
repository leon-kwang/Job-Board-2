import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Loader2, 
  MessageSquare, 
  Award, 
  RotateCcw,
  ChevronRight
} from 'lucide-react';

interface MockInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

const SAMPLE_QUESTIONS = [
  {
    role: 'Senior UX Designer (GovTech Singapore)',
    question: 'How do you balance high-velocity feature rollouts with strict WCAG 2.1 AAA accessibility requirements for citizen-facing digital public services?',
    sampleAnswer: 'In my previous project, we were overhauling a citizen verification portal. The initial wireframes relied heavily on colored badges for approval status. During accessibility testing with elderly users and visually impaired focus groups, we realized color-only indicators failed WCAG AAA criteria. I restructured the component library to include high-contrast text labels, ARIA screen-reader landmarks, and minimum 44px tap targets. While this delayed the initial prototype sprint by three days, it increased overall unassisted task completion rate to 98% and passed the ministry security and accessibility audit on the first review cycle.',
  },
  {
    role: 'Fintech Product Operations Lead (Straits Horizon)',
    question: 'Describe a situation where a core payment rail experienced intermittent settlement latency. How did you coordinate cross-functional recovery under MAS regulatory reporting timelines?',
    sampleAnswer: 'During a PayNow gateway spike at month-end payroll, our outbound webhook queues backed up by 18 minutes. I immediately invoked our Incident Tier-2 protocol, notified the compliance officer for potential MAS TRM reporting, and stood up an emergency bridge with our infrastructure and bank gateway partners. We switched batch sizes from 500 to 100 transactions and routed non-urgent balance queries through our read replica. We cleared the backlog within 42 minutes with zero transaction loss, and delivered the full root-cause post-mortem within the mandatory 48-hour regulatory window.',
  }
];

export const MockInterviewModal: React.FC<MockInterviewModalProps> = ({
  isOpen,
  onClose,
  candidateName,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  if (!isOpen) return null;

  const currentQ = SAMPLE_QUESTIONS[questionIndex];

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsSubmitting(true);
    setEvaluation(null);

    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: currentQ.role,
          company: 'Singapore Hiring Panel',
          userResponse: userAnswer,
          questionIndex,
        }),
      });
      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseSample = () => {
    setUserAnswer(currentQ.sampleAnswer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden text-left my-8">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#003f8b] text-white rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1a1b21]">
                AI Mock Interview Simulator
              </h2>
              <p className="text-xs text-[#737783]">
                Role-specific scenario questions evaluated against Singapore hiring rubrics.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#737783] hover:text-[#1a1b21] hover:bg-[#ededf5] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Selector */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#003f8b] bg-[#EFF6FF] px-2.5 py-1 rounded-md border border-[#adc6ff]">
              {currentQ.role}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => {
                  setQuestionIndex(0);
                  setEvaluation(null);
                  setUserAnswer('');
                }}
                className={`px-2 py-1 rounded ${questionIndex === 0 ? 'bg-[#003f8b] text-white font-bold' : 'text-[#737783]'}`}
              >
                Question 1
              </button>
              <button
                onClick={() => {
                  setQuestionIndex(1);
                  setEvaluation(null);
                  setUserAnswer('');
                }}
                className={`px-2 py-1 rounded ${questionIndex === 1 ? 'bg-[#003f8b] text-white font-bold' : 'text-[#737783]'}`}
              >
                Question 2
              </button>
            </div>
          </div>

          {/* Question card */}
          <div className="p-4 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] space-y-2">
            <span className="text-[11px] uppercase font-bold text-[#737783] tracking-wider block">
              Scenario Question
            </span>
            <p className="text-sm font-bold text-[#1a1b21] leading-relaxed">
              "{currentQ.question}"
            </p>
          </div>

          {/* Candidate response area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1a1b21]">
                Your Answer (Recommended: Use STAR methodology)
              </label>
              <button
                onClick={handleUseSample}
                className="text-xs font-bold text-[#003f8b] hover:underline"
              >
                Insert Sample Response
              </button>
            </div>

            <textarea
              rows={4}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Structure your answer: Situation, Task, Action you took, and measurable Results..."
              className="w-full p-3 text-xs bg-white border border-[#c3c6d3] rounded-xl focus:border-[#003f8b] focus:outline-none"
            ></textarea>
          </div>

          {/* Submit CTA */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleSubmitAnswer}
              disabled={isSubmitting || !userAnswer.trim()}
              className="px-5 py-2.5 bg-[#003f8b] hover:bg-[#2557a7] disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Grading Answer with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Evaluate with AI Rubric</span>
                </>
              )}
            </button>
          </div>

          {/* Evaluation Results */}
          {evaluation && (
            <div className="p-5 bg-[#F0FDFA] rounded-xl border border-[#ccfbf1] space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0F766E]" />
                  <span className="font-bold text-sm text-[#0F766E]">
                    AI Evaluation Score: {evaluation.score} / 100
                  </span>
                </div>
                <span className="text-xs font-bold text-[#0F766E] bg-white px-2.5 py-0.5 rounded-full border border-[#ccfbf1]">
                  Panel Ready
                </span>
              </div>

              <p className="text-xs text-[#434751] leading-relaxed">
                {evaluation.feedback}
              </p>

              {/* STAR Breakdown */}
              {evaluation.starEvaluation && (
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#ccfbf1]">
                  <div className="p-2 bg-white rounded-lg border border-[#ccfbf1]">
                    <strong className="text-[#003f8b] block">Situation:</strong>
                    <span className="text-[#434751]">{evaluation.starEvaluation.situation}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#ccfbf1]">
                    <strong className="text-[#003f8b] block">Task:</strong>
                    <span className="text-[#434751]">{evaluation.starEvaluation.task}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#ccfbf1]">
                    <strong className="text-[#003f8b] block">Action:</strong>
                    <span className="text-[#434751]">{evaluation.starEvaluation.action}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#ccfbf1]">
                    <strong className="text-[#003f8b] block">Result:</strong>
                    <span className="text-[#434751]">{evaluation.starEvaluation.result}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#f9f9ff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-[#c3c6d3] text-[#434751] text-xs font-bold rounded-xl hover:bg-[#f3f3fa]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
