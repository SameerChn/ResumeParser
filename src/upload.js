import React, { useState } from 'react';

// ResumeUpload component
function ResumeUpload({ onFileChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: 'bold' }}>Upload Resume (PDF): </label>
      <input
        type="file"
        accept="application/pdf"
        onChange={e => onFileChange(e.target.files[0])}
        style={{ marginLeft: 8 }}
      />
    </div>
  );
}

// JobDescriptionInput component
function JobDescriptionInput({ value, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: 'bold' }}>Job Description: </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={6}
        style={{ width: '100%', marginTop: 8, resize: 'vertical' }}
        placeholder="Paste the job description here..."
      />
    </div>
  );
}

// MatchResult component
function MatchResult({ result }) {
  if (!result) return null;
  return (
    <div style={{ marginTop: 24, padding: 16, background: '#f6f8fa', borderRadius: 6 }}>
      <h3>Match Score: {(result.score * 100).toFixed(1)}%</h3>
      <div>{result.details}</div>
    </div>
  );
}

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    setMatchResult(null);
    // TODO: Replace with real API call
    setTimeout(() => {
      setMatchResult({ score: 0.85, details: 'Matched skills: Python, NLP, Machine Learning' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, boxShadow: '0 2px 8px #eee', borderRadius: 8 }}>
      <h2>Resume Parser & Job Matcher</h2>
      <ResumeUpload onFileChange={setResumeFile} />
      <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
      <button onClick={handleMatch} disabled={!resumeFile || !jobDescription || loading} style={{ marginTop: 16 }}>
        {loading ? 'Matching...' : 'Match'}
      </button>
      <MatchResult result={matchResult} />
    </div>
  );
}

export default App; 