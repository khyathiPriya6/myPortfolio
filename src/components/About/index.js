import React from 'react';
import './index.css';
import { FaCode, FaDatabase, FaTools } from 'react-icons/fa';

const About = () => {
  const skills = {
    languages: ['Python', 'JavaScript', 'Java', 'Haskell'],
    frameworks: ['Spring Boot', 'React.js', 'Node.js'],
    tools: ['Git', 'MongoDB', 'Figma', 'Postman']
  };

  const interests = {
    current: ['Artificial Intelligence', 'Machine Learning', 'LLMs & Prompt Design'],
    hobbies: ['Classical dance', 'Journaling & Notion', 'Music']
  };

  return (
    <div id="about" className="about-container">
      <div className="about-content">
        <div className="about-intro">
          <h2 className="about-title">About Me</h2>
          <div className="about-description">
            <p>
              I'm a software engineer at Visa, driven by the desire to create technology that makes 
              a real difference in people's lives. My approach combines clean code principles with 
              user-centered design, always striving to build solutions that are both elegant and practical.
            </p>
            <p>
              As a lifelong learner, I'm constantly exploring new technologies and concepts, 
              particularly in the realms of Artificial Intelligence, Machine Learning, and LLMs & Prompt Design. 
              I believe in the power of technology to solve real-world problems and improve everyday experiences.
            </p>
            <p>
              When I'm not coding, you'll find me practicing classical dance, maintaining my digital journal 
              in Notion, or enjoying music. These creative pursuits help me maintain a balanced perspective 
              and often inspire innovative solutions in my technical work.
            </p>
          </div>
        </div>

        <div className="skills-overview">
          <h3 className="skills-title">🛠️ Technologies I've worked with</h3>
          <div className="skills-wrapper">
            <div className="skill-column">
              <div className="skill-category">
                <FaCode className="skill-icon" />
                <h4>Languages</h4>
                <div className="skills-grid">
                  {skills.languages.map((skill, index) => (
                    <div key={index} className="skill-tag">{skill}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="skill-column">
              <div className="skill-category">
                <FaDatabase className="skill-icon" />
                <h4>Frameworks</h4>
                <div className="skills-grid">
                  {skills.frameworks.map((skill, index) => (
                    <div key={index} className="skill-tag">{skill}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="skill-column">
              <div className="skill-category">
                <FaTools className="skill-icon" />
                <h4>Tools & Tech</h4>
                <div className="skills-grid">
                  {skills.tools.map((skill, index) => (
                    <div key={index} className="skill-tag">{skill}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
