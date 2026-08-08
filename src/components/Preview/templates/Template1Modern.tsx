import React from 'react';
import type { ResumeData, Customization } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Share2, Code } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  customization: Customization;
}

export const Template1Modern: React.FC<TemplateProps> = ({ data, customization }) => {
  const { personalDetails, experiences, educations, skills, projects, certifications, languages } = data;
  const primaryColor = customization.primaryColor || '#2563eb';

  return (
    <div
      className="resume-template-modern"
      style={{
        fontFamily: customization.fontFamily,
        color: '#0f172a',
        backgroundColor: '#ffffff',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Banner Header */}
      <div
        style={{
          backgroundColor: primaryColor,
          color: '#ffffff',
          padding: '2rem 2.25rem',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px'
        }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#ffffff' }}>
          {personalDetails.fullName || 'Your Full Name'}
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 500, margin: '0.25rem 0 1rem 0', opacity: 0.9 }}>
          {personalDetails.jobTitle || 'Your Target Job Title'}
        </p>

        {/* Contact Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.825rem', opacity: 0.95 }}>
          {personalDetails.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={14} /> <span>{personalDetails.email}</span>
            </div>
          )}
          {personalDetails.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={14} /> <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={14} /> <span>{personalDetails.location}</span>
            </div>
          )}
          {personalDetails.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Globe size={14} /> <span>{personalDetails.website}</span>
            </div>
          )}
          {personalDetails.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Share2 size={14} /> <span>{personalDetails.linkedin}</span>
            </div>
          )}
          {personalDetails.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Code size={14} /> <span>{personalDetails.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '1.75rem 2.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Summary */}
        {personalDetails.summary && (
          <div>
            <h3
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: primaryColor,
                borderBottom: `2px solid ${primaryColor}22`,
                paddingBottom: '0.3rem',
                marginBottom: '0.6rem'
              }}
            >
              Professional Summary
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#334155' }}>
              {personalDetails.summary}
            </p>
          </div>
        )}

        {/* 2-Column Grid Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1.75rem' }}>
          {/* Left Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Experience */}
            {experiences.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}22`,
                    paddingBottom: '0.3rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  Work Experience
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                          {exp.jobTitle}
                        </h4>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: primaryColor }}>
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </div>
                      <p
                        style={{
                          fontSize: '0.825rem',
                          lineHeight: 1.55,
                          color: '#334155',
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
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}22`,
                    paddingBottom: '0.3rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  Key Projects
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {projects.map((p) => (
                    <div key={p.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                          {p.name}
                        </h4>
                        {p.link && (
                          <span style={{ fontSize: '0.75rem', color: primaryColor, fontWeight: 500 }}>
                            {p.link}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: '#334155', margin: '0.2rem 0' }}>
                        {p.description}
                      </p>
                      {p.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                          {p.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              style={{
                                fontSize: '0.7rem',
                                padding: '0.15rem 0.45rem',
                                backgroundColor: `${primaryColor}12`,
                                color: primaryColor,
                                borderRadius: '4px',
                                fontWeight: 600
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}22`,
                    paddingBottom: '0.3rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  Skills & Expertise
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {skills.map((sk) => (
                    <span
                      key={sk.id}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        backgroundColor: '#f1f5f9',
                        color: '#0f172a',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        borderLeft: `3px solid ${primaryColor}`
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
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}22`,
                    paddingBottom: '0.3rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  Education
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {educations.map((edu) => (
                    <div key={edu.id}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                        {edu.degree} in {edu.fieldOfStudy}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                        {edu.institution}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: primaryColor, fontWeight: 600 }}>
                        {edu.startDate} – {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}22`,
                    paddingBottom: '0.3rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  Certifications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{cert.name}</div>
                      <div style={{ color: '#64748b' }}>{cert.issuer} ({cert.date})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}22`,
                    paddingBottom: '0.3rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  Languages
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.name}</span>
                      <span style={{ color: '#64748b' }}>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
