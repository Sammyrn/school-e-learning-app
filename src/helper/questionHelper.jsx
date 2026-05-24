import questionsData from "../data/question.json";
import beceData from "../data/bece_questions.json";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Normalise class string → json key
const classKey = (cls) => cls?.toLowerCase().replace(/\s/g, '') || 'jss1';

// BECE subject keys with display metadata
export const BECE_SUBJECTS = [
  { id: 'mathematics',      name: 'Mathematics',       emoji: '🔢', color: 'bg-purple-100 border-purple-300 text-purple-700' },
  { id: 'basicScience',     name: 'Basic Science',     emoji: '🔬', color: 'bg-green-100 border-green-300 text-green-700'   },
  { id: 'basicTechnology',  name: 'Basic Technology',  emoji: '🛠️', color: 'bg-sky-100 border-sky-300 text-sky-700'         },
  { id: 'crs',              name: 'C.R.S',             emoji: '✝️', color: 'bg-indigo-100 border-indigo-300 text-indigo-700'},
  { id: 'agriculturalScience', name: 'Agricultural Science', emoji: '🌱', color: 'bg-lime-100 border-lime-300 text-lime-700'},
  { id: 'homeEconomics',    name: 'Home Economics',    emoji: '🍳', color: 'bg-rose-100 border-rose-300 text-rose-700'      },
  { id: 'businessStudies',  name: 'Business Studies',  emoji: '💼', color: 'bg-yellow-100 border-yellow-300 text-yellow-700'},
];

// Practice mode – 15 random questions for a class+subject
export const getPracticeQuestions = (cls, subject) => {
  const key = classKey(cls);
  const gradeData = questionsData[key] || questionsData['jss1'];
  // agriculture key varies
  const pool = gradeData[subject] || gradeData['agriculture'] || gradeData['agriculturalScience'] || [];
  if (!pool.length) return [];
  return shuffle(pool).slice(0, 15);
};

// BECE mock – 40 questions per subject from full pool
export const getBECEQuestions = (subjectId) => {
  const pool = beceData[subjectId] || [];
  if (!pool.length) return [];
  return shuffle(pool).slice(0, 40);
};

export default getPracticeQuestions;
