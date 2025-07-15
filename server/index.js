const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();
const upload = multer();
app.use(cors());

function extractKeywords(text) {
  return text
    .toLowerCase()
    .match(/\b[a-zA-Z]{3,}\b/g) // words with at least 3 letters
    ?.filter((word, i, arr) => arr.indexOf(word) === i) || [];
}

app.post('/match', upload.single('resume'), async (req, res) => {
  const jobDescription = req.body.jobDescription || '';
  const fileBuffer = req.file?.buffer;

  if (!fileBuffer) return res.status(400).json({ error: 'No resume uploaded' });

  try {
    const parsed = await pdfParse(fileBuffer);
    const resumeText = parsed.text;

    const jobKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);

    const matched = jobKeywords.filter(word => resumeKeywords.includes(word));
    const score = matched.length / jobKeywords.length;

    res.json({
      score: score || 0,
      details: `Matched skills: ${matched.join(', ')}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
