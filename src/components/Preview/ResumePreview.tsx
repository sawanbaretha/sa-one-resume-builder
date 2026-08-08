import { forwardRef } from 'react';
import type { ResumeData, Customization } from '../../types/resume';
import { Template1Modern } from './templates/Template1Modern';
import { Template2Minimal } from './templates/Template2Minimal';
import { Template3Sidebar } from './templates/Template3Sidebar';
import { Template4Classic } from './templates/Template4Classic';
import { Template5Creative } from './templates/Template5Creative';

interface ResumePreviewProps {
  data: ResumeData;
  customization: Customization;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, customization }, ref) => {
    const renderTemplate = () => {
      switch (customization.templateId) {
        case 'minimal':
          return <Template2Minimal data={data} customization={customization} />;
        case 'sidebar':
          return <Template3Sidebar data={data} customization={customization} />;
        case 'classic':
          return <Template4Classic data={data} customization={customization} />;
        case 'creative':
          return <Template5Creative data={data} customization={customization} />;
        case 'modern':
        default:
          return <Template1Modern data={data} customization={customization} />;
      }
    };

    return (
      <div className="preview-container">
        <div ref={ref} className="resume-paper" id="resume-document">
          {renderTemplate()}
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
