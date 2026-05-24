import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./pages/home";
import AddStudentScreen from "./pages/addStudent";
import StudentsScreen from "./pages/students";
import StudentDetailsScreen from "./pages/studentDetails";
import ExamModeScreen from "./pages/examMode";
import BeceIntroScreen from "./pages/beceIntro";
import BeceExamScreen from "./pages/beceExam";
import BeceResultsScreen from "./pages/beceResults";
import LandingPage from "./Components/QuizApp/LandingPage";
import QuizSelection from "./Components/QuizApp/QuizSelection";
import QuizInterface from "./Components/QuizApp/QuizInterface";
import ResultsPage from "./Components/QuizApp/ResultsPage";
import studentsStore from "./store/studentsStore";

function App() {
  const { loadStudentsFromStorage } = studentsStore();
  useEffect(() => { loadStudentsFromStorage(); }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomeScreen />} />
        <Route path="/students"    element={<StudentsScreen />} />
        <Route path="/add-student" element={<AddStudentScreen />} />
        <Route path="/student/:id" element={<StudentDetailsScreen />} />
        {/* Quiz flow */}
        <Route path="/quiz_app"    element={<LandingPage />} />
        <Route path="/exam-mode"   element={<ExamModeScreen />} />
        {/* Practice mode */}
        <Route path="/categories"  element={<QuizSelection />} />
        <Route path="/quiz"        element={<QuizInterface />} />
        <Route path="/results"     element={<ResultsPage />} />
        {/* BECE mock mode */}
        <Route path="/bece-intro"  element={<BeceIntroScreen />} />
        <Route path="/bece-exam"   element={<BeceExamScreen />} />
        <Route path="/bece-results" element={<BeceResultsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
