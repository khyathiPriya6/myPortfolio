import React from 'react';
import './index.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="greeting">Hello, I'm</h1>
        <h2 className="name">Khyathi Priya</h2>
        <h3 className="title">Software Engineer | Tech Enthusiast</h3>
        <p className="description">
          Curious about tech that improves everyday lives. A software engineer at Visa, 
          passionate about building meaningful tech. I'm a lifelong learner who loves clean code, 
          simple UIs, and exploring new ideas.
        </p>
        <div className="cta-buttons">
          <a href="#contact" className="cta-button primary">Get In Touch</a>
          <a href="#projects" className="cta-button secondary">View My Work</a>
        </div>
        <div className="social-links">
          <a href="https://github.com/khyathiPriya6" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub className="social-icon" />
          </a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedinIn className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
