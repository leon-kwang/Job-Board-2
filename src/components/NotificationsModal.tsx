import React from 'react';
import { X, Bell, Briefcase, Calendar, Sparkles, Check } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'job_alert' | 'application_update' | 'interview_reminder';
  read: boolean;
  jobId?: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotificationJob: (jobId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotificationJob,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden text-left my-8">
        {/* Header */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#003f8b] text-white rounded-lg">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1a1b21]">
                Notifications & Job Alerts
              </h2>
              <span className="text-[11px] text-[#737783]">
                Alerts from your saved searches & applications
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-bold text-[#003f8b] hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#737783] hover:text-[#1a1b21] hover:bg-[#ededf5] rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#f3f3fa]">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.jobId) onSelectNotificationJob(item.jobId);
              }}
              className={`p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-[#f9f9ff] ${
                !item.read ? 'bg-[#EFF6FF]/40' : 'bg-white'
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  item.type === 'job_alert'
                    ? 'bg-[#F0FDFA] text-[#0F766E]'
                    : item.type === 'interview_reminder'
                    ? 'bg-[#FFFBEB] text-[#B45309]'
                    : 'bg-[#EFF6FF] text-[#003f8b]'
                }`}
              >
                {item.type === 'job_alert' && <Sparkles className="w-4 h-4" />}
                {item.type === 'interview_reminder' && <Calendar className="w-4 h-4" />}
                {item.type === 'application_update' && <Briefcase className="w-4 h-4" />}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#1a1b21]">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-[#737783]">{item.time}</span>
                </div>
                <p className="text-xs text-[#434751] leading-relaxed">
                  {item.message}
                </p>
                {item.jobId && (
                  <span className="text-[11px] font-bold text-[#003f8b] inline-block pt-1">
                    View opening &rarr;
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#E5E7EB] bg-[#f9f9ff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#003f8b] text-white text-xs font-bold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
