import React from 'react';
import type { TemplateId } from '../types/resume';
import { Check } from 'lucide-react';

interface TemplateCarouselProps {
  activeTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
}

const TEMPLATES: { id: TemplateId; name: string; thumbnailBg: string }[] = [
  { id: 'modern', name: 'Modern Executive', thumbnailBg: 'linear-gradient(135deg, #2563eb 35%, #ffffff 35%)' },
  { id: 'minimal', name: 'Minimalist Clean', thumbnailBg: 'linear-gradient(180deg, #ffffff 80%, #0f172a 80%)' },
  { id: 'sidebar', name: 'Tech Sidebar', thumbnailBg: 'linear-gradient(90deg, #0b192c 30%, #ffffff 30%)' },
  { id: 'classic', name: 'Classic Professional', thumbnailBg: 'linear-gradient(180deg, #ffffff 70%, #eff6ff 70%)' },
  { id: 'creative', name: 'Creative Grid', thumbnailBg: 'linear-gradient(135deg, #7c3aed 25%, #ffffff 25%)' }
];

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  activeTemplate,
  onSelectTemplate
}) => {
  return (
    <div className="choose-template-section">
      <div className="section-title-bar">
        <h3>Choose a Template</h3>
        <span className="view-all-link">View All</span>
      </div>

      <div className="template-cards-grid">
        {TEMPLATES.map((tmpl) => {
          const isSelected = activeTemplate === tmpl.id;
          return (
            <div
              key={tmpl.id}
              className={`template-card-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectTemplate(tmpl.id)}
            >
              <div
                className="template-card-preview"
                style={{ background: tmpl.thumbnailBg }}
              >
                <div className="preview-lines">
                  <div className="preview-line short"></div>
                  <div className="preview-line long"></div>
                  <div className="preview-line medium"></div>
                </div>

                {isSelected && (
                  <div className="checked-badge">
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </div>
                )}
              </div>

              <span className="template-card-name">{tmpl.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
