import React, { useState } from 'react';
import { SavedSearch } from '../types';
import { 
  X, 
  Bell, 
  Trash2, 
  Check, 
  Mail, 
  Smartphone, 
  Sparkles, 
  Clock, 
  Plus, 
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

interface SavedSearchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSearches: SavedSearch[];
  onToggleActive: (searchId: string) => void;
  onDeleteSearch: (searchId: string) => void;
  onTriggerSimulatedNotification: (searchTitle: string) => void;
}

export const SavedSearchesModal: React.FC<SavedSearchesModalProps> = ({
  isOpen,
  onClose,
  savedSearches,
  onToggleActive,
  onDeleteSearch,
  onTriggerSimulatedNotification,
}) => {
  const [notificationSuccess, setNotificationSuccess] = useState('');

  if (!isOpen) return null;

  const handleTestAlert = (search: SavedSearch) => {
    onTriggerSimulatedNotification(search.title);
    setNotificationSuccess(`Simulated notification alert sent for "${search.title}"! Check your notification bell.`);
    setTimeout(() => setNotificationSuccess(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden text-left my-8">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#003f8b] text-white rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1a1b21]">
                Saved Searches & Notification Alerts
              </h2>
              <p className="text-xs text-[#737783]">
                Manage alerts for new verified openings matching your job search parameters.
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

        {/* Content */}
        <div className="p-6 space-y-4">
          {notificationSuccess && (
            <div className="p-3 bg-[#F0FDFA] border border-[#0F766E]/30 rounded-xl flex items-center gap-2 text-xs text-[#0F766E] font-medium animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{notificationSuccess}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-[#737783] pb-2 border-b border-[#f3f3fa]">
            <span className="font-bold text-[#1a1b21]">
              Active Job Alerts ({savedSearches.filter(s => s.active).length} of {savedSearches.length})
            </span>
            <span>Delivery: Email &amp; In-App Notifications</span>
          </div>

          {savedSearches.length > 0 ? (
            <div className="space-y-3">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="p-4 bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] space-y-3 hover:border-[#adc6ff] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#1a1b21]">
                          {search.title}
                        </h3>
                        {search.newOpeningsCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDFA] text-[#0F766E] border border-[#ccfbf1]">
                            {search.newOpeningsCount} New Openings
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#737783]">
                        <span>What: <strong className="text-[#434751]">{search.what || 'Any title'}</strong></span>
                        <span>•</span>
                        <span>Where: <strong className="text-[#434751]">{search.where || 'Singapore'}</strong></span>
                        {search.filters.minSalary ? (
                          <>
                            <span>•</span>
                            <span>Min: <strong className="text-[#0F766E]">S${search.filters.minSalary.toLocaleString()}+</strong></span>
                          </>
                        ) : null}
                      </div>
                    </div>

                    {/* Toggle Alert Active Switch */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onToggleActive(search.id)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                          search.active ? 'bg-[#003f8b]' : 'bg-[#c3c6d3]'
                        }`}
                        title={search.active ? 'Pause Alert' : 'Resume Alert'}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            search.active ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => onDeleteSearch(search.id)}
                        className="p-1.5 text-[#737783] hover:text-[#ba1a1a] rounded-lg transition-colors"
                        title="Delete saved search"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Delivery channels & test simulation trigger */}
                  <div className="pt-2 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3 text-[11px] text-[#737783]">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#003f8b]" />
                        Email: may.tan@example.sg
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#0F766E]" />
                        {search.frequency === 'instant' ? 'Instant Alert' : 'Daily Digest'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleTestAlert(search)}
                      className="px-2.5 py-1 bg-white hover:bg-[#EFF6FF] border border-[#adc6ff] text-[#003f8b] rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Test New Opening Alert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#f9f9ff] rounded-xl border border-[#E5E7EB] space-y-2">
              <p className="text-sm font-bold text-[#1a1b21]">No saved searches yet</p>
              <p className="text-xs text-[#737783]">
                Perform a search in Find Jobs and click "Save Search & Alert Me" to be notified of new openings.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#f9f9ff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#003f8b] hover:bg-[#2557a7] text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
