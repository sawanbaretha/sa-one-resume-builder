import React from 'react';
import type { PersonalDetails } from '../../types/resume';

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  onChange: (details: PersonalDetails) => void;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  data,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-input"
            name="jobTitle"
            value={data.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Senior Frontend Engineer"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-input"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="New York, NY"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Website / Portfolio</label>
          <input
            type="text"
            className="form-input"
            name="website"
            value={data.website}
            onChange={handleChange}
            placeholder="https://yourportfolio.dev"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input
            type="text"
            className="form-input"
            name="linkedin"
            value={data.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/username"
          />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub</label>
          <input
            type="text"
            className="form-input"
            name="github"
            value={data.github}
            onChange={handleChange}
            placeholder="github.com/username"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-textarea"
          name="summary"
          value={data.summary}
          onChange={handleChange}
          rows={4}
          placeholder="Brief summary of your professional background, key skills, and engineering achievements..."
        />
      </div>
    </>
  );
};
