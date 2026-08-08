import React from 'react';
import type { TemplateId } from '../../types/resume';
import { Layout, AlignLeft, Sidebar, BookOpen, Grid } from 'lucide-react';

interface TemplateSelectorProps {
  activeTemplate: TemplateId;
  onSelect: (templateId: TemplateId) => void;
}

export const TEMPLATES_CONFIG: { id: TemplateId; name: string; icon: React.ReactNode }[] = [
  { id: 'modern', name: '1. Modern Executive', icon: <Layout size={15} /> },
  { id: 'minimal', name: '2. Minimalist Clean', icon: <AlignLeft size={15} /> },
  { id: 'sidebar', name: '3. Tech Sidebar', icon: <Sidebar size={15} /> },
  { id: 'classic', name: '4. Classic Professional', icon: <BookOpen size={15} /> },
  { id: 'creative', name: '5. Creative Grid', icon: <Grid size={15} /> }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ activeTemplate, onSelect }) => {
  return (
    <div className="template-pills no-print">
      {TEMPLATES_CONFIG.map((template) => (
        <button
          key={template.id}
          className={`template-pill ${activeTemplate === template.id ? 'active' : ''}`}
          onClick={() => onSelect(template.id)}
        >
          {template.icon}
          <span>{template.name}</span>
        </button>
      ))}
    </div>
  );
};
