const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Resume = require('../models/Resume');
const { calculateAtsScore } = require('../utils/atsScorer');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF, DOC, DOCX files are allowed'));
  },
});

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { originalname, mimetype, buffer } = req.file;

    let extractedText = '';
    try {
      if (mimetype === 'application/pdf') {
        const parsed = await pdfParse(buffer);
        extractedText = parsed.text;
      } else {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      }
    } catch (parseErr) {
      console.warn('Text extraction failed:', parseErr.message);
    }

    // ✅ Now returns full object with all category scores
    const atsScores = calculateAtsScore(extractedText);

    const resume = new Resume({
      fileName: originalname,
      fileType: mimetype,
      fileData: buffer,
      extractedText,
      atsScore: atsScores.overall,   // ✅ save only overall to DB
    });
    await resume.save();

    // ✅ Return all scores to frontend
    res.status(201).json({
      message: 'Resume uploaded and scanned successfully',
      resumeId: resume._id,
      fileName: resume.fileName,
      atsScore: atsScores.overall,
      categories: {
        essentials:     atsScores.essentials,
        sections:       atsScores.sections,
        hrRedFlags:     atsScores.hrRedFlags,
        discrimination: atsScores.discrimination,
        seniority:      atsScores.seniority,
        technical:      atsScores.technical,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.set('Content-Type', resume.fileType);
    res.set('Content-Disposition', `inline; filename="${resume.fileName}"`);
    res.send(resume.fileData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id/score', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).select('atsScore fileName');
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ atsScore: resume.atsScore, fileName: resume.fileName });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;