import React, { useState } from 'react';
import { Upload, FileText, Zap, CheckCircle } from 'lucide-react';

// ResumeUpload component
function ResumeUpload({ onFileChange }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        fontSize: 18, 
        fontWeight: 600, 
        marginBottom: 12, 
        color: '#1A120B' 
      }}>
        <Upload size={20} />
        Upload Resume (PDF)
      </label>
      <input
        type="file"
        accept="application/pdf"
        onChange={e => onFileChange(e.target.files[0])}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px dashed #3C2A21',
          borderRadius: 12,
          backgroundColor: '#E5E5CB',
          color: '#1A120B',
          fontSize: 16,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  );
}

// JobDescriptionInput component
function JobDescriptionInput({ value, onChange }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        fontSize: 18, 
        fontWeight: 600, 
        marginBottom: 12, 
        color: '#1A120B' 
      }}>
        <FileText size={20} />
        Job Description
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={6}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px solid #3C2A21',
          borderRadius: 12,
          backgroundColor: '#E5E5CB',
          color: '#1A120B',
          fontSize: 16,
          resize: 'vertical',
          fontFamily: 'inherit',
          lineHeight: 1.5
        }}
        placeholder="Paste the job description here..."
      />
    </div>
  );
}

// MatchResult component
function MatchResult({ result }) {
  if (!result) return null;
  
  const scoreColor = result.score >= 0.7 ? '#22c55e' : result.score >= 0.5 ? '#f59e0b' : '#ef4444';
  
  return (
    <div style={{
      marginTop: 32,
      padding: 24,
      backgroundColor: '#D5CEA3',
      borderRadius: 16,
      borderLeft: `4px solid ${scoreColor}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 12, 
        marginBottom: 16 
      }}>
        <CheckCircle size={24} style={{ color: scoreColor }} />
        <h3 style={{ 
          fontSize: 24, 
          fontWeight: 700, 
          color: '#1A120B', 
          margin: 0 
        }}>
          Match Score: {(result.score * 100).toFixed(1)}%
        </h3>
      </div>
      <div style={{ 
        fontSize: 16, 
        lineHeight: 1.6, 
        color: '#1A120B' 
      }}>
        {result.details}
      </div>
    </div>
  );
}

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!resumeFile || !jobDescription) return;
    setLoading(true);
    setMatchResult(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    const res = await fetch('http://localhost:5000/match', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMatchResult(data);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#E5E5CB',
      padding: '48px 16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        backgroundColor: '#D5CEA3',
        padding: 40,
        borderRadius: 24,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#1A120B',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12
          }}>
            <FileText size={36} />
            Resume Parser
          </h1>
          <p style={{
            fontSize: 18,
            color: '#3C2A21',
            margin: 0,
            opacity: 0.8
          }}>
            Upload your resume and paste a job description to get an AI-powered match score
          </p>
        </div>

        {/* Main Content */}
        <div>
          <ResumeUpload onFileChange={setResumeFile} />
          <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
          
          {/* Match Button */}
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <button 
              onClick={handleMatch} 
              disabled={!resumeFile || !jobDescription || loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: loading ? '#3C2A21' : '#1A120B',
                color: '#E5E5CB',
                padding: '16px 32px',
                fontSize: 18,
                fontWeight: 600,
                border: 'none',
                borderRadius: 12,
                cursor: !resumeFile || !jobDescription || loading ? 'not-allowed' : 'pointer',
                opacity: !resumeFile || !jobDescription || loading ? 0.6 : 1,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (!loading && resumeFile && jobDescription) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 20,
                    height: 20,
                    border: '2px solid #E5E5CB',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Match Resume
                </>
              )}
            </button>
          </div>

          <MatchResult result={matchResult} />
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{
            fontSize: 14,
            color: '#3C2A21',
            opacity: 0.6,
            margin: 0
          }}>
            {/* Powered by AI • Secure & Private Processing */}
          </p>
        </div>
      </div>

      {/* CSS Animation for spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;