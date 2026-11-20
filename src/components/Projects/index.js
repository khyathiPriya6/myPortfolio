import { projects } from '../../data/projects';
import { FaGithub } from 'react-icons/fa';
import './index.css';
export default function Projects() {
  return <section id="projects" className="projects-container section" aria-labelledby="projects-heading">
    <div className="section-heading"><p className="eyebrow">Selected work</p><h2 id="projects-heading">Ideas, put into practice.</h2><p>Exploring problems through algorithms, conversation, and code.</p></div>
    <div className="projects-grid">{projects.map(project => <article className="project-card" key={project.title}>
      <p className="eyebrow">{project.category}</p>
      <h3>{project.title}</h3><p className="project-description">{project.description}</p>
      <ul className="project-tech" aria-label={`${project.title} technologies`}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link"><FaGithub aria-hidden="true" /> View {project.title} source</a>
    </article>)}</div>
  </section>;
}
