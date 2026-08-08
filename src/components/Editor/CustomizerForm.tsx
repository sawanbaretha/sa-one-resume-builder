import React from 'react';
import type { Customization, FontFamily } from '../../types/resume';

interface CustomizerFormProps {
  customization: Customization;
  onChange: (customization: Customization) => void;
}

const BLUE_PALETTE = [
  { name: 'Electric Royal Blue', color: '#2563eb' },
  { name: 'Deep Navy Blue', color: '#1e3a8a' },
  { name: 'Slate Steel Blue', color: '#0284c7' },
  { name: 'Cyan Electric', color: '#0d9488' },
  { name: 'Indigo Deep', color: '#4f46e5' },
  { name: 'Midnight Charcoal', color: '#0f172a' }
];

export const CustomizerForm: React.FC<CustomizerFormProps> = ({
  customization,
  onChange
}) => {
  const handleColorChange = (color: string) => {
    onChange({ ...customization, primaryColor: color });
  };

  const handleFontChange = (font: FontFamily) => {
    onChange({ ...customization, fontFamily: font });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="form-group">
        <label className="form-label">Primary Accent Color</label>
        <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
          {BLUE_PALETTE.map((item) => (
            <button
              key={item.color}
              type="button"
              className={`color-swatch ${customization.primaryColor === item.color ? 'selected' : ''}`}
              style={{ backgroundColor: item.color }}
              onClick={() => handleColorChange(item.color)}
              title={item.name}
            />
          ))}
          <input
            type="color"
            value={customization.primaryColor}
            onChange={(e) => handleColorChange(e.target.value)}
            style={{ width: '26px', height: '26px', border: 'none', background: 'none', cursor: 'pointer' }}
            title="Custom Hex Color"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Typography / Font Family</label>
        <select
          className="form-select"
          value={customization.fontFamily}
          onChange={(e) => handleFontChange(e.target.value as FontFamily)}
        >
          <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Clean)</option>
          <option value="Inter">Inter (Sleek Tech)</option>
          <option value="Outfit">Outfit (Contemporary)</option>
          <option value="Roboto">Roboto (Classic Standard)</option>
          <option value="Merriweather">Merriweather (Serif Elegant)</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Font Size Scale</label>
          <select
            className="form-select"
            value={customization.fontSize}
            onChange={(e) => onChange({ ...customization, fontSize: e.target.value as any })}
          >
            <option value="sm">Small (Compact)</option>
            <option value="md">Medium (Standard)</option>
            <option value="lg">Large (Spacious)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Section Spacing</label>
          <select
            className="form-select"
            value={customization.spacing}
            onChange={(e) => onChange({ ...customization, spacing: e.target.value as any })}
          >
            <option value="compact">Compact</option>
            <option value="normal">Normal</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );
};
