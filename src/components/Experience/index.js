import React from 'react';
import './index.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      period: "June 2025 - Present",
      role: "Software Engineer at Visa",
      responsibilities: [
        "Working on cross-functional projects leveraging GenAI, AWS, and modern cloud technologies.",
        "Collaborating with internal teams to integrate AI-based tools and improve engineering workflows."
      ]
    },
    {
      period: "January 2025 - June 2025",
      role: "Semester Intern at Visa",
      responsibilities: [
        "Worked on a GenAI-powered tool using Spring Boot, StreamIt, and React, integrated with Splunk and Bitbucket.",
        "Developed a solution that analyzes error logs and code to identify root causes precisely.",
        "Enhanced understanding of debugging pipelines, real-time log parsing, and team-driven delivery."
      ]
    },
    {
      period: "May 2024 - July 2024",
      role: "Summer Intern at Visa",
      responsibilities: [
        "Built and deployed microservices using Spring Boot, Angular, and OpenSearch.",
        "Explored GenAI, Postman, and Docker, and learned best practices in solution architecture and code principles"
      ]
    },
    {
      period: "July 2023 - August 2023",
      role: "Mentor at Talent sprint",
      responsibilities: [
        "Served as mentor for a student project within WISE(Women In Software Engineering)",
        "Guided students through ideation, collaboration, and technical execution to meet project milestones."
      ]
    }
  ];

  return (
    <section id="experience" className="experience-container section" aria-labelledby="experience-heading">
      <div className="experience-content">
        <div className="section-heading"><p className="eyebrow">The journey so far</p><h2 id="experience-heading">Experience.</h2><p>Learning, contributing, and building with teams.</p></div>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <FaMapMarkerAlt className="marker-icon" aria-hidden="true" />
              </div>
              <div className="timeline-content">
                <div className="timeline-period">{exp.period}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <ul className="timeline-responsibilities">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
