import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createChaosPoints } from '../ChaosTriangle/chaosMath';
import './index.css';

const ChaosTriangle = lazy(() => import('../ChaosTriangle'));
const previewPath = createChaosPoints(0.5, 1800).map(({ x, y }) =>
  `M${(25 + x * 270).toFixed(1)},${(25 + y * 234).toFixed(1)}h.6`).join('');

export default function Home() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  function keepFocusInPlayground(event) {
    if (event.key !== 'Tab') return;
    const controls = Array.from(dialogRef.current.querySelectorAll('button:not(:disabled), a[href]'));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <header id="home" className="home-container">
      <div className="home-content">
        <p className="eyebrow">Software engineer · Curious by nature</p>
        <h1>Hello, I’m<br /><span>Khyathi Priya.</span></h1>
        <p className="home-title">Thoughtful code.<br />Meaningful experiences.</p>
        <p className="description">A software engineer at Visa, passionate about building technology that improves everyday lives. I care about clean code, simple interfaces, and the possibilities in a new idea.</p>
        <div className="cta-buttons">
          <a href="#projects" className="button primary">View My Work</a>
          <a href="#about" className="button secondary">More about me</a>
        </div>
        <p className="home-note">Engineering with intention. Exploring with curiosity.</p>
      </div>
      <div className="hero-experiment">
        <button ref={triggerRef} className="triangle-trigger" onClick={() => setOpen(true)} aria-label="Open Chaos Triangle playground" aria-haspopup="dialog">
          <span className="eyebrow">A little math. A little curiosity.</span>
          <svg className="triangle-preview" viewBox="0 0 320 290" aria-hidden="true">
            <path className="triangle-outline" d="M160 25L25 259H295Z" />
            <path className="triangle-points" d={previewPath} />
            <circle cx="160" cy="25" r="3" /><circle cx="25" cy="259" r="3" /><circle cx="295" cy="259" r="3" />
          </svg>
          <span className="experiment-name">Order, from randomness.</span>
          <span className="experiment-link">Explore the Chaos Triangle <span aria-hidden="true">＋</span></span>
        </button>
        <p>Haskell roots. A Canvas playground.</p>
      </div>
      {open && <dialog ref={dialogRef} className="playground-dialog" aria-label="Chaos Triangle playground" onKeyDown={keepFocusInPlayground} onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
        <div className="dialog-toolbar"><span>THE CREATIVE CODING LAB</span><button autoFocus type="button" className="button secondary" onClick={() => setOpen(false)}>Close playground</button></div>
        <Suspense fallback={<p className="loading" role="status">Loading the playground…</p>}><ChaosTriangle /></Suspense>
      </dialog>}
    </header>
  );
}
