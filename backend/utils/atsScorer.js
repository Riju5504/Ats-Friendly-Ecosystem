const ATS_KEYWORDS = {
  essentials: [
    'email', 'phone', 'linkedin', 'github', 'address',
  ],
  sections: [
    'experience', 'education', 'skills', 'projects', 'summary',
    'objective', 'certifications', 'achievements', 'internship',
  ],
  hrRedFlags: [
    'communication', 'teamwork', 'leadership', 'problem solving', 'analytical',
  ],
  discrimination: [
    'age', 'gender', 'religion', 'nationality', 'marital',
  ],
  seniority: [
    'senior', 'lead', 'manager', 'director', 'head', 'principal',
  ],
  technical: [
    'javascript', 'python', 'java', 'react', 'node', 'mongodb',
    'sql', 'html', 'css', 'git', 'api', 'agile',
  ],
};

function getCategoryScore(text, keywords) {
  if (!text) return 0;
  const lower = text.toLowerCase();
  const matched = keywords.filter(k => lower.includes(k)).length;
  return Math.round((matched / keywords.length) * 100);
}

function calculateAtsScore(text) {
  if (!text || text.trim().length === 0) return {
    overall: 0,
    essentials: 0,
    sections: 0,
    hrRedFlags: 0,
    discrimination: 0,
    seniority: 0,
    technical: 0,
  };

  const essentials      = getCategoryScore(text, ATS_KEYWORDS.essentials);
  const sections        = getCategoryScore(text, ATS_KEYWORDS.sections);
  const hrRedFlags      = getCategoryScore(text, ATS_KEYWORDS.hrRedFlags);
  const discrimination  = getCategoryScore(text, ATS_KEYWORDS.discrimination);
  const seniority       = getCategoryScore(text, ATS_KEYWORDS.seniority);
  const technical       = getCategoryScore(text, ATS_KEYWORDS.technical);

  // Word length bonus
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  let lengthBonus = 0;
  if (wordCount >= 200) lengthBonus = 10;
  if (wordCount >= 350) lengthBonus = 20;
  if (wordCount >= 500) lengthBonus = 30;

  const keywordScore = Math.round(
    ((essentials + sections + technical) / 3) * 0.7
  );
  const overall = Math.min(keywordScore + lengthBonus, 100);

  return { overall, essentials, sections, hrRedFlags, discrimination, seniority, technical };
}

module.exports = { calculateAtsScore };