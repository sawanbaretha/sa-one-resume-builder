import React from 'react';
import { Pencil, Sparkles, LogIn, LogOut, History as HistoryIcon } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface HeaderProps {
  resumeTitle: string;
  onTitleChange: (newTitle: string) => void;
  user: SupabaseUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  lastSavedText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  resumeTitle,
  onTitleChange,
  user,
  onOpenAuth,
  onSignOut,
  onOpenHistory,
  historyCount,
  lastSavedText = 'Last saved 2 mins ago'
}) => {
  return (
    <header className="app-top-header no-print">
      {/* Title & Saved Status */}
      <div className="header-left">
        <div className="title-edit-group">
          <input
            type="text"
            className="header-title-input"
            value={resumeTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Software Engineer Resume"
          />
          <Pencil size={15} className="edit-pencil-icon" />
        </div>
        <div className="saved-status-badge">
          <span className="dot-indicator"></span>
          <span>{lastSavedText}</span>
        </div>
      </div>

      {/* Step Indicators Process Bar */}
      <div className="header-steps-bar">
        <div className="step-item completed">
          <span className="step-num">1</span>
          <span className="step-text">Template</span>
        </div>
        <div className="step-line active-line"></div>
        <div className="step-item active">
          <span className="step-num">2</span>
          <span className="step-text">Edit</span>
        </div>
        <div className="step-line"></div>
        <div className="step-item">
          <span className="step-num">3</span>
          <span className="step-text">Preview</span>
        </div>
        <div className="step-line"></div>
        <div className="step-item">
          <span className="step-num">4</span>
          <span className="step-text">Download</span>
        </div>
      </div>

      {/* Right Top Actions */}
      <div className="header-right">
        {/* AI Assistant Pill Button */}
        <button type="button" className="btn-ai-assistant">
          <Sparkles size={16} color="#7c3aed" />
          <span>AI Assistant</span>
        </button>

        {/* User Session / Auth Controls */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              type="button"
              className="btn-header-history"
              onClick={onOpenHistory}
              title="View History of saved resumes"
            >
              <HistoryIcon size={16} color="#7c3aed" />
              <span>History</span>
              {historyCount > 0 && <span className="history-badge">{historyCount}</span>}
            </button>

            <div className="user-avatar-circle" title={user.email || 'User Profile'}>
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </div>

            <button
              type="button"
              className="btn-header-icon"
              onClick={onSignOut}
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-header-auth"
            onClick={onOpenAuth}
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
