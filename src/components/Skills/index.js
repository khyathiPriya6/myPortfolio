const skills = { Languages: ['Python', 'JavaScript', 'Java', 'Haskell'], Frameworks: ['Spring Boot', 'React.js', 'Node.js'], 'Tools & technologies': ['Git', 'MongoDB', 'Figma', 'Postman'] };
export default function Skills() {
  return <section id="skills" className="section" aria-labelledby="skills-heading">
    <div className="section-heading"><p className="eyebrow">The toolkit</p><h2 id="skills-heading">Skills & technologies.</h2><p>Technologies I’ve worked with, and a foundation to keep learning.</p></div>
    <div className="skills-wrapper">{Object.entries(skills).map(([category, items]) => <div className="skill-category" key={category}><h3>{category}</h3><ul className="skills-grid">{items.map(skill => <li className="skill-tag" key={skill}>{skill}</li>)}</ul></div>)}</div>
  </section>;
}
