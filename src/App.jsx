import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AvatarGuide from './AvatarGuide';
import Lesson from './Lesson';
import Quiz from './Quiz';
import Summary from './Summary';
import Badge from './Badge'; // ✅ Use same name here and below

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AvatarGuide />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/badges" element={<Badge />} /> {/* ✅ Match component name */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;