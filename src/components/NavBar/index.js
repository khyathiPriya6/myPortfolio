import React from 'react';
import './index.css';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust this value based on your navbar height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <HashLink 
          smooth 
          to="#home" 
          scroll={scrollWithOffset}
          className="navbar-logo"
        >
          KP
        </HashLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <HashLink 
              smooth 
              to="#home"
              scroll={scrollWithOffset}
              className="nav-links"
            >
              Home
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink 
              smooth 
              to="#about"
              scroll={scrollWithOffset}
              className="nav-links"
            >
              About
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink 
              smooth 
              to="#experience"
              scroll={scrollWithOffset}
              className="nav-links"
            >
              Experience
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink 
              smooth 
              to="#projects"
              scroll={scrollWithOffset}
              className="nav-links"
            >
              Projects
            </HashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
