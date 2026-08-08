import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FormAccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const FormAccordion: React.FC<FormAccordionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <button
        type="button"
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="accordion-header-left">
          <span className="accordion-header-icon">{icon}</span>
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
};
