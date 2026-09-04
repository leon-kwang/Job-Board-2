import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  Send, 
  Clock, 
  Users,
  RefreshCw
} from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

export const TalkToUsView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Fixed real canonical values for Disqus page config
  const FIXED_IDENTIFIER = 'talenttrust-talk-to-us-thread';
  
  // Real fixed canonical URL with safety for sandboxed frames
  const getFixedPageUrl = () => {
    try {
      if (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') {
        return `${window.location.origin}/talk-to-us`;
      }
    } catch {
      // fallback
    }
    return 'https://talenttrust.app/talk-to-us';
  };

  const fixedUrl = getFixedPageUrl();

  const loadOrResetDisqus = () => {
    setLoadError(false);
    
    // Disqus configuration function with real fixed values
    const disqusConfig = function (this: any) {
      this.page.url = fixedUrl;
      this.page.identifier = FIXED_IDENTIFIER;
      this.page.title = 'Talk to Us - TalentTrust Career Community';
    };

    try {
      if (window.DISQUS) {
        // SPA tab switch support: Disqus already loaded in window, reset to target the fresh container
        window.DISQUS.reset({
          reload: true,
          config: disqusConfig,
        });
        setIsLoaded(true);
      } else {
        // Initial load: assign global config and inject embed.js
        window.disqus_config = disqusConfig;

        // Check if script element already exists
        let script = document.getElementById('disqus-embed-script') as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement('script');
          script.id = 'disqus-embed-script';
          script.src = 'https://leon-kwang.disqus.com/embed.js';
          script.setAttribute('data-timestamp', String(+new Date()));
          script.async = true;
          script.onload = () => setIsLoaded(true);
          script.onerror = () => {
            setLoadError(true);
            setIsLoaded(true);
          };
          (document.head || document.body).appendChild(script);
        } else {
          // If script tag exists but window.DISQUS is not ready yet, wait briefly
          const timer = setTimeout(() => {
            if (window.DISQUS) {
              window.DISQUS.reset({
                reload: true,
                config: disqusConfig,
              });
            }
            setIsLoaded(true);
          }, 300);
          return () => clearTimeout(timer);
        }
      }
    } catch (err) {
      console.warn('Disqus initialization note:', err);
      setLoadError(true);
    }
  };

  useEffect(() => {
    // Small delay ensures #disqus_thread is rendered in the DOM before embed.js or reset runs
    const timeout = setTimeout(() => {
      loadOrResetDisqus();
    }, 50);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Hero Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFF6FF] text-[#1E40AF] rounded-full text-xs font-bold tracking-wide">
                <MessageSquare className="w-3.5 h-3.5 text-[#2557a7]" />
                <span>Community & Career Feedback Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Talk to Us
              </h1>
              <p className="text-sm text-[#475569] max-w-2xl leading-relaxed">
                Have questions regarding job matches, skill conversion programs, or platform features? 
                Leave a comment, ask our career advisors a question, or share your feedback with the TalentTrust community.
              </p>
            </div>

            {/* Quick stats / reassurance badges */}
            <div className="flex flex-row md:flex-col gap-3 min-w-[200px] border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-xs text-[#334155]">
                <Clock className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>Avg response time: <strong>&lt; 2 hrs</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#334155]">
                <ShieldCheck className="w-4 h-4 text-[#003f8b] shrink-0" />
                <span>Verified Career Advisors</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#334155]">
                <Users className="w-4 h-4 text-[#2557a7] shrink-0" />
                <span>Open candidate forum</span>
              </div>
            </div>
          </div>

          {/* Discussion Guidelines and Prompt Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#F1F5F9]">
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#2557a7]" />
                <span className="text-xs font-bold text-[#1E293B]">CV & Skill Advice</span>
              </div>
              <p className="text-[12px] text-[#64748B]">
                Ask which certifications give the highest ROI for your target job family in Singapore.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-[#0F766E]" />
                <span className="text-xs font-bold text-[#1E293B]">Hiring Inquiries</span>
              </div>
              <p className="text-[12px] text-[#64748B]">
                Inquire about fast-track employer applications, interview formats, or salary benchmarks.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-1">
                <Send className="w-4 h-4 text-[#EA580C]" />
                <span className="text-xs font-bold text-[#1E293B]">Platform Feedback</span>
              </div>
              <p className="text-[12px] text-[#64748B]">
                Suggest new filters, industry sectors, or alert preferences for the job search engine.
              </p>
            </div>
          </div>
        </section>

        {/* Disqus Commenting Container Card */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span>Join the Discussion</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] font-medium">
                  Disqus Community
                </span>
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Posting to thread: <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded text-[11px] text-[#334155]">{FIXED_IDENTIFIER}</code>
              </p>
            </div>

            <button
              onClick={loadOrResetDisqus}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#334155] hover:bg-[#F1F5F9] border border-[#CBD5E1] transition-colors"
              title="Refresh discussion thread"
              id="reload-disqus-btn"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Reload Thread</span>
            </button>
          </div>

          {/* Fallback notice if Disqus script fails to load (e.g. third party cookies or ad blockers) */}
          {loadError && (
            <div className="mb-4 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2">
              <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
              <div>
                <p className="font-semibold">Disqus took longer to respond or was blocked by browser privacy settings.</p>
                <p className="mt-1 text-[#A16207]">
                  If comments do not appear below, check if your browser or ad blocker is restricting third-party scripts, or click "Reload Thread" above.
                </p>
              </div>
            </div>
          )}

          {/* The Disqus Thread Mount Node */}
          <div id="disqus_thread" className="min-h-[280px] w-full" />

          {/* Noscript fallback specified by Disqus */}
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" rel="noreferrer" className="text-[#003f8b] underline">
              comments powered by Disqus.
            </a>
          </noscript>
        </section>

      </div>
    </main>
  );
};
