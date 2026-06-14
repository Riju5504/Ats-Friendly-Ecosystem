import React, { useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeBox, setActiveBox] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select a CV file first.');
      return;
    }
    const formData = new FormData();
    formData.append('resume', selectedFile);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const response = await fetch('http://localhost:5000/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setError('Could not connect to backend. Make sure port 5000 is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`app-container ${theme}-theme`}>

      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="mini-theme-icon-btn" type="button">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* Header */}
      <header className="main-header">
        <h1>ATS Friendly Ecosystem</h1>
        <p className="subtitle">Smart Resume Analysis & ATS Optimization Platform</p>
      </header>

      {/* Main Content */}
      <main className="main-content-layout">

        {/* 4 Cards Row */}
        <div className="squares-grid">
          {[
            { id: 1, icon: '💡', title: 'What do you mean by ATS?', close: '▶ Read Wiki' },
            { id: 2, icon: '🔍', title: 'Importance of ATS',        close: '▶ Read Why' },
            { id: 3, icon: '📊', title: 'ATS Score & Industry',     close: '▶ Learn Score' },
            { id: 4, icon: '📰', title: 'Recommendations & News',   close: '▶ Open News' },
          ].map(card => (
            <div
              key={card.id}
              className={`square-card ${activeBox === card.id ? 'active' : ''}`}
              onClick={() => setActiveBox(activeBox === card.id ? 0 : card.id)}
            >
              <div className="square-card-content">
                <div className="icon-badge">{card.icon}</div>
                <h2>{card.title}</h2>
                <span className="read-more-text">
                  {activeBox === card.id ? '▼ Close' : card.close}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Accordion Info Box */}
        {activeBox !== 0 && (
          <div className="details-accordion-box content-fade">
            {activeBox === 1 && (
              <div>
                <h3>What do you mean by ATS?</h3>
                <p>An Applicant Tracking System (ATS) is software that handles recruitment electronically. It parses resume text, strips unreadable design elements, and checks for keywords matching the job description before any recruiter sees the document.</p>
              </div>
            )}
            {activeBox === 2 && (
              <div>
                <h3>Why ATS Matters in Modern Hiring</h3>
                <p>A single job posting can receive thousands of applications. ATS systems instantly rank applicants by score, filtering out unoptimized resumes automatically — making ATS awareness vital for job seekers.</p>
              </div>
            )}
            {activeBox === 3 && (
              <div>
                <h3>ATS Score Mechanics</h3>
                <p>The scoring system checks text-matching density against job profiles. Most Fortune 500 companies set an automated threshold of 75% match rate before forwarding candidates to interviews.</p>
              </div>
            )}
            {activeBox === 4 && (
              <div>
                <h3>Ecosystem Updates & Tips</h3>
                <p>Keep your resume in a standard single-column format. Avoid placing text inside complex tables, graphics, or background vectors to ensure clean ATS parsing.</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Upload Card */}
      <div className="upload-section-wrapper">
        <div className="upload-card">

          {/* Top row */}
          <div className="upload-card-top">
            <div className="upload-card-title-group">
              <div className="upload-card-icon">📄</div>
              <div>
                <h2>Upload Your CV</h2>
                <p className="upload-card-subtitle">Run a full ATS ecosystem scan on your resume</p>
              </div>
            </div>
            <div className="upload-format-badges">
              <span className="format-badge">PDF</span>
              <span className="format-badge">DOC</span>
              <span className="format-badge">DOCX</span>
            </div>
          </div>

          <hr className="upload-divider" />

          {/* Bottom row */}
          <div className="upload-card-bottom">
            <input
              type="file"
              id="cv-file-input"
              accept=".pdf,.doc,.docx"
              className="upload-file-input"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button
              type="button"
              className="btn-analyze"
              onClick={handleAnalyze}
              disabled={isLoading}
            >
              {isLoading ? '⏳ Analyzing...' : '🔍 Analyze Resume'}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>
          )}

          {/* ✅ ADDED — Beautiful Score Card (replaces raw JSON) */}
          {analysisResult && (
            <div className="ats-score-card content-fade">

              <h3 className="ats-score-title">Your Score</h3>

              <div className="ats-score-circle">
                <span
                  className="ats-score-number"
                  style={{
                    color: analysisResult.atsScore >= 75 ? '#48bb78'
                         : analysisResult.atsScore >= 50 ? '#f6ad55'
                         : '#fc8181'
                  }}
                >
                  {analysisResult.atsScore}
                </span>
                <span className="ats-score-total">/100</span>
              </div>

              <p className="ats-score-label">
                {analysisResult.atsScore >= 75 ? '✅ Good Standing'
               : analysisResult.atsScore >= 50 ? '⚠️ Needs Improvement'
               : '❌ Poor — Revamp Needed'}
              </p>

              <div className="ats-score-rows">
                {[
                  { label: 'ATS Essentials',   value: analysisResult.categories?.essentials },
                  { label: 'Sections',         value: analysisResult.categories?.sections },
                  { label: 'Technical Skills', value: analysisResult.categories?.technical },
                  { label: 'HR Red Flags',     value: analysisResult.categories?.hrRedFlags },
                  { label: 'Discrimination',   value: analysisResult.categories?.discrimination },
                  { label: 'Seniority',        value: analysisResult.categories?.seniority },
                ].map((item) => (
                  <div key={item.label} className="ats-score-row">
                    <span className="ats-row-label">{item.label}</span>
                    <span
                      className="ats-row-badge"
                      style={{
                        backgroundColor:
                          item.value >= 75 ? '#1a7a4a'
                        : item.value >= 50 ? '#b45309'
                        : '#b91c1c',
                      }}
                    >
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="ats-score-meta">
                <p>📄 {analysisResult.fileName}</p>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <p>© 2026 ATS Friendly Ecosystem</p>
        <p className="dev-credit">Developed by <span>Subhagata Sinha</span></p>
      </footer>

    </div>
  );
}

export default App;