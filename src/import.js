import React from 'react';

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

export default JobDescriptionInput; 