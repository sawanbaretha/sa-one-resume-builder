
import React from 'react';
import type { Experience } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onChange
}) => {
  const handleAdd = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([...experiences, newExp]);
  };

  const handleRemove = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const handleChange = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === id) {
          return { ...exp, [field]: value };
        }
        return exp;
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {experiences.map((exp, index) => (
        <div
          key={exp.id}
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2563eb' }}>
              Experience #{index + 1}
            </span>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleRemove(exp.id)}
              title="Remove Experience"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="form-row" style={{ marginBottom: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-input"
                value={exp.jobTitle}
                onChange={(e) => handleChange(exp.id, 'jobTitle', e.target.value)}
                placeholder="Senior Engineer"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-input"
                value={exp.company}
                onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                placeholder="Acme Corp"
              />
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="text"
                className="form-input"
                value={exp.startDate}
                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                placeholder="2021-03 or Mar 2021"
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="text"
                className="form-input"
                disabled={exp.current}
                value={exp.current ? 'Present' : exp.endDate}
                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                placeholder="Present or 2023-11"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem' }}>
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
              />
              <span>I currently work here</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Achievements (Bullet points)</label>
            <textarea
              className="form-textarea"
              value={exp.description}
              onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
              rows={3}
              placeholder="• Led cross-functional team of 4 engineers&#10;• Increased performance by 30%"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleAdd}
        style={{ width: '100%' }}
      >
        <Plus size={16} />
        <span>Add Work Experience</span>
      </button>
    </div>
  );
};
