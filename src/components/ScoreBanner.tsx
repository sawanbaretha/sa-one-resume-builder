import React from 'react';
import { Lightbulb, ChevronDown } from 'lucide-react';

export const ScoreBanner: React.FC = () => {
  return (
    <div className="resume-score-banner">
      <div className="score-banner-left">
        <div className="score-ring">
          <svg width="48" height="48" viewBox="0 0 36 36">
            <path
              className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3.5"
            />
            <path
              className="circle"
              strokeDasharray="78, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#0066ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text x="18" y="21" className="percentage" textAnchor="middle" fill="#0066ff" fontSize="10" fontWeight="800">
              78%
            </text>
          </svg>
        </div>

        <div className="score-banner-text">
          <h4>Your resume is looking good!</h4>
          <p>Add more details to make it stand out.</p>
        </div>
      </div>

      <div className="tips-dropdown-trigger">
        <Lightbulb size={16} color="#eab308" />
        <span>Tips to improve</span>
        <ChevronDown size={14} />
      </div>
    </div>
  );
};
