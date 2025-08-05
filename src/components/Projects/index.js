import React from 'react';
import './index.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and styled with CSS. Features smooth scrolling, interactive components, and a clean design that showcases my work and skills.",
      technologies: ["React", "CSS", "JavaScript"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://yourportfolio.com"
    },
    {
      title: "AI-Powered Chat Application",
      description: "Real-time chat application with AI capabilities for smart message suggestions and content moderation. Integrates with OpenAI's API for enhanced user experience.",
      technologies: ["Node.js", "Socket.io", "OpenAI API", "MongoDB"],
      github: "https://github.com/yourusername/ai-chat",
      live: "https://ai-chat-demo.com"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with features like product catalog, shopping cart, user authentication, and payment integration using Stripe.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      github: "https://github.com/yourusername/ecommerce",
      live: "https://ecommerce-demo.com"
    },
    {
      title: "Task Management System",
      description: "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Redux", "Firebase", "Material-UI"],
      github: "https://github.com/yourusername/task-manager",
      live: "https://task-manager-demo.com"
    }
  ];

  return (
    <div id="projects" className="projects-container">
      <div className="projects-content">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
