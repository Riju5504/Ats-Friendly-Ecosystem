import React, { useState } from 'react';
import './ResultsPage.css';

export default function ResultsPage({ result, fileName, onBack }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const categories = result?.categories || {};
  const score = result?.atsScore || 0;

  const getColor = (s) => s >= 75 ? '#10B981' : s >= 50 ? '#F97316' : '#EF4444';

  return (
    <div className="results-page">
      <div className="results-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h1>ATS Report</h1>
        <p className="results-subtitle">Recommendations to improve</p>
      </div>

      <div className="results-container">
        <aside className="sidebar-left">
          <div className="score-card-main">
            <div className="score-circle-large">
              <span className="score-number" style={{ color: getColor(score) }}>{score}</span>
              <span className="score-total">/100</span>
            </div>
            <p className="score-status">{score >= 75 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work'}</p>
            <p className="score-filename">📄 {fileName}</p>
          </div>

          <div className="category-scores">
            {[
              { k: 'essentials', l: 'Essentials', i: '📋' },
              { k: 'sections', l: 'Sections', i: '📑' },
              { k: 'technical', l: 'Technical', i: '⚙️' },
              { k: 'hrRedFlags', l: 'Soft Skills', i: '🤝' },
              { k: 'discrimination', l: 'Safety', i: '🔒' },
              { k: 'seniority', l: 'Seniority', i: '📈' },
            ].map(({ k, l, i }) => (
              <div key={k} className="category-item">
                <div className="category-header">
                  <span>{i}</span>
                  <div className="category-label">{l}</div>
                </div>
                <div className="category-bar">
                  <div className="category-fill" style={{ width: `${categories[k] || 0}%`, backgroundColor: getColor(categories[k] || 0) }} />
                </div>
                <div className="category-percent">{categories[k] || 0}%</div>
              </div>
            ))}
          </div>

          <button className="btn-download" onClick={() => alert('Report downloaded!')}>⬇️ Download</button>
        </aside>

        <main className="main-content">
          <div className="content-tabs">
            <button className={`tab-btn ${showPreview ? 'active' : ''}`} onClick={() => setShowPreview(true)}>📄 Preview</button>
            <button className={`tab-btn ${!showPreview ? 'active' : ''}`} onClick={() => setShowPreview(false)}>💡 Tips</button>
          </div>

          {showPreview ? (
            <div className="resume-preview-section">
              <div className="preview-placeholder">
                <div className="placeholder-icon">📄</div>
                <h3>Keywords</h3>
                <div className="keywords-list">
                  <span className="keyword-tag">Email</span>
                  <span className="keyword-tag">Phone</span>
                  <span className="keyword-tag">LinkedIn</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="recommendations-grid">
              <div className="recommendation-card">
                <h3>Essentials</h3>
                <ul><li>✓ Add email and phone</li><li>✓ Add LinkedIn</li></ul>
              </div>
              <div className="recommendation-card">
                <h3>Sections</h3>
                <ul><li>✓ Add Experience</li><li>✓ Add Education</li></ul>
              </div>
              <div className="recommendation-card">
                <h3>Technical</h3>
                <ul><li>✓ List programming languages</li><li>✓ Add frameworks</li></ul>
              </div>
            </div>
          )}
        </main>

        <aside className="sidebar-right">
          <div className="action-card">
            <h3>🚀 Next Steps</h3>
            <ol><li>Review tips</li><li>Edit resume</li><li>Re-upload</li></ol>
          </div>
          <div className="tip-card">
            <h3>💡 Tip</h3>
            <p>Add keywords from job postings!</p>
          </div>
        </aside>
      </div>

      <section className="faqs-section">
        <h2>FAQ</h2>
        {[
          { q: 'What is ATS?', a: 'Software that parses resumes' },
          { q: 'How to improve?', a: 'Add missing keywords and sections' },
        ].map((f, i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
              <span>{f.q}</span>
              <span>{expandedFaq === i ? '−' : '+'}</span>
            </button>
            {expandedFaq === i && <div className="faq-answer">{f.a}</div>}
          </div>
        ))}
      </section>

      <footer className="results-footer"><p>© 2026 ATS Ecosystem</p></footer>
    </div>
  );
}