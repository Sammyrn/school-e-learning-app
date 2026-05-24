// Normalizes the structure of the questions JSON into a consistent subject key set
const SUBJECT_KEYS = [
  'mathematics',
  'english',
  'civicEducation',
  'securityEducation',
  'socialStudies',
  'businessStudies',
  'culturalCreativeArts',
  'agriculture',
  'homeEconomics',
  'crs',
  'basicScience',
  'basicTechnology',
  'physicalAndHealthEducation',
  'informationTechnology'
];

const VARIANT_MAP = {
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

function findFirstPresent(sourceObj, keys) {
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(sourceObj, k)) return sourceObj[k];
  }
  return [];
}

function normalizeGrade(rawGrade = {}) {
  const normalized = {};
  for (const key of SUBJECT_KEYS) {
    const variants = VARIANT_MAP[key] || [key];
    normalized[key] = findFirstPresent(rawGrade, variants) || [];
  }
  return normalized;
}

export function normalizeQuestions(rawJson = {}) {
  const out = { general: rawJson.general || {} };
  ['jss1', 'jss2', 'jss3'].forEach((grade) => {
    out[grade] = normalizeGrade(rawJson[grade] || {});
  });
  return out;
}

export const SUBJECT_KEYS_LIST = SUBJECT_KEYS;

export default { normalizeQuestions, SUBJECT_KEYS_LIST };
