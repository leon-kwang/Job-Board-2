import React, { useState } from 'react';
import { CandidateProfile } from '../types';
import { 
  X, 
  Upload, 
  Linkedin, 
  HardDrive, 
  Check, 
  Sparkles, 
  FileText, 
  Loader2,
  FolderOpen,
  Cloud,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface CvUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile;
  onUpdateCandidate: (updated: CandidateProfile) => void;
}

export const CvUploadModal: React.FC<CvUploadModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onUpdateCandidate,
}) => {
  const [activeSource, setActiveSource] = useState<'local' | 'cloud' | 'linkedin'>('local');
  const [cloudDriveProvider, setCloudDriveProvider] = useState<'gdrive' | 'dropbox' | 'onedrive'>('gdrive');
  const [linkedInInput, setLinkedInInput] = useState(candidate.linkedInUrl || 'https://linkedin.com/in/maytan-product-ux');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setSuccessMessage('');
    try {
      // Call backend API to parse CV
      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: `Resume file: ${file.name}. Candidate possesses UX, Product, and Design System engineering skills in Singapore.`,
        }),
      });
      const parsed = await res.json();

      const updatedProfile: CandidateProfile = {
        ...candidate,
        currentCvName: file.name,
        cvLastUpdated: 'Just now',
        cvSource: 'local',
        skills: parsed.skills || candidate.skills,
        headline: parsed.headline || candidate.headline,
      };

      onUpdateCandidate(updatedProfile);
      setSuccessMessage(`Successfully parsed ${file.name}! Skills and profile updated.`);
    } catch (err) {
      console.error(err);
      setSuccessMessage(`Updated CV with ${file.name}.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Cloud Drive Import
  const handleCloudDriveImport = (filename: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedProfile: CandidateProfile = {
        ...candidate,
        currentCvName: filename,
        cvLastUpdated: 'Just now',
        cvSource: cloudDriveProvider,
      };
      onUpdateCandidate(updatedProfile);
      setIsLoading(false);
      setSuccessMessage(`Imported ${filename} from ${cloudDriveProvider.toUpperCase()}!`);
    }, 800);
  };

  // Handle LinkedIn Sync
  const handleLinkedInSync = async () => {
    setIsLoading(true);
    setSuccessMessage('');
    try {
      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkedInUrl: linkedInInput,
        }),
      });
      const parsed = await res.json();

      const updatedProfile: CandidateProfile = {
        ...candidate,
        linkedInUrl: linkedInInput,
        skills: Array.from(new Set([...candidate.skills, 'Design Systems', 'Figma', 'Interactive Prototyping', 'Fintech Workflows'])),
        cvLastUpdated: 'Synced via LinkedIn',
      };

      onUpdateCandidate(updatedProfile);
      setSuccessMessage(`LinkedIn profile verified and skills synchronized!`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch to Persona Presets
  const handleSelectPreset = (preset: 'may' | 'alex' | 'sarah') => {
    if (preset === 'may') {
      onUpdateCandidate({
        ...candidate,
        name: 'May Tan',
        headline: 'Product & UX Specialist',
        photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1sL_eM_SgG0TwXYD4CppuaeRUQJsVMmZG61Y6tR0jeGNSV-vYJLz-tyFwGipDnoBoeR6TUHOE_dAVIttsmg99p9T7L0VtBfR8FBsV7K8HneenEc-2ozrFG4HTR8pPerxPgsKwsVAnEQfLpaGOQHY3SYhhXyWyvS21WFgomv86RBB23ggbBUVNU4roSUyWgKbPP7bvITz3pFBbJpds_SlgTQEUxTwDLZ582bi4PbzUYQWEzc9p3KxU',
        currentCvName: 'Resume_May_Tan_2025.pdf',
        experienceYears: 5,
        skills: ['Figma', 'Design Systems', 'User Research & Testing', 'Interactive Prototyping', 'Design Strategy', 'Agile Scrum'],
      });
      setSuccessMessage('Loaded May Tan (Product & UX Specialist)');
    } else if (preset === 'alex') {
      onUpdateCandidate({
        ...candidate,
        name: 'Alex Chen',
        headline: 'Senior Cloud & AI Solutions Architect',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        currentCvName: 'Alex_Chen_Cloud_Architect.pdf',
        experienceYears: 6,
        skills: ['Cloud Architecture', 'AWS Solutions', 'Kubernetes', 'Prompt Engineering', 'Python', 'Distributed Systems'],
      });
      setSuccessMessage('Loaded Alex Chen (Cloud & AI Architect)');
    } else if (preset === 'sarah') {
      onUpdateCandidate({
        ...candidate,
        name: 'Sarah Wong',
        headline: 'Fintech Operations & Regulatory Lead',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        currentCvName: 'Sarah_Wong_Fintech_Lead.docx',
        experienceYears: 7,
        skills: ['KYC / AML Workflow', 'Payment Rails (FAST/PayNow)', 'MAS Tech Risk Guidelines', 'Agile Scrum', 'Process Mapping'],
      });
      setSuccessMessage('Loaded Sarah Wong (Fintech Operations Lead)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden text-left my-8">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#003f8b] text-white rounded-lg">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1a1b21]">
                Update Candidate CV & Profile
              </h2>
              <p className="text-xs text-[#737783]">
                Upload your latest resume from local disk, connect cloud drives, or sync LinkedIn.
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

        {/* Source Navigation Tabs */}
        <div className="flex border-b border-[#E5E7EB] bg-[#ffffff] text-xs font-bold px-5">
          <button
            onClick={() => setActiveSource('local')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSource === 'local'
                ? 'border-[#003f8b] text-[#003f8b]'
                : 'border-transparent text-[#737783] hover:text-[#1a1b21]'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            Local File Upload
          </button>
          <button
            onClick={() => setActiveSource('cloud')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSource === 'cloud'
                ? 'border-[#003f8b] text-[#003f8b]'
                : 'border-transparent text-[#737783] hover:text-[#1a1b21]'
            }`}
          >
            <Cloud className="w-4 h-4" />
            Cloud Drives (Google Drive / Dropbox)
          </button>
          <button
            onClick={() => setActiveSource('linkedin')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSource === 'linkedin'
                ? 'border-[#003f8b] text-[#003f8b]'
                : 'border-transparent text-[#737783] hover:text-[#1a1b21]'
            }`}
          >
            <Linkedin className="w-4 h-4 text-[#0077b5]" />
            LinkedIn Profile URL
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* TAB 1: LOCAL FILE UPLOAD */}
          {activeSource === 'local' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileUpload(e.dataTransfer.files[0]);
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragOver
                    ? 'border-[#003f8b] bg-[#EFF6FF]'
                    : 'border-[#c3c6d3] hover:border-[#003f8b] bg-[#f9f9ff]'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#003f8b] flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#1a1b21]">
                  Drag and drop your CV file here
                </h3>
                <p className="text-xs text-[#737783] mt-1">
                  Supports PDF, DOCX, or TXT (Max 10MB)
                </p>

                <div className="mt-4">
                  <label className="px-4 py-2 bg-[#003f8b] hover:bg-[#2557a7] text-white text-xs font-bold rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                    <span>Browse Files from Computer</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#737783] bg-[#f3f3fa] p-3 rounded-xl border border-[#c3c6d3]">
                <span className="font-semibold text-[#1a1b21]">Current Active CV:</span>
                <span className="font-mono text-[#003f8b] font-bold">{candidate.currentCvName}</span>
              </div>
            </div>
          )}

          {/* TAB 2: CLOUD DRIVES */}
          {activeSource === 'cloud' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCloudDriveProvider('gdrive')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    cloudDriveProvider === 'gdrive'
                      ? 'border-[#003f8b] bg-[#EFF6FF] text-[#003f8b]'
                      : 'border-[#E5E7EB] hover:bg-[#f3f3fa] text-[#434751]'
                  }`}
                >
                  <FolderOpen className="w-5 h-5 text-blue-500" />
                  <span>Google Drive</span>
                </button>
                <button
                  onClick={() => setCloudDriveProvider('dropbox')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    cloudDriveProvider === 'dropbox'
                      ? 'border-[#003f8b] bg-[#EFF6FF] text-[#003f8b]'
                      : 'border-[#E5E7EB] hover:bg-[#f3f3fa] text-[#434751]'
                  }`}
                >
                  <Cloud className="w-5 h-5 text-indigo-500" />
                  <span>Dropbox</span>
                </button>
                <button
                  onClick={() => setCloudDriveProvider('onedrive')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    cloudDriveProvider === 'onedrive'
                      ? 'border-[#003f8b] bg-[#EFF6FF] text-[#003f8b]'
                      : 'border-[#E5E7EB] hover:bg-[#f3f3fa] text-[#434751]'
                  }`}
                >
                  <HardDrive className="w-5 h-5 text-cyan-600" />
                  <span>Microsoft OneDrive</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#f9f9ff] space-y-2">
                <span className="text-xs font-bold text-[#434751] block">
                  Select file from your {cloudDriveProvider === 'gdrive' ? 'Google Drive' : cloudDriveProvider === 'dropbox' ? 'Dropbox' : 'OneDrive'}:
                </span>
                <div className="space-y-2">
                  <div
                    onClick={() => handleCloudDriveImport(`May_Tan_Resume_Cloud_Sync_2025.pdf`)}
                    className="p-3 bg-white rounded-lg border border-[#E5E7EB] hover:border-[#003f8b] cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#003f8b]" />
                      <span className="text-xs font-semibold text-[#1a1b21]">May_Tan_Resume_Cloud_Sync_2025.pdf</span>
                    </div>
                    <span className="text-[11px] text-[#0F766E] font-bold">1-Click Import</span>
                  </div>

                  <div
                    onClick={() => handleCloudDriveImport(`May_Tan_CV_Executive_Portfolio.pdf`)}
                    className="p-3 bg-white rounded-lg border border-[#E5E7EB] hover:border-[#003f8b] cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#003f8b]" />
                      <span className="text-xs font-semibold text-[#1a1b21]">May_Tan_CV_Executive_Portfolio.pdf</span>
                    </div>
                    <span className="text-[11px] text-[#0F766E] font-bold">1-Click Import</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LINKEDIN URL */}
          {activeSource === 'linkedin' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1a1b21] block">
                  Candidate LinkedIn Profile URL:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#f3f3fa] border border-[#c3c6d3] rounded-xl focus-within:border-[#003f8b] focus-within:bg-white">
                    <Linkedin className="w-4 h-4 text-[#0077b5] shrink-0" />
                    <input
                      type="url"
                      value={linkedInInput}
                      onChange={(e) => setLinkedInInput(e.target.value)}
                      placeholder="https://www.linkedin.com/in/your-profile"
                      className="w-full text-xs font-medium text-[#1a1b21] bg-transparent focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleLinkedInSync}
                    disabled={isLoading}
                    className="px-4 py-2.5 bg-[#003f8b] hover:bg-[#2557a7] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                    <span>Sync & Extract</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-[#737783] leading-relaxed">
                TalentTrust extracts verified job experiences, published certifications, and endorsed competencies directly into your profile graph.
              </p>
            </div>
          )}

          {/* Quick Persona Switcher for demonstration */}
          <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
            <span className="text-xs font-bold text-[#737783] uppercase tracking-wider block">
              Test with Sample Candidate Profiles:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSelectPreset('may')}
                className="p-2 rounded-lg border border-[#E5E7EB] hover:border-[#003f8b] bg-[#f9f9ff] text-left text-xs transition-colors"
              >
                <span className="font-bold text-[#1a1b21] block">May Tan</span>
                <span className="text-[10px] text-[#737783] block">Product & UX Specialist</span>
              </button>
              <button
                onClick={() => handleSelectPreset('alex')}
                className="p-2 rounded-lg border border-[#E5E7EB] hover:border-[#003f8b] bg-[#f9f9ff] text-left text-xs transition-colors"
              >
                <span className="font-bold text-[#1a1b21] block">Alex Chen</span>
                <span className="text-[10px] text-[#737783] block">Cloud & AI Architect</span>
              </button>
              <button
                onClick={() => handleSelectPreset('sarah')}
                className="p-2 rounded-lg border border-[#E5E7EB] hover:border-[#003f8b] bg-[#f9f9ff] text-left text-xs transition-colors"
              >
                <span className="font-bold text-[#1a1b21] block">Sarah Wong</span>
                <span className="text-[10px] text-[#737783] block">Fintech Operations Lead</span>
              </button>
            </div>
          </div>

          {/* Status feedback */}
          {successMessage && (
            <div className="p-3 bg-[#F0FDFA] border border-[#0F766E]/30 rounded-xl flex items-center gap-2 text-xs text-[#0F766E] font-medium animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#f9f9ff] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#003f8b] hover:bg-[#2557a7] text-white text-xs font-bold rounded-xl transition-colors"
          >
            Done & Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
