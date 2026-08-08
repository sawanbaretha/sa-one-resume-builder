import React from 'react';
import type { ResumeData, Customization } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  customization: Customization;
}

export const Template3Sidebar: React.FC<TemplateProps> = ({ data, customization }) => {
  const { personalDetails, experiences, educations, skills, projects, languages } = data;
  const primaryColor = customization.primaryColor || '#2563eb';

  return (
    <div
      className="resume-template-sidebar"
      style={{
        fontFamily: customization.fontFamily,
        color: '#0f172a',
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateColumns: '1fr 2.3fr',
        minHeight: '100%'
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          borderRight: `2px solid ${primaryColor}22`,
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        {/* Name & Title */}
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
            {personalDetails.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: primaryColor, marginTop: '0.35rem' }}>
            {personalDetails.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: '#334155' }}>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: primaryColor, fontWeight: 700 }}>
            Contact
          </h4>
          {personalDetails.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
              <Mail size={13} color={primaryColor} /> <span>{personalDetails.email}</span>
            </div>
          )}
          {personalDetails.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={13} color={primaryColor} /> <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={13} color={primaryColor} /> <span>{personalDetails.location}</span>
            </div>
          )}
          {personalDetails.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
              <Globe size={13} color={primaryColor} /> <span>{personalDetails.website}</span>
            </div>
          )}
          {personalDetails.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
              <Share2 size={13} color={primaryColor} /> <span>{personalDetails.linkedin}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: primaryColor, fontWeight: 700, marginBottom: '0.6rem' }}>
              Skills
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {skills.map((sk) => (
                <div key={sk.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', fontWeight: 600, color: '#0f172a' }}>
                    <span>{sk.name}</span>
                  </div>
                  {/* Skill level bar */}
                  <div style={{ height: '4px', width: '100%', backgroundColor: '#dbeafe', borderRadius: '2px', marginTop: '0.2rem' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${(sk.level / 5) * 100}%`,
                        backgroundColor: primaryColor,
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: primaryColor, fontWeight: 700, marginBottom: '0.5rem' }}>
              Languages
            </h4>
            {languages.map((lang) => (
              <div key={lang.id} style={{ fontSize: '0.775rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.name}</span>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{lang.proficiency}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ padding: '2rem 2.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Summary */}
        {personalDetails.summary && (
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: primaryColor, letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              About Me
            </h3>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#334155' }}>
              {personalDetails.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: primaryColor, letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
              Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {exp.jobTitle}
                    </h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: primaryColor }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                    {exp.company}
                  </div>
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: '#334155', whiteSpace: 'pre-line' }}>
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
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: primaryColor, letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
              Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {projects.map((p) => (
                <div key={p.id}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                  <p style={{ fontSize: '0.8rem', color: '#334155', margin: '0.15rem 0' }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: primaryColor, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Education
            </h3>
            {educations.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '0.6rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  {edu.degree} in {edu.fieldOfStudy}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                  {edu.institution} ({edu.startDate} – {edu.endDate})
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
