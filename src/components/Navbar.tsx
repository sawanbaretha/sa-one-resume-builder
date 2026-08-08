import React from 'react';
import { Sparkles, Download, RotateCcw, LogIn, LogOut, History as HistoryIcon } from 'lucide-react';
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
  onDownloadPDF: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setResumeData,
  user,
  onOpenAuth,
  onSignOut,
  onOpenHistory,
  historyCount,
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
          title="Fill with realistic sample data to test templates"
        >
          <Sparkles size={16} />
          <span>Load Sample</span>
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={handleReset}
          title="Clear all fields"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>

        {/* Supabase User & Auth Status */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="btn btn-accent btn-sm"
              onClick={onOpenHistory}
              title="View History of saved resumes and PDFs"
            >
              <HistoryIcon size={16} />
              <span>History</span>
              {historyCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#0066ff',
                    fontSize: '0.7rem',
                    borderRadius: '10px',
                    padding: '0.1rem 0.4rem',
                    fontWeight: 800
                  }}
                >
                  {historyCount}
                </span>
              )}
            </button>

            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              title={user.email}
            >
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
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}

        {/* Download PDF Button (Auto-saves to Supabase before downloading) */}
        <button
          className="btn btn-primary"
          onClick={onDownloadPDF}
          title="Download clean PDF resume (Requires Auth)"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>
    </header>
  );
};
