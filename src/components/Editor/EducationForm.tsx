import React from 'react';
import type { Education } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  educations: Education[];
  onChange: (educations: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  educations,
  onChange
}) => {
  const handleAdd = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      gpa: ''
    };
    onChange([...educations, newEdu]);
  };

  const handleRemove = (id: string) => {
    onChange(educations.filter((edu) => edu.id !== id));
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    onChange(
      educations.map((edu) => {
        if (edu.id === id) {
          return { ...edu, [field]: value };
        }
        return edu;
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {educations.map((edu, index) => (
        <div
          key={edu.id}
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
              Education #{index + 1}
            </span>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleRemove(edu.id)}
              title="Remove Education"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="form-row" style={{ marginBottom: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Institution / University</label>
              <input
                type="text"
                className="form-input"
                value={edu.institution}
                onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                placeholder="University of California"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-input"
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Field of Study</label>
              <input
                type="text"
                className="form-input"
                value={edu.fieldOfStudy}
                onChange={(e) => handleChange(edu.id, 'fieldOfStudy', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="form-group">
              <label className="form-label">GPA (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={edu.gpa || ''}
                onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                placeholder="3.8 / 4.0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="text"
                className="form-input"
                value={edu.startDate}
                onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                placeholder="2017-08"
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="text"
                className="form-input"
                value={edu.endDate}
                onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                placeholder="2021-05"
              />
            </div>
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
        <span>Add Education</span>
      </button>
    </div>
  );
};
