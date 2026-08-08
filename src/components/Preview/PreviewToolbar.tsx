import React from 'react';
import { Layout, Type, Palette, Sliders, Download, ChevronDown } from 'lucide-react';

interface PreviewToolbarProps {
  onDownload: () => void;
  onOpenCustomizer: () => void;
}

export const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  onDownload,
  onOpenCustomizer
}) => {
  return (
    <div className="right-preview-bottom-bar no-print">
      <div className="toolbar-left-controls">
        <button type="button" className="toolbar-pill-btn active-purple" onClick={onOpenCustomizer}>
          <Layout size={15} />
          <span>Template</span>
        </button>

        <button type="button" className="toolbar-pill-btn" onClick={onOpenCustomizer}>
          <Type size={15} />
          <span>Font</span>
        </button>

        <button type="button" className="toolbar-pill-btn" onClick={onOpenCustomizer}>
          <Palette size={15} />
          <span>Color</span>
        </button>

        <button type="button" className="toolbar-pill-btn" onClick={onOpenCustomizer}>
          <Sliders size={15} />
          <span>Page Setup</span>
        </button>
      </div>

      <div className="toolbar-right-download">
        <button type="button" className="btn-emerald-download" onClick={onDownload}>
          <Download size={18} />
          <span>Download Resume</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
};
