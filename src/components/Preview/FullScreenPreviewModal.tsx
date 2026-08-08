import React from 'react';
import type { ResumeData, Customization } from '../../types/resume';
import { ResumePreview } from './ResumePreview';
import { X, Download } from 'lucide-react';

interface FullScreenPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  customization: Customization;
  onDownload: () => void;
}

export const FullScreenPreviewModal: React.FC<FullScreenPreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  customization,
  onDownload
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(6px)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        padding: '1.5rem 1rem'
      }}
    >
      {/* Top Floating Control Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          backgroundColor: '#0f172a',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ fontSize: '1rem', fontWeight: 800 }}>
          Full Screen Resume Preview
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onDownload}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1.1rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: 'white',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Close Full Screen Preview"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Centered Resume Sheet Container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          paddingBottom: '2rem'
        }}
      >
        <div style={{ boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)', borderRadius: '4px' }}>
          <ResumePreview data={data} customization={customization} />
        </div>
      </div>
    </div>
  );
};
