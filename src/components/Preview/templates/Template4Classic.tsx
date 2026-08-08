import React from 'react';
import type { ResumeData, Customization } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  customization: Customization;
}

export const Template4Classic: React.FC<TemplateProps> = ({ data, customization }) => {
  const { personalDetails, experiences, educations, skills } = data;
  const primaryColor = customization.primaryColor || '#2563eb';

  return (
    <div
      className="resume-template-classic"
      style={{
        fontFamily: customization.fontFamily === 'Merriweather' ? 'Merriweather, serif' : 'Georgia, serif',
        color: '#0f172a',
        backgroundColor: '#ffffff',
        padding: '2.5rem 3rem',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.4rem'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${primaryColor}`, paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>
          {personalDetails.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '1rem', fontStyle: 'italic', color: primaryColor, margin: '0.25rem 0 0.6rem 0' }}>
          {personalDetails.jobTitle || 'Job Title'}
        </p>

        <div style={{ fontSize: '0.8125rem', color: '#475569', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          {personalDetails.location && <span>{personalDetails.location}</span>}
          {personalDetails.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails.email && <span>• {personalDetails.email}</span>}
          {personalDetails.website && <span>• {personalDetails.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails.summary && (
        <div>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
            Executive Summary
          </h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#334155' }}>
            {personalDetails.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
            Professional Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                    {exp.jobTitle}, <span style={{ fontWeight: 400, fontStyle: 'italic' }}>{exp.company}</span>
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '0.825rem', lineHeight: 1.55, color: '#334155', marginTop: '0.3rem', whiteSpace: 'pre-line' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.65rem' }}>
            Education & Academic Background
          </h3>
          {educations.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <div>
                <strong style={{ color: '#0f172a' }}>{edu.degree} in {edu.fieldOfStudy}</strong> — {edu.institution}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{edu.startDate} – {edu.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
            Core Competencies & Skills
          </h3>
          <p style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.6 }}>
            {skills.map((sk) => sk.name).join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};
