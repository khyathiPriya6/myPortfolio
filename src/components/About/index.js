import React from 'react';
import './index.css';

const About = () => {
  return (
    <section id="about" className="about-container section" aria-labelledby="about-heading">
      <div className="about-content">
        <div className="about-intro">
          <div className="section-heading"><p className="eyebrow">About me</p><h2 id="about-heading">An engineer.<br />Always a learner.</h2></div>
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


      </div>
    </section>
  );
};

export default About;
