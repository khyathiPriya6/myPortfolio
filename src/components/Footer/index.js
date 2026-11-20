import './index.css';
export default function Footer() {
  return <footer id="contact" className="footer">
    <div className="footer-content"><p className="eyebrow">Keep in touch</p><h2>Let’s build something meaningful.</h2><p>Find my work and ongoing experiments on GitHub.</p><a className="button secondary" href="https://github.com/khyathiPriya6" target="_blank" rel="noopener noreferrer">Connect on GitHub</a><div className="footer-bottom"><p>Designed & built by Khyathi Priya</p><a href="#home">Back to top</a><span>© {new Date().getFullYear()}</span></div></div>
  </footer>;
}
