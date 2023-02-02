import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResumeBuilder from "./Components/ResumeBuilder/ResumeBuilder.js";
import GenerateResume from "./Components/GenerateResume/GenerateResume.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ResumeBuilder />}></Route>
        <Route exact path="/build-resume" element={<GenerateResume />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
