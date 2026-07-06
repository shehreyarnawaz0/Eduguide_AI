import React from "react";
import { PRESET_QUESTIONS } from "../utils/constants";
import { HelpCircle, BookOpen, Key, Info, ExternalLink } from "lucide-react";

const Sidebar = ({ onSelectQuestion, isLoading }) => {
  return (
    <aside className="chat-sidebar">
      {/* Scope Information */}
      <div className="sidebar-section">
        <h2 className="sidebar-section-title">
          <Info size={16} className="section-title-icon" />
          About EduGuide AI
        </h2>
        <p className="sidebar-description">
          This intelligent assistant is programmed to support students and applicants with university-related topics only.
        </p>
        <div className="scope-list-card">
          <span className="scope-badge">Admissions</span>
          <span className="scope-badge">Courses</span>
          <span className="scope-badge">Tuition Fees</span>
          <span className="scope-badge">Scholarships</span>
          <span className="scope-badge">Timetables</span>
          <span className="scope-badge">Campus Services</span>
          <span className="scope-badge">Academic Calendar</span>
          <span className="scope-badge">Student Support</span>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="sidebar-section">
        <h2 className="sidebar-section-title">
          <HelpCircle size={16} className="section-title-icon" />
          Suggested Queries
        </h2>
        <p className="sidebar-sub-desc">Click any option to test the chat response:</p>
        <div className="suggestions-grid">
          {PRESET_QUESTIONS.map((faq) => (
            <button
              key={faq.id}
              onClick={() => onSelectQuestion(faq.text)}
              disabled={isLoading}
              className={`suggestion-chip-btn ${faq.category === "Out of Scope" ? "chip-danger" : ""}`}
              title={faq.text}
            >
              <div className="chip-header">
                <span className="chip-category">{faq.category}</span>
              </div>
              <span className="chip-label">{faq.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* External Resources */}
      <div className="sidebar-section sidebar-footer">
        <h2 className="sidebar-section-title">
          <BookOpen size={16} className="section-title-icon" />
          Quick Resources
        </h2>
        <ul className="resource-links-list">
          <li>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="resource-link">
              <span>Student Portal</span>
              <ExternalLink size={12} />
            </a>
          </li>
          <li>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="resource-link">
              <span>Academic Catalog</span>
              <ExternalLink size={12} />
            </a>
          </li>
          <li>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="resource-link">
              <span>Campus Map & Directions</span>
              <ExternalLink size={12} />
            </a>
          </li>
        </ul>
        <div className="credits-area">
          <p>© {new Date().getFullYear()} EduGuide University</p>
          <p className="credits-tag">Developed as a student helpdesk solution</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
