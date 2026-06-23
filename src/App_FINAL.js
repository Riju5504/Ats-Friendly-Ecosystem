import React, { useState } from 'react';
import './App.css';
import { analyzeResume } from './api';
import ResultsPage from './ResultsPage';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeBox, setActiveBox] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResultsPage, setShowResultsPage] = useState(false);

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
      const data = await analyzeResume(formData);
      setAnalysisResult(data);
      setShowResultsPage(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackFromResults = () => {
    setShowResultsPage(false);
    setAnalysisResult(null);
    setSelectedFile(null);
    setError(null);
  };

  // Show Results Page after analysis
  if (showResultsPage && analysisResult) {
    return (
      <div className={`app-container ${theme}-theme`}>
        <button onClick={toggleTheme} className="mini-theme-icon-btn" type="button">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <ResultsPage 
          result={analysisResult} 
          fileName={selectedFile?.name || analysisResult.fileName}
          onBack={handleBackFromResults}
        />
      </div>
    );
  }

  // Main Upload Page
  return (
    <div className={`app-container ${theme}-theme`}>

      <button onClick={toggleTheme} className="mini-theme-icon-btn" type="button">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <header className="main-header">
        <h1>ATS Friendly Ecosystem</h1>
        <p className="subtitle">Smart Resume Analysis & ATS Optimization Platform</p>
      </header>

      <main className="main-content-layout">
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

      <div className="upload-section-wrapper">
        <div className="upload-card">

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

          {error && (
            <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>
          )}

        </div>
      </div>

      <footer className="footer-section">
        <p>© 2026 ATS Friendly Ecosystem</p>
        <p className="dev-credit">Developed by <span>Subhagata Sinha</span></p>
      </footer>

    </div>
  );
}

export default App;