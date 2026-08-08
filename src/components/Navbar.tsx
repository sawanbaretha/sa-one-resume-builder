import React from 'react';
import { Sparkles, Download, RotateCcw, LogIn, LogOut, History as HistoryIcon, Maximize2 } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import { initialResumeData } from '../data/sampleResume';
import type { User } from '@supabase/supabase-js';
import { Logo } from './Logo';

interface NavbarProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  user: User | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  onOpenFullScreen: () => void;
  onDownloadPDF: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setResumeData,
  user,
  onOpenAuth,
  onSignOut,
  onOpenHistory,
  historyCount,
  onOpenFullScreen,
  onDownloadPDF
}) => {
  const handleLoadSample = () => {
    setResumeData(JSON.parse(JSON.stringify(initialResumeData)));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields to empty?")) {
      setResumeData({
        personalDetails: {
          fullName: '',
          jobTitle: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          summary: ''
        },
        experiences: [],
        educations: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
      });
    }
  };

  return (
    <header className="navbar no-print">
      <div className="navbar-brand">
        <Logo size="md" showText={true} textColor="#ffffff" />
      </div>

      <div className="navbar-actions">
        <button
          className="btn btn-accent btn-sm"
          onClick={handleLoadSample}
          title="Fill with sample data"
        >
          <Sparkles size={15} />
          <span>Load Sample</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleReset}
          title="Clear all fields"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenFullScreen}
          title="Full Screen Preview mode"
        >
          <Maximize2 size={15} />
          <span>Full Preview</span>
        </button>

        {/* Supabase User & Auth Status */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="btn btn-accent btn-sm"
              onClick={onOpenHistory}
              title="View History of saved resumes and PDFs"
            >
              <HistoryIcon size={15} />
              <span>History</span>
              {historyCount > 0 && (
                <span className="navbar-history-badge">
                  {historyCount}
                </span>
              )}
            </button>

            <span className="navbar-user-email" title={user.email}>
              {user.email?.split('@')[0]}
            </span>

            <button
              className="btn btn-secondary btn-sm"
              onClick={onSignOut}
              title="Sign Out"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenAuth}
            title="Sign in with Supabase"
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        )}

        {/* Emerald Green Download PDF Button */}
        <button
          className="btn btn-emerald"
          onClick={onDownloadPDF}
          title="Download clean PDF resume"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>
    </header>
  );
};
