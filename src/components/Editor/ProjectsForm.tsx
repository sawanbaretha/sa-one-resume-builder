import React from 'react';
import type { Project } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const handleAdd = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: [],
      link: '',
      githubLink: ''
    };
    onChange([...projects, newProj]);
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const handleChange = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map((p) => {
        if (p.id === id) {
          if (field === 'technologies') {
            const techs = typeof value === 'string' ? value.split(',').map((t) => t.trim()) : value;
            return { ...p, technologies: techs };
          }
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {projects.map((p, index) => (
        <div
          key={p.id}
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#f8fafc'
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
              Project #{index + 1}
            </span>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleRemove(p.id)}
              title="Remove Project"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-input"
              value={p.name}
              onChange={(e) => handleChange(p.id, 'name', e.target.value)}
              placeholder="e.g. AI Portfolio Generator"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={p.description}
              onChange={(e) => handleChange(p.id, 'description', e.target.value)}
              rows={2}
              placeholder="Brief overview of what you built and outcomes achieved..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">Technologies Used (Comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={p.technologies.join(', ')}
              onChange={(e) => handleChange(p.id, 'technologies', e.target.value)}
              placeholder="React, TypeScript, Node.js, AWS"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Live Link / URL</label>
              <input
                type="text"
                className="form-input"
                value={p.link || ''}
                onChange={(e) => handleChange(p.id, 'link', e.target.value)}
                placeholder="https://project.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub Repo</label>
              <input
                type="text"
                className="form-input"
                value={p.githubLink || ''}
                onChange={(e) => handleChange(p.id, 'githubLink', e.target.value)}
                placeholder="github.com/user/project"
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
        <span>Add Project</span>
      </button>
    </div>
  );
};
