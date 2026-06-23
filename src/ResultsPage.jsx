import React, { useState } from 'react';
import './ResultsPage.css';

function ResultsPage({ result, fileName, onBack }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  if (!result || !result.categories) {
    return <div className="results-page"><p>Error: No results</p></div>;
  }

  const categories = result.categories;
  const overallScore = result.atsScore || 0;

  const faqs = [
    { q: 'What is ATS?', a: 'ATS is software that parses resumes. Most Fortune 500 companies use it.' },
    { q: 'How is score calculated?', a: 'Based on keywords, structure, formatting, and completeness.' },
    { q: 'How to improve?', a: 'Add missing keywords, improve structure, customize for jobs.' },
    { q: 'What score needed?', a: 'Most set 70-75% threshold. 80+ is excellent.' },
    { q: 'Customize resume?', a: 'Yes! Mirror keywords from job description for 20-30% boost.' },
    { q: 'Best format?', a: 'Standard fonts, simple layout, PDF/DOCX. No tables/graphics.' }
  ];

  const handleDownload = () => {
    const report = `ATS ANALYSIS REPORT\n\nScore: ${overallScore}/100\n\nCategories:\n- Essentials: ${categories.essentials || 0}%\n- Sections: ${categories.sections || 0}%\n- Technical: ${categories.technical || 0}%\n- Soft Skills: ${categories.hrRedFlags || 0}%\n- Safety: ${categories.discrimination || 0}%\n- Seniority: ${categories.seniority || 0}%`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', 'ATS_Report.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getColor = (score) => {
    if (score >= 75) return '#10B981';
    if (score >= 50) return '#F97316';
    return '#EF4444';
  };

  const getLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Needs Work';
  };

  const tips = {
    essentials: ['Add email, phone, LinkedIn', 'Include clear contact info at top', 'Add GitHub/Portfolio link'],
    sections: ['Add: Experience, Education, Skills', 'Use clear headers', 'Use bullet points'],
    technical: ['List: JavaScript, Python, React', 'Include: Git, Docker, AWS', 'Add relevant frameworks'],
    hrRedFlags: ['Add: Leadership, Communication', 'Use action words: Led, Managed', 'Quantify achievements'],
    seniority: ['Show career progression', 'Add Senior/Lead/Manager titles', 'Highlight promotions'],
    discrimination: ['No age, gender, religion info', 'No photo, no marital status', 'Focus on skills only']
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h1>Your ATS Report</h1>
        <p className="results-subtitle">Improve your resume with these recommendations</p>
      </div>

      <div className="results-container">
        {/* LEFT */}
        <aside className="sidebar-left">
          <div className="score-card-main">
            <div className="score-circle-large">
              <span className="score-number" style={{ color: getColor(overallScore) }}>
                {overallScore}
              </span>
              <span className="score-total">/100</span>
            </div>
            <p className="score-status">{getLabel(overallScore)}</p>
            <p className="score-filename">📄 {fileName}</p>
          </div>

          <div className="category-scores">
            {[
              { key: 'essentials', label: 'Essentials', icon: '📋' },
              { key: 'sections', label: 'Sections', icon: '📑' },
              { key: 'technical', label: 'Technical', icon: '⚙️' },
              { key: 'hrRedFlags', label: 'Soft Skills', icon: '🤝' },
              { key: 'discrimination', label: 'Safety', icon: '🔒' },
              { key: 'seniority', label: 'Seniority', icon: '📈' },
            ].map(({ key, label, icon }) => (
              <div key={key} className="category-item">
                <div className="category-header">
                  <span>{icon}</span>
                  <div className="category-label">{label}</div>
                </div>
                <div className="category-bar">
                  <div
                    className="category-fill"
                    style={{
                      width: `${categories[key] || 0}%`,
                      backgroundColor: getColor(categories[key] || 0),
                    }}
                  />
                </div>
                <div className="category-percent">{categories[key] || 0}%</div>
              </div>
            ))}
          </div>

          <button className="btn-download" onClick={handleDownload}>
            ⬇️ Download Report
          </button>
        </aside>

        {/* CENTER */}
        <main className="main-content">
          <div className="content-tabs">
            <button
              className={`tab-btn ${showPreview ? 'active' : ''}`}
              onClick={() => setShowPreview(true)}
            >
              📄 Preview
            </button>
            <button
              className={`tab-btn ${!showPreview ? 'active' : ''}`}
              onClick={() => setShowPreview(false)}
            >
              💡 Tips
            </button>
          </div>

          {showPreview ? (
            <div className="resume-preview-section">
              <div className="preview-placeholder">
                <div className="placeholder-icon">📄</div>
                <h3>Keywords Found</h3>
                <div className="keywords-list">
                  <span className="keyword-tag">Email</span>
                  <span className="keyword-tag">Phone</span>
                  <span className="keyword-tag">LinkedIn</span>
                  <span className="keyword-tag">Experience</span>
                  <span className="keyword-tag">Skills</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="recommendations-grid">
              {Object.entries(tips).map(([key, tipList]) => (
                <div key={key} className="recommendation-card">
                  <div className="rec-header">
                    <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                    <div className="rec-score" style={{ backgroundColor: getColor(categories[key] || 0) }}>
                      {categories[key] || 0}%
                    </div>
                  </div>
                  <ul className="rec-tips">
                    {tipList.map((tip, idx) => (
                      <li key={idx}>✓ {tip}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* RIGHT */}
        <aside className="sidebar-right">
          <div className="action-card">
            <h3>🚀 Next Steps</h3>
            <ol className="action-list">
              <li>Review tips above</li>
              <li>Edit your resume</li>
              <li>Add missing keywords</li>
              <li>Re-upload to verify</li>
              <li>Customize for jobs</li>
            </ol>
          </div>

          <div className="tip-card">
            <h3>💡 Pro Tip</h3>
            <p>Mirror keywords from job postings. Boost your score by 20-30%!</p>
          </div>
        </aside>
      </div>

      {/* FAQs */}
      <section className="faqs-section">
        <h2>FAQ</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className="faq-toggle">{expandedFaq === idx ? '−' : '+'}</span>
              </button>
              {expandedFaq === idx && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="results-footer">
        <p>© 2026 ATS Friendly Ecosystem</p>
      </footer>
    </div>
  );
}

export default ResultsPage;