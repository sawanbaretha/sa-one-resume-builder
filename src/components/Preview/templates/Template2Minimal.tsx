import React from 'react';
import type { ResumeData, Customization } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  customization: Customization;
}

export const Template2Minimal: React.FC<TemplateProps> = ({ data, customization }) => {
  const { personalDetails, experiences, educations, skills, projects } = data;
  const primaryColor = customization.primaryColor || '#2563eb';

  return (
    <div
      className="resume-template-minimal"
      style={{
        fontFamily: customization.fontFamily,
        color: '#0f172a',
        backgroundColor: '#ffffff',
        padding: '2.5rem 2.75rem',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
          {personalDetails.fullName || 'Your Full Name'}
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: primaryColor, margin: '0.3rem 0 0.75rem 0' }}>
          {personalDetails.jobTitle || 'Your Target Job Title'}
        </p>

        {/* Contact Links Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.85rem',
            fontSize: '0.825rem',
            color: '#475569'
          }}
        >
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails.location && <span>• {personalDetails.location}</span>}
          {personalDetails.website && <span>• {personalDetails.website}</span>}
          {personalDetails.linkedin && <span>• {personalDetails.linkedin}</span>}
        </div>
      </div>

      <div style={{ height: '2px', backgroundColor: primaryColor, width: '100%' }} />

      {/* Summary */}
      {personalDetails.summary && (
        <div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#334155', textAlign: 'center', fontStyle: 'italic' }}>
            "{personalDetails.summary}"
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: primaryColor,
              marginBottom: '0.75rem'
            }}
          >
            Work Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0f172a' }}>
                    {exp.jobTitle} — <span style={{ fontWeight: 500, color: '#475569' }}>{exp.company}</span>
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: primaryColor }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.825rem',
                    lineHeight: 1.55,
                    color: '#334155',
                    marginTop: '0.35rem',
                    whiteSpace: 'pre-line'
                  }}
                >
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
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: primaryColor,
              marginBottom: '0.75rem'
            }}
          >
            Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {projects.map((p) => (
              <div key={p.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{p.name}</span>
                  {p.link && <span style={{ fontSize: '0.75rem', color: primaryColor }}>{p.link}</span>}
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#334155', margin: '0.2rem 0' }}>{p.description}</p>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  <strong>Tech Stack:</strong> {p.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primaryColor,
                marginBottom: '0.75rem'
              }}
            >
              Education
            </h3>
            {educations.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                  {edu.degree} in {edu.fieldOfStudy}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>{edu.institution}</div>
                <div style={{ fontSize: '0.75rem', color: primaryColor }}>
                  {edu.startDate} – {edu.endDate} {edu.gpa && `• GPA ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primaryColor,
                marginBottom: '0.75rem'
              }}
            >
              Skills & Expertise
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {skills.map((sk) => (
                <span
                  key={sk.id}
                  style={{
                    fontSize: '0.775rem',
                    backgroundColor: '#f1f5f9',
                    color: '#0f172a',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                    fontWeight: 500
                  }}
                >
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
