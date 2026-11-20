import React from 'react';
import './index.css';
import { FaGithub } from 'react-icons/fa';

const Home = () => (
  <header id="home" className="home-container">
    <div className="home-content">
      <p className="greeting">Hello, I'm</p>
      <h1 className="name">Khyathi Priya</h1>
      <h2 className="title">Software Engineer • Creative Coder</h2>
      <p className="description">
        I build thoughtful software experiences and love exploring the
        unexpected things that happen when mathematics, art, and code meet.
      </p>
      <div className="cta-buttons">
        <a href="#chaos" className="cta-button primary">Explore my experiment ↓</a>
        <a href="#projects" className="cta-button secondary">View my work ↗</a>
      </div>
      <div className="social-links">
        <a href="https://github.com/khyathiPriya6" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub profile">
          <FaGithub className="social-icon" />
        </a>
      </div>
    </div>
  </header>
);

export default Home;
