import React from 'react';
import type { ResumeData, Customization } from '../../types/resume';
import { X, History as HistoryIcon, Download, Trash2, ArrowRight, FileText, Calendar, Layout } from 'lucide-react';

export interface SavedResumeRecord {
  id: string;
  title: string;
  content: ResumeData;
  customization: Customization;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyList: SavedResumeRecord[];
  onLoadResume: (record: SavedResumeRecord) => void;
  onDeleteResume: (id: string) => void;
  isLoading: boolean;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  historyList,
  onLoadResume,
  onDeleteResume,
  isLoading
}) => {
  if (!isOpen) return null;

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
          overflow: 'hidden',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '1.25rem 1.75rem',
            position: 'relative',
            background: 'linear-gradient(135deg, #2563eb, #1e40af)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <HistoryIcon size={22} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
              Resume History & Cloud Snapshots
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* History List Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              Loading your saved resumes from Supabase cloud...
            </div>
          ) : historyList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
              <FileText size={40} color="#94a3b8" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>No Saved Resumes Yet</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Whenever you save or download a PDF resume, a snapshot will be stored in your history here.
              </p>
            </div>
          ) : (
            historyList.map((item) => (
              <div
                key={item.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'box-shadow 0.2s',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {item.content?.personalDetails?.fullName || item.title || 'Untitled Resume'}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        textTransform: 'capitalize',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Layout size={10} />
                      {item.customization?.templateId || 'Modern'} Template
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#64748b', marginTop: '0.4rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} /> {formatDate(item.updated_at || item.created_at)}
                    </span>
                    {item.content?.personalDetails?.jobTitle && (
                      <span>• {item.content.personalDetails.jobTitle}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.pdf_url && (
                    <a
                      href={item.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent btn-sm"
                      title="View / Download PDF from Supabase Storage"
                      style={{ textDecoration: 'none' }}
                    >
                      <Download size={14} />
                      <span>PDF</span>
                    </a>
                  )}

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onLoadResume(item)}
                    title="Load this version into editor"
                  >
                    <span>Load</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteResume(item.id)}
                    title="Delete record"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
