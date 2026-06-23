import React, { useState } from 'react';
import './ResultsPage.css';

function ResultsPage({ result, fileName, onBack }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const categories = result.categories || {};
  const overallScore = result.atsScore;

  const recommendations = {
    essentials: {
      title: 'Contact Information',
      tips: [
        categories.essentials >= 75 
          ? '✅ Your contact details are complete and prominent' 
          : '⚠️ Add or improve: Email, Phone, LinkedIn, GitHub URLs',
        'Make sure your phone number is clearly visible at the top',
        'Include a professional LinkedIn profile link',
        'Add GitHub/Portfolio if applicable to the role',
      ],
    },
    sections: {
      title: 'Resume Structure',
      tips: [
        categories.sections >= 75
          ? '✅ All major sections present and well-organized'
          : '⚠️ Add missing sections: Experience, Education, Skills',
        'Use clear section headers: EXPERIENCE, EDUCATION, SKILLS',
        'Keep sections organized with consistent formatting',
        'Use bullet points for easy scanning',
      ],
    },
    technical: {
      title: 'Technical Skills',
      tips: [
        categories.technical >= 75
          ? '✅ Strong technical keyword coverage'
          : '⚠️ Add relevant tech keywords: Programming languages, frameworks, tools',
        'List specific technologies: JavaScript, Python, React, Node.js',
        'Include tools: Git, Docker, AWS, Kubernetes',
        'Add frameworks and libraries relevant to your target role',
      ],
    },
    hrRedFlags: {
      title: 'Soft Skills & HR Keywords',
      tips: [
        categories.hrRedFlags >= 75
          ? '✅ Good soft skills coverage detected'
          : '⚠️ Add soft skills: Leadership, Communication, Teamwork, Problem-solving',
        'Highlight leadership experience in project/team contexts',
        'Use action words: Led, Managed, Collaborated, Spearheaded',
        'Quantify achievements with metrics and results',
      ],
    },
    seniority: {
      title: 'Career Level & Progression',
      tips: [
        categories.seniority >= 50
          ? '✅ Clear seniority markers detected'
          : '⚠️ Add role progression: Senior, Lead, Manager, Director titles',
        'Show career growth with increasing responsibilities',
        'Highlight promotions and expanded roles',
        'Demonstrate impact at different seniority levels',
      ],
    },
    discrimination: {
      title: 'Safety & Compliance Check',
      tips: [
        categories.discrimination === 0
          ? '✅ No age/gender/religion markers detected - Excellent!'
          : '⚠️ Remove personal info: Age, Photo, Marital status, Religion',
        'Avoid phrases like "Recent graduate" or dates beyond 10 years',
        'Don\'t include a photo on your resume',
        'Focus on skills and achievements, not personal characteristics',
      ],
    },
  };

  const faqs = [
    {
      q: 'What is an ATS and why does it matter?',
      a: 'An Applicant Tracking System (ATS) is software that parses resumes and automatically ranks candidates. 75%+ of Fortune 500 companies use ATS. Your resume must be ATS-optimized to even be seen by recruiters.',
    },
    {
      q: 'How is my ATS score calculated?',
      a: 'Your score is based on keyword matching, section structure, formatting, content completeness, and compliance. We analyze essential contact info, sections, technical skills, soft skills, career progression, and safety.',
    },
    {
      q: 'How can I improve my score quickly?',
      a: 'Follow the recommendations above. Add missing keywords, improve structure, use standard formatting, include all sections, add soft skills, and ensure no discrimination-risk content.',
    },
    {
      q: 'What score do I need to pass ATS screening?',
      a: 'Most recruiters set a 70-75% threshold. A score of 80+ significantly increases your chances of being reviewed by a human recruiter. Aim for 85+!',
    },
    {
      q: 'Should I customize my resume for each job?',
      a: 'Absolutely! Mirror keywords from the job description while staying truthful. This is the #1 way to improve your ATS score for specific positions. You can boost your score by 20-30% this way!',
    },
    {
      q: 'What resume format works best for ATS?',
      a: 'Use standard fonts (Arial, Calibri), simple formatting, no tables/graphics, single column layout. Save as PDF or DOCX. Avoid creative designs, colored backgrounds, and complex layouts.',
    },
  ];

  const handleDownload = () => {
    const text = `ATS FRIENDLY ECOSYSTEM - ANALYSIS REPORT\n\n`;
    const report = text + `Overall Score: ${overallScore}/100\n\n` +
      `Categories:\n` +
      `- Essentials: ${categories.essentials || 0}%\n` +
      `- Sections: ${categories.sections || 0}%\n` +
      `- Technical: ${categories.technical || 0}%\n` +
      `- Soft Skills: ${categories.hrRedFlags || 0}%\n` +
      `- Safety: ${categories.discrimination || 0}%\n` +
      `- Seniority: ${categories.seniority || 0}%\n\n` +
      `File: ${fileName}\n` +
      `Generated: ${new Date().toLocaleString()}\n\n` +
      `Follow the recommendations above to improve your ATS score!`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', 'ATS_Report_' + new Date().getTime() + '.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#10B981';
    if (score >= 50) return '#F97316';
    return '#EF4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="results-page">
      {/* Header */}
      <div className="results-header">
        <button className="btn-back" onClick={onBack}>← Back to Upload</button>
        <h1>Your ATS Analysis Report</h1>
        <p className="results-subtitle">Professional recommendations to optimize your resume</p>
      </div>

      {/* Main Grid Layout */}
      <div className="results-container">
        
        {/* LEFT SIDEBAR - Score Breakdown */}
        <aside className="sidebar-left">
          <div className="score-card-main">
            <div className="score-circle-large">
              <span className="score-number" style={{ color: getScoreColor(overallScore) }}>
                {overallScore}
              </span>
              <span className="score-total">/100</span>
            </div>
            <p className="score-status">{getScoreLabel(overallScore)}</p>
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
                  <span className="category-icon">{icon}</span>
                  <div className="category-label">{label}</div>
                </div>
                <div className="category-bar">
                  <div
                    className="category-fill"
                    style={{
                      width: `${categories[key] || 0}%`,
                      backgroundColor: getScoreColor(categories[key] || 0),
                    }}
                  ></div>
                </div>
                <div className="category-percent">{categories[key] || 0}%</div>
              </div>
            ))}
          </div>

          <button className="btn-download" onClick={handleDownload}>
            ⬇️ Download Report
          </button>
        </aside>

        {/* CENTER - Main Content */}
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
                <h3>Resume Preview</h3>
                <p>Recommended keywords:</p>
                <div className="keywords-list">
                  <span className="keyword-tag">JavaScript</span>
                  <span className="keyword-tag">React</span>
                  <span className="keyword-tag">Leadership</span>
                  <span className="keyword-tag">Problem Solving</span>
                  <span className="keyword-tag">Email</span>
                  <span className="keyword-tag">LinkedIn</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="recommendations-grid">
              {Object.entries(recommendations).map(([key, rec]) => (
                <div key={key} className="recommendation-card">
                  <div className="rec-header">
                    <h3>{rec.title}</h3>
                    <div className="rec-score" style={{ backgroundColor: getScoreColor(categories[key] || 0) }}>
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

        {/* RIGHT SIDEBAR - Actions */}
        <aside className="sidebar-right">
          <div className="action-card">
            <h3>🚀 Next Steps</h3>
            <ol className="action-list">
              <li>Review all recommendations</li>
              <li>Edit your resume</li>
              <li>Add missing keywords</li>
              <li>Re-upload to verify</li>
              <li>Customize for jobs</li>
              <li>Submit with confidence!</li>
            </ol>
          </div>

          <div className="tip-card">
            <h3>💡 Pro Tip</h3>
            <p>Mirror keywords from job descriptions. You can boost your ATS score by 20-30% with smart customization!</p>
          </div>

          <div className="score-info-card">
            <h3>📊 Score Guide</h3>
            <div className="score-guide">
              <div className="guide-item">
                <span className="guide-color" style={{ backgroundColor: '#10B981' }}></span>
                <span>80+ = Excellent</span>
              </div>
              <div className="guide-item">
                <span className="guide-color" style={{ backgroundColor: '#F97316' }}></span>
                <span>50-79 = Good</span>
              </div>
              <div className="guide-item">
                <span className="guide-color" style={{ backgroundColor: '#EF4444' }}></span>
                <span>&lt;50 = Needs Work</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FAQs Section */}
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

      {/* Footer */}
      <footer className="results-footer">
        <p>© 2026 ATS Friendly Ecosystem | Making resumes ATS-optimized, one CV at a time</p>
      </footer>
    </div>
  );
}

export default ResultsPage;