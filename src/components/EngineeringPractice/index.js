// Grounded in the existing About and Experience content, without new outcome claims.
const practices = [
  ['Clean code, clear intent', 'Combine clean code principles with user-centered design. Aim for solutions that are elegant, practical, and easy to understand.'],
  ['Follow the problem', 'Work from error logs and code to understand root causes. Bring experience with debugging pipelines and real-time log parsing to the investigation.'],
  ['Build together', 'Collaborate across teams, integrate tools into engineering workflows, and guide ideas through technical execution.'],
  ['Keep exploring', 'Continue learning about AI, machine learning, and prompt design, alongside hands-on work with microservices and cloud technologies.'],
];
export default function EngineeringPractice() {
  return <section id="practice" className="section" aria-labelledby="practice-heading"><div className="section-heading"><p className="eyebrow">How I approach the work</p><h2 id="practice-heading">Engineering practice.</h2><p>Good software starts with understanding the problem and the people using it.</p></div><div className="practice-grid">{practices.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>;
}
