import React from 'react';
import type { ResumeData, Customization } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  customization: Customization;
}

export const Template5Creative: React.FC<TemplateProps> = ({ data, customization }) => {
  const { personalDetails, experiences, educations, skills, projects, certifications } = data;
  const primaryColor = customization.primaryColor || '#2563eb';

  const getInitials = (name: string) => {
    if (!name) return 'YN';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      className="resume-template-creative"
      style={{
        fontFamily: customization.fontFamily,
        color: '#0f172a',
        backgroundColor: '#ffffff',
        padding: '2.25rem 2.5rem',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      {/* Top Creative Grid Card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          backgroundColor: '#f8fafc',
          padding: '1.5rem 1.75rem',
          borderRadius: '12px',
          borderLeft: `6px solid ${primaryColor}`,
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)'
        }}
      >
        {/* Avatar Initials */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: primaryColor,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            flexShrink: 0
          }}
        >
          {getInitials(personalDetails.fullName)}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
            {personalDetails.fullName || 'Your Full Name'}
          </h1>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: primaryColor, margin: '0.2rem 0 0.5rem 0' }}>
            {personalDetails.jobTitle || 'Your Job Title'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.78rem', color: '#475569' }}>
            {personalDetails.email && <span>📧 {personalDetails.email}</span>}
            {personalDetails.phone && <span>📱 {personalDetails.phone}</span>}
            {personalDetails.location && <span>📍 {personalDetails.location}</span>}
            {personalDetails.website && <span>🌐 {personalDetails.website}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalDetails.summary && (
        <div style={{ padding: '0.25rem 0.5rem' }}>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#334155' }}>
            {personalDetails.summary}
          </p>
        </div>
      )}

      {/* Split Grid Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.3fr', gap: '1.5rem' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.85rem'
                }}
              >
                Experience
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    style={{
                      borderLeft: '2px solid #e2e8f0',
                      paddingLeft: '0.85rem',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {exp.jobTitle}
                      </h4>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: primaryColor }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>{exp.company}</div>
                    <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: '#334155', marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.85rem'
                }}
              >
                Projects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {projects.map((p) => (
                  <div key={p.id} style={{ backgroundColor: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                    <p style={{ fontSize: '0.8rem', color: '#334155', margin: '0.2rem 0' }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.35rem' }}>
                      {p.technologies.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', backgroundColor: `${primaryColor}18`, color: primaryColor, borderRadius: '4px', fontWeight: 600 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Skills Badges */}
          {skills.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.85rem'
                }}
              >
                Tech Stack & Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skills.map((sk) => (
                  <span
                    key={sk.id}
                    style={{
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      backgroundColor: '#eff6ff',
                      color: primaryColor,
                      padding: '0.3rem 0.65rem',
                      borderRadius: '20px',
                      border: `1px solid ${primaryColor}33`
                    }}
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.85rem'
                }}
              >
                Education
              </h3>
              {educations.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>{edu.institution}</div>
                  <div style={{ fontSize: '0.75rem', color: primaryColor, fontWeight: 600 }}>{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem'
                }}
              >
                Certifications
              </h3>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{cert.name}</div>
                  <div style={{ color: '#64748b' }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
