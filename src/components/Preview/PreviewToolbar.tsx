import React from 'react';
import type { TemplateId } from '../../types/resume';
import { TemplateSelector } from './TemplateSelector';
import { Download, Maximize2 } from 'lucide-react';

interface PreviewToolbarProps {
  activeTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  onDownload: () => void;
  onOpenFullScreen: () => void;
}

export const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  activeTemplate,
  onSelectTemplate,
  onDownload,
  onOpenFullScreen
}) => {
  return (
    <div className="preview-toolbar-clean no-print">
      <div className="toolbar-left-templates">
        <TemplateSelector
          activeTemplate={activeTemplate}
          onSelect={onSelectTemplate}
        />
      </div>

      <div className="toolbar-right-actions">
        <button
          type="button"
          className="btn-toolbar-fullscreen"
          onClick={onOpenFullScreen}
          title="Open Full Screen Preview"
        >
          <Maximize2 size={15} />
          <span>Full View</span>
        </button>

        <button
          type="button"
          className="btn-emerald-download"
          onClick={onDownload}
          title="Download PDF resume"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
};
