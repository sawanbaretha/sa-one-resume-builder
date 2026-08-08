import React from 'react';
import { User, Briefcase, GraduationCap, Award, FolderGit2, BadgeCheck, FileText, Palette, LayoutDashboard, Files, Layout, Sparkles, Crown, Check } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export type SectionTab = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'summary' | 'customizer';

interface SidebarProps {
  activeTab: SectionTab;
  onTabChange: (tab: SectionTab) => void;
  user: SupabaseUser | null;
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  userName
}) => {
  const firstName = userName ? userName.split(' ')[0] : 'User';

  const menuItems: { id: SectionTab; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal Info', icon: <User size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Award size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={18} /> },
    { id: 'certifications', label: 'Certifications', icon: <BadgeCheck size={18} /> },
    { id: 'summary', label: 'Summary', icon: <FileText size={18} /> },
    { id: 'customizer', label: 'Colors & Fonts', icon: <Palette size={18} /> }
  ];

  return (
    <aside className="app-sidebar no-print">
      {/* Brand Logo Header */}
      <div className="sidebar-brand">
        <div className="brand-badge">
          <FileText size={20} color="#ffffff" />
        </div>
        <div className="brand-text">
          <span className="brand-title">ResumePro</span>
          <span className="brand-sub">SA-ONE BUILDER</span>
        </div>
      </div>

      {/* Greeting Card */}
      <div className="sidebar-greeting-card">
        <div className="greeting-content">
          <h4>Good Morning, {firstName} 👋</h4>
          <p>Create a professional resume that gets you hired!</p>
        </div>
        <div className="greeting-icon">
          <Sparkles size={24} color="#ec4899" />
        </div>
      </div>

      {/* Top Nav Links */}
      <div className="sidebar-nav-group">
        <div className="sidebar-link inactive">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>
        <div className="sidebar-link active-link">
          <Files size={18} />
          <span>My Resumes</span>
        </div>
        <div className="sidebar-link inactive">
          <Layout size={18} />
          <span>Templates</span>
        </div>
      </div>

      {/* Section Divider Header */}
      <div className="sidebar-section-header">
        <span>RESUME BUILDER</span>
      </div>

      {/* Section Switcher Tabs */}
      <div className="sidebar-tabs">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-tab-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="tab-icon">{item.icon}</span>
            <span className="tab-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Premium Upgrade Banner Card */}
      <div className="sidebar-premium-card">
        <div className="premium-header">
          <Crown size={18} color="#7c3aed" />
          <span>Unlock Premium</span>
        </div>
        <ul className="premium-features">
          <li><Check size={14} color="#7c3aed" /> AI Resume Review</li>
          <li><Check size={14} color="#7c3aed" /> 150+ Premium Templates</li>
          <li><Check size={14} color="#7c3aed" /> Unlimited Downloads</li>
        </ul>
        <button type="button" className="btn-upgrade-now">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
};
