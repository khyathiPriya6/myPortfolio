import { useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import EngineeringPractice from './components/EngineeringPractice';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';

function Portfolio() {
  const mainRef = useRef(null);
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    mainRef.current.querySelectorAll('.reveal').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main" tabIndex={-1} ref={mainRef}><Home />{[About, Skills, Experience, EngineeringPractice, Projects].map(Component => <div className="reveal" key={Component.name}><Component /></div>)}</main><Footer /></>;
}
export default function App() {
  return <Router><Routes><Route path="/" element={<Portfolio />} />{['home', 'about', 'skills', 'experience', 'practice', 'projects', 'contact'].map(section => <Route key={section} path={`/${section}`} element={<Navigate to={`/#${section}`} replace />} />)}<Route path="*" element={<Navigate to="/" replace />} /></Routes></Router>;
}
