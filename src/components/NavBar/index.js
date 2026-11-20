import { useState } from 'react';
import './index.css';
const links = [['about', 'About'], ['skills', 'Skills'], ['experience', 'Experience'], ['practice', 'Practice'], ['projects', 'Projects']];
export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  return <nav className="navbar" aria-label="Main navigation">
    <div className="navbar-container">
      <a href="#home" className="navbar-logo" aria-label="Khyathi Priya — home" onClick={() => setExpanded(false)}>kp<span>.</span></a>
      <button className="menu-toggle" aria-expanded={expanded} aria-controls="nav-menu" onClick={() => setExpanded(!expanded)} onKeyDown={e => { if (e.key === 'Escape') setExpanded(false); }}>Menu <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
      <ul id="nav-menu" className={`nav-menu ${expanded ? 'is-open' : ''}`} onKeyDown={e => { if (e.key === 'Escape') { setExpanded(false); e.currentTarget.previousElementSibling.focus(); } }}>
        {links.map(([id, label]) => <li key={id}><a href={`#${id}`} onClick={() => setExpanded(false)}>{label}</a></li>)}
        <li><a href="#contact" className="nav-contact" onClick={() => setExpanded(false)}>Let’s connect</a></li>
      </ul>
    </div>
  </nav>;
}
