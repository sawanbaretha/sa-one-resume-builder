import React from 'react';
import type { Skill } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const handleAdd = () => {
    const newSkill: Skill = {
      id: `sk-${Date.now()}`,
      name: '',
      category: 'General',
      level: 4
    };
    onChange([...skills, newSkill]);
  };

  const handleRemove = (id: string) => {
    onChange(skills.filter((sk) => sk.id !== id));
  };

  const handleChange = (id: string, field: keyof Skill, value: any) => {
    onChange(
      skills.map((sk) => {
        if (sk.id === id) {
          return { ...sk, [field]: value };
        }
        return sk;
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {skills.map((sk) => (
        <div
          key={sk.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 0.8fr auto',
            gap: '0.5rem',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            padding: '0.6rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #e2e8f0'
          }}
        >
          <input
            type="text"
            className="form-input"
            value={sk.name}
            onChange={(e) => handleChange(sk.id, 'name', e.target.value)}
            placeholder="Skill Name (e.g. React)"
          />
          <input
            type="text"
            className="form-input"
            value={sk.category}
            onChange={(e) => handleChange(sk.id, 'category', e.target.value)}
            placeholder="Category (e.g. Frontend)"
          />
          <select
            className="form-select"
            value={sk.level}
            onChange={(e) => handleChange(sk.id, 'level', Number(e.target.value))}
          >
            <option value={5}>Master (5/5)</option>
            <option value={4}>Expert (4/5)</option>
            <option value={3}>Advanced (3/5)</option>
            <option value={2}>Intermediate (2/5)</option>
            <option value={1}>Beginner (1/5)</option>
          </select>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemove(sk.id)}
            title="Remove Skill"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleAdd}
        style={{ width: '100%', marginTop: '0.25rem' }}
      >
        <Plus size={16} />
        <span>Add Skill</span>
      </button>
    </div>
  );
};
