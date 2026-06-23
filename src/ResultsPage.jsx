import React, { useState } from 'react';
import './ResultsPage.css';

export default function ResultsPage({ result, fileName, onBack }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const categories = result?.categories || {};
  const score = result?.atsScore || 0;

  const recommendations = {
    essentials: {
      title: 'Contact Information',
      tips: categories.essentials >= 75 
        ? ['✓ Email clearly visible', '✓ Phone number included', '✓ LinkedIn/GitHub links present']
        : ['Add email at the top', 'Include phone number', 'Add LinkedIn URL', 'Add GitHub profile link', 'Include portfolio website if available'],
    },
    sections: {
      title: 'Resume Structure',
      tips: categories.sections >= 75
        ? ['✓ All major sections present', '✓ Clear section headers', '✓ Proper organization']
        : ['Add EXPERIENCE section', 'Add EDUCATION section', 'Add SKILLS section', 'Add PROJECTS or PORTFOLIO', 'Use consistent formatting with bold headers'],
    },
    technical: {
      title: 'Technical Skills',
      tips: categories.technical >= 75
        ? ['✓ Strong tech keyword coverage', '✓ Relevant frameworks included', '✓ Tools mentioned']
        : ['List programming languages (Python, JavaScript, Java, etc)', 'Include frameworks (React, Node.js, Django)', 'Add databases (MongoDB, SQL, PostgreSQL)', 'Mention tools (Git, Docker, AWS)', 'Add cloud platforms you know'],
    },
    hrRedFlags: {
      title: 'Soft Skills & Keywords',
      tips: categories.hrRedFlags >= 75
        ? ['✓ Leadership words used', '✓ Communication keywords present', '✓ Teamwork highlighted']
        : ['Use action verbs: Led, Managed, Coordinated', 'Add collaboration keywords', 'Include problem-solving examples', 'Mention communication skills', 'Highlight team achievements'],
    },
    seniority: {
      title: 'Career Progression',
      tips: categories.seniority >= 50
        ? ['✓ Career growth shown', '✓ Role progression visible']
        : ['Show career progression from junior to senior', 'Add Senior/Lead/Manager titles if applicable', 'Highlight promotions', 'Show increased responsibilities', 'Demonstrate impact at each level'],
    },
    discrimination: {
      title: 'Safety & Compliance',
      tips: categories.discrimination === 0
        ? ['✓ No personal information included', '✓ Legally safe format']
        : ['Remove date of birth', 'Remove photo/passport', 'Remove marital status', 'Remove nationality/religion', 'Focus on skills only'],
    },
  };

  const faqs = [
    {
      q: 'What makes an ATS-friendly resume?',
      a: 'An ATS-friendly resume uses standard fonts, simple formatting without tables/graphics, clear section headers, and relevant keywords. It should be readable by automated systems and recruiters.'
    },
    {
      q: 'How much should I customize my resume?',
      a: 'Customize for each job! Mirror keywords from the job description into your resume. This can boost your ATS score by 20-30%. Use the same terminology as the job posting.'
    },
    {
      q: 'What are the best keywords to include?',
      a: 'Include keywords from the job description, industry-specific terms, technologies you know, and soft skills like "leadership", "communication", "problem-solving", "teamwork".'
    },
    {
      q: 'How long should my resume be?',
      a: 'Ideally 1-2 pages. One page for entry-level, up to two for experienced professionals. ATS systems prefer concise, well-organized documents.'
    },
    {
      q: 'Should I use a resume template?',
      a: 'Yes, use simple templates with standard formatting. Avoid fancy designs, graphics, tables, or multi-column layouts that ATS systems struggle to parse.'
    },
  ];

  return (
    <div className="results-page">
      <div className="results-header">
        <button className="btn-back" onClick={onBack}>← Back to Upload</button>
        <h1>Your ATS Analysis Report</h1>
        <p className="results-subtitle">Get actionable recommendations to improve your resume</p>
      </div>

      <div className="results-container">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar-left">
          <div className="score-card-main">
            <div className="score-circle-large">
              <span className="score-number" style={{
                color: score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
              }}>
                {score}
              </span>
              <span className="score-total">/100</span>
            </div>
            <p className="score-status">
              {score >= 75 ? '✓ Excellent' : score >= 50 ? '⚠ Good' : '✗ Needs Work'}
            </p>
            <p className="score-filename">📄 {fileName}</p>
          </div>

          <div className="category-scores">
            {Object.entries({
              essentials: { label: 'Essentials', icon: '📋' },
              sections: { label: 'Sections', icon: '📑' },
              technical: { label: 'Technical', icon: '⚙️' },
              hrRedFlags: { label: 'Soft Skills', icon: '🤝' },
              discrimination: { label: 'Safety', icon: '🔒' },
              seniority: { label: 'Seniority', icon: '📈' },
            }).map(([key, { label, icon }]) => (
              <div key={key} className="category-item">
                <div className="category-header">
                  <span>{icon}</span>
                  <div className="category-label">{label}</div>
                </div>
                <div className="category-bar">
                  <div
                    className="category-fill"
                    style={{ width: `${categories[key] || 0}%` }}
                  />
                </div>
                <div className="category-percent">{categories[key] || 0}%</div>
              </div>
            ))}
          </div>

          <button className="btn-download" onClick={() => {
            const report = `ATS ANALYSIS REPORT\n\nScore: ${score}/100\n\nEssentials: ${categories.essentials || 0}%\nSections: ${categories.sections || 0}%\nTechnical: ${categories.technical || 0}%\nSoft Skills: ${categories.hrRedFlags || 0}%\nSafety: ${categories.discrimination || 0}%\nSeniority: ${categories.seniority || 0}%\n\nRecommendations provided above.\nGenerated from ATS Friendly Ecosystem`;
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
            element.setAttribute('download', `ATS_Report_${fileName}.txt`);
            element.click();
          }}>
            ⬇️ Download Report
          </button>
        </aside>

        {/* CENTER CONTENT */}
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
              💡 Recommendations
            </button>
          </div>

          {showPreview ? (
            <div className="resume-preview-section">
              <div className="preview-placeholder">
                <div className="placeholder-icon">📄</div>
                <h3>Resume Content</h3>
                <p>{fileName}</p>
                <p style={{ marginTop: '16px', fontSize: '0.95rem' }}>
                  Recommended Keywords Found:
                </p>
                <div className="keywords-list">
                  <span className="keyword-tag">Email</span>
                  <span className="keyword-tag">Phone</span>
                  <span className="keyword-tag">LinkedIn</span>
                  <span className="keyword-tag">Experience</span>
                  <span className="keyword-tag">Education</span>
                  <span className="keyword-tag">Skills</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="recommendations-grid">
              {Object.entries(recommendations).map(([key, rec]) => (
                <div key={key} className="recommendation-card">
                  <div className="rec-header">
                    <h3>{rec.title}</h3>
                    <div className="rec-score" style={{
                      background: categories[key] >= 75 ? '#10b981' : categories[key] >= 50 ? '#f59e0b' : '#ef4444'
                    }}>
                      {categories[key] || 0}%
                    </div>
                  </div>
                  <ul className="rec-tips">
                    {rec.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="sidebar-right">
          <div className="action-card">
            <h3>🚀 Action Plan</h3>
            <ol className="action-list">
              <li>Review recommendations above</li>
              <li>Add missing sections</li>
              <li>Include relevant keywords</li>
              <li>Improve formatting</li>
              <li>Re-upload & verify</li>
            </ol>
          </div>

          <div className="tip-card">
            <h3>💡 Pro Tip</h3>
            <p>Copy keywords from job descriptions and mirror them in your resume. This is the #1 way to improve your ATS score!</p>
          </div>
        </aside>
      </div>

      {/* FAQs */}
      <section className="faqs-section">
        <h2>Frequently Asked Questions</h2>
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

      {/* FOOTER */}
      <footer className="results-footer">
        <p>© 2026 ATS Friendly Ecosystem | Developed by Subhagata Sinha</p>
      </footer>
    </div>
  );
}