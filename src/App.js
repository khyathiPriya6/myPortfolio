import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <About />
              <Experience />
              <Projects />
              <Footer />
            </>
          } />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/experience" element={<Navigate to="/#experience" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
