const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileData: { type: Buffer, required: true },
  extractedText: { type: String, default: '' },
  atsScore: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);