const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const dataPath = path.join(projectRoot, 'src', 'data', 'question.json');

const MAP = {
  mathematics: ['mathematics', 'Mathematics'],
  english: ['english', 'English'],
  civicEducation: ['civicEducation', 'civic_education', 'civic'],
  securityEducation: ['securityEducation', 'security_education', 'security'],
  socialStudies: ['socialStudies', 'social_studies', 'social'],
  businessStudies: ['businessStudies', 'business', 'business_studies'],
  culturalCreativeArts: ['culturalCreativeArts', 'cultural_creative_arts', 'cultural_and_creative_art', 'cultural_creative_arts'],
  agriculture: ['agriculture'],
  homeEconomics: ['homeEconomics', 'home_economics'],
  crs: ['crs', 'crk', 'CRS', 'Crk'],
  basicScience: ['basicScience', 'science', 'Basic Science', 'basic_science'],
  basicTechnology: ['basicTechnology', 'technology', 'basicTechnology', 'basic_technology'],
  physicalAndHealthEducation: ['physicalAndHealthEducation', 'physicalHealthEducation', 'physical_and_health_education'],
  informationTechnology: ['informationTechnology', 'computerScience', 'computer_science', 'information_technology']
};

function findFirst(obj, variants) {
  for (const v of variants) if (Object.prototype.hasOwnProperty.call(obj, v)) return obj[v];
  return [];
}

function normalizeGrade(rawGrade = {}) {
  const out = {};
  for (const key of Object.keys(MAP)) {
    out[key] = findFirst(rawGrade, MAP[key]) || [];
  }
  return out;
}

function run() {
  if (!fs.existsSync(dataPath)) {
    console.error('question.json not found at', dataPath);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const backupPath = dataPath + '.bak.' + Date.now();
  fs.writeFileSync(backupPath, JSON.stringify(raw, null, 2), 'utf8');
  console.log('Backup written to', backupPath);

  const out = { general: raw.general || {} };
  ['jss1', 'jss2', 'jss3'].forEach((grade) => {
    out[grade] = normalizeGrade(raw[grade] || {});
  });

  fs.writeFileSync(dataPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('question.json updated with normalized subject keys');
}

run();
