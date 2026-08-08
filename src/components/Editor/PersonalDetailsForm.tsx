import React, { useRef } from 'react';
import type { PersonalDetails } from '../../types/resume';
import { User, Briefcase, Mail, Phone, MapPin, Share2, Bold, Italic, Underline, List, ListOrdered, Upload, Trash2, ArrowRight } from 'lucide-react';

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  onChange: (details: PersonalDetails) => void;
  onNext?: () => void;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  data,
  onChange,
  onNext
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...data,
          photoUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onChange({
      ...data,
      photoUrl: undefined
    });
  };

  return (
    <div className="card-form-section">
      <div className="card-form-header">
        <h3>Personal Information</h3>
        <p>Add your basic details to get started.</p>
      </div>

      <div className="form-grid-2">
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <div className="input-with-icon">
            <User size={16} className="field-icon" />
            <input
              type="text"
              className="form-input-styled"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="Sawan Baretha"
            />
          </div>
        </div>

        {/* Job Title */}
        <div className="form-group">
          <label className="form-label">Job Title</label>
          <div className="input-with-icon">
            <Briefcase size={16} className="field-icon" />
            <input
              type="text"
              className="form-input-styled"
              name="jobTitle"
              value={data.jobTitle}
              onChange={handleChange}
              placeholder="Software Engineer"
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-with-icon">
            <Mail size={16} className="field-icon" />
            <input
              type="email"
              className="form-input-styled"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="sawan@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">Phone</label>
          <div className="input-with-icon">
            <Phone size={16} className="field-icon" />
            <input
              type="text"
              className="form-input-styled"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+91 76172 24005"
            />
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="form-label">Location</label>
          <div className="input-with-icon">
            <MapPin size={16} className="field-icon" />
            <input
              type="text"
              className="form-input-styled"
              name="location"
              value={data.location}
              onChange={handleChange}
              placeholder="Gwalior, India"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <div className="input-with-icon">
            <Share2 size={16} className="field-icon" />
            <input
              type="text"
              className="form-input-styled"
              name="linkedin"
              value={data.linkedin}
              onChange={handleChange}
              placeholder="linkedin.com/in/sawanbaretha"
            />
          </div>
        </div>
      </div>

      {/* Summary with Rich Text Bar */}
      <div className="form-group" style={{ marginTop: '1.25rem' }}>
        <label className="form-label">Summary</label>
        <div className="rich-text-editor-box">
          <div className="rich-toolbar">
            <button type="button" className="rich-btn" title="Bold"><Bold size={14} /></button>
            <button type="button" className="rich-btn" title="Italic"><Italic size={14} /></button>
            <button type="button" className="rich-btn" title="Underline"><Underline size={14} /></button>
            <span className="toolbar-divider"></span>
            <button type="button" className="rich-btn" title="Bullet List"><List size={14} /></button>
            <button type="button" className="rich-btn" title="Numbered List"><ListOrdered size={14} /></button>
          </div>
          <textarea
            className="form-textarea-styled"
            name="summary"
            value={data.summary}
            onChange={handleChange}
            rows={4}
            placeholder="Passionate and detail-oriented Software Engineer with experience in building responsive web applications and solving real-world problems."
          />
        </div>
      </div>

      {/* Profile Photo Card */}
      <div className="profile-photo-card" style={{ marginTop: '1.5rem' }}>
        <div className="photo-card-header">
          <h4>Profile Photo</h4>
          <p>Add a profile photo to make your resume more personal.</p>
        </div>

        <div className="photo-card-body">
          <div className="avatar-preview-circle">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Profile Avatar" />
            ) : (
              <div className="avatar-placeholder">
                <User size={32} color="#94a3b8" />
              </div>
            )}
          </div>

          <div className="photo-action-buttons">
            <button
              type="button"
              className="btn-outline-upload"
              onClick={() => photoInputRef.current?.click()}
            >
              <Upload size={16} />
              <span>Upload Photo</span>
            </button>
            <input
              type="file"
              ref={photoInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handlePhotoUpload}
            />

            {data.photoUrl && (
              <button
                type="button"
                className="btn-outline-remove"
                onClick={handleRemovePhoto}
              >
                <Trash2 size={16} />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Save & Continue Button */}
      {onNext && (
        <div className="form-action-footer">
          <button type="button" className="btn-save-continue" onClick={onNext}>
            <span>Save & Continue</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
