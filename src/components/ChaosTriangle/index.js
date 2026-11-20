import React, { useEffect, useRef, useState } from 'react';
import { createChaosPoints, MAX_POINTS, VERTICES } from './chaosMath';
import './index.css';

const SPEEDS = { slow: 100, normal: 320, fast: 1400 };
const INTRO_MS = 1400;
const GITHUB_SOURCE = 'https://github.com/khyathiPriya6/Chaos-Triangle/tree/main/chaosTriangle/app';

function ChaosTriangle() {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const stageRef = useRef(null);
  const driverRef = useRef(null);
  const pausedRef = useRef(false);
  const speedRef = useRef('normal');

  const [mode, setMode] = useState('classic');
  const [speed, setSpeed] = useState('normal');
  const [run, setRun] = useState(0);
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);

  speedRef.current = speed;

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    if (!canvas || !overlay || !stage) return undefined;

    const points = createChaosPoints(mode === 'classic' ? 0.5 : 0.75);
    const contexts = { ink: canvas.getContext('2d'), overlay: overlay.getContext('2d') };
    if (!contexts.ink || !contexts.overlay) return undefined;

    let width = 0;
    let height = 0;
    let geometry = null;
    let visible = true;
    let raf = 0;
    let lastTime = null;
    let elapsed = 0;
    let fractionalCount = 0;
    let painted = 0;
    let lastUpdate = 0;
    let disposed = false;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const startPaused = run === 0 && Boolean(reducedMotion);
    // Reduced motion still needs a visible preview before the user presses Resume.
    if (startPaused) {
      elapsed = INTRO_MS;
      painted = 1200;
      fractionalCount = painted;
    }
    pausedRef.current = startPaused;
    setPaused(startPaused);
    setCount(painted);
    setComplete(false);

    function setupSize() {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const element of [canvas, overlay]) {
        element.width = Math.round(width * dpr);
        element.height = Math.round(height * dpr);
      }
      for (const ctx of [contexts.ink, contexts.overlay]) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      const triangleHeight = Math.min(height * 0.86, width * 0.79 * Math.sqrt(3) / 2);
      const triangleWidth = triangleHeight * 2 / Math.sqrt(3);
      geometry = {
        left: (width - triangleWidth) / 2,
        top: (height - triangleHeight) / 2,
        triangleWidth,
        triangleHeight,
      };
      redraw();
    }

    function toCanvas(point) {
      return {
        x: geometry.left + point.x * geometry.triangleWidth,
        y: geometry.top + point.y * geometry.triangleHeight,
      };
    }

    function drawOutline(progress = 1) {
      const ctx = contexts.ink;
      const screenVertices = VERTICES.map(toCanvas);
      ctx.clearRect(0, 0, width, height);

      // Start with the vertices, then trace the edges one at a time.
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = 'rgba(163, 177, 138, 0.40)';
      for (let side = 0; side < 3; side += 1) {
        const portion = Math.min(1, Math.max(0, progress * 3 - side));
        const from = screenVertices[side];
        const to = screenVertices[(side + 1) % 3];
        if (portion > 0) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(from.x + (to.x - from.x) * portion, from.y + (to.y - from.y) * portion);
          ctx.stroke();
        }
      }
      screenVertices.forEach(({ x, y }, i) => {
        if (progress * 3 + 0.6 < i) return;
        ctx.beginPath();
        ctx.fillStyle = '#fefae0';
        ctx.arc(x, y, 4.4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawPoints(from, to) {
      const ctx = contexts.ink;
      for (let i = from; i < to; i += 1) {
        const point = toCanvas(points[i]);
        ctx.fillStyle = i % 7 === 0 ? 'rgba(254,250,224,.95)' : 'rgba(190,218,164,.91)';
        ctx.fillRect(point.x - 0.75, point.y - 0.75, 1.5, 1.5);
      }
    }

    function highlightPoint() {
      const ctx = contexts.overlay;
      ctx.clearRect(0, 0, width, height);
      if (painted === 0) return;
      const latest = points[painted - 1];
      const dot = toCanvas(latest);
      const vertex = toCanvas(VERTICES[latest.vertexIndex]);
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(vertex.x, vertex.y);
      ctx.strokeStyle = 'rgba(204,213,174,.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#fefae0';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 8, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(254,250,224,.42)';
      ctx.stroke();
    }

    function redraw() {
      if (!geometry) return;
      drawOutline(elapsed < INTRO_MS ? elapsed / INTRO_MS : 1);
      drawPoints(0, painted);
      highlightPoint();
    }

    function wake() {
      if (!disposed && !raf && visible && !document.hidden && !pausedRef.current && painted < MAX_POINTS) {
        raf = requestAnimationFrame(tick);
      }
    }

    function tick(now) {
      raf = 0;
      if (disposed || !visible || document.hidden || pausedRef.current) return;
      const delta = lastTime === null ? 0 : Math.min(now - lastTime, 80);
      lastTime = now;

      if (elapsed < INTRO_MS) {
        elapsed = Math.min(INTRO_MS, elapsed + delta);
        drawOutline(elapsed / INTRO_MS);
      } else {
        fractionalCount = Math.min(MAX_POINTS, fractionalCount + (delta / 1000) * SPEEDS[speedRef.current]);
        const next = Math.min(MAX_POINTS, Math.floor(fractionalCount));
        if (next > painted) {
          drawPoints(painted, next);
          painted = next;
          highlightPoint();
          if (now - lastUpdate > 90 || next === MAX_POINTS) {
            lastUpdate = now;
            setCount(next);
          }
        }
        if (painted === MAX_POINTS) {
          setComplete(true);
          return;
        }
      }
      wake();
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      lastTime = null;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else wake();
    }

    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) wake();
        else stop();
      },
      { threshold: 0.01 },
    );
    observer?.observe(stage);
    document.addEventListener('visibilitychange', onVisibility);
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(setupSize);
    resizeObserver?.observe(stage);
    if (!resizeObserver) window.addEventListener('resize', setupSize);
    setupSize();

    driverRef.current = { wake, stop };
    wake();

    return () => {
      disposed = true;
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', setupSize);
      document.removeEventListener('visibilitychange', onVisibility);
      driverRef.current = null;
    };
  }, [mode, run]);

  function replay() {
    setRun((n) => n + 1);
  }

  function togglePause() {
    if (complete) {
      replay();
      return;
    }
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    if (pausedRef.current) driverRef.current?.stop();
    else driverRef.current?.wake();
  }

  function switchMode(next) {
    if (next === mode) return;
    setMode(next);
  }

  return (
    <section className="chaos-section" id="chaos" aria-labelledby="chaos-heading">
      <div className="chaos-intro">
        <span className="chaos-eyebrow"><span className="chaos-spark" /> CREATIVE CODING / 001</span>
        <h2 id="chaos-heading">A little math. <em>A little chaos.</em></h2>
        <p>
          An experiment inspired by my original Haskell project. Watch a triangle grow
          from just three vertices into a surprising pattern of thousands of points.
        </p>
      </div>

      <div className="chaos-card">
        <div className="chaos-topline">
          <span><span className="chaos-spark" /> THE CHAOS EXPERIMENT</span>
          <span className="chaos-topline-side">HASKELL → JAVASCRIPT CANVAS</span>
        </div>

        <div className="chaos-stage" ref={stageRef} role="img" aria-label="Animated triangle gradually formed from 16,000 points chosen by moving toward randomly selected vertices">
          <canvas ref={canvasRef} aria-hidden="true" />
          <canvas ref={overlayRef} aria-hidden="true" />
          <div className="chaos-stage-hint">
            {complete ? 'Pattern complete · Replay to watch it form again'
              : paused ? 'Paused · Press Resume to continue'
                : count === 0 ? 'Step 1 · Start with three vertices'
                  : 'Step 2 · Move toward a randomly chosen vertex. Repeat.'}
          </div>
        </div>

        <div className="chaos-progress-track" role="progressbar" aria-label="Points drawn" aria-valuemin={0} aria-valuemax={MAX_POINTS} aria-valuenow={count}>
          <div style={{ width: ((count / MAX_POINTS) * 100) + '%' }} />
        </div>

        <div className="chaos-controls">
          <div className="chaos-primary-controls">
            <button type="button" className="chaos-action chaos-action-primary" onClick={replay}>↻ Replay from start</button>
            <button type="button" className="chaos-action" onClick={togglePause}>
              {complete ? '↻ Play again' : paused ? '▶ Resume' : 'Ⅱ Pause'}
            </button>
          </div>
          <div className="chaos-selectors">
            <fieldset className="chaos-segment-group">
              <legend>Pattern</legend>
              <button type="button" aria-pressed={mode === 'classic'} onClick={() => switchMode('classic')}>Classic 50%</button>
              <button type="button" aria-pressed={mode === 'original'} onClick={() => switchMode('original')}>Original 75%</button>
            </fieldset>
            <fieldset className="chaos-segment-group">
              <legend>Speed</legend>
              {Object.keys(SPEEDS).map((option) => (
                <button type="button" key={option} aria-pressed={speed === option} onClick={() => setSpeed(option)}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </fieldset>
          </div>
        </div>

        <div className="chaos-status">
          <span>{mode === 'classic' ? 'CLASSIC SIERPIŃSKI · 50% RULE' : 'ORIGINAL HASKELL EXPERIMENT · 75% RULE'}</span>
          <span className="chaos-counter">{count.toLocaleString()} / {MAX_POINTS.toLocaleString()} POINTS</span>
        </div>
      </div>

      <div className="chaos-explanation" aria-labelledby="chaos-explanation-heading">
        <div className="chaos-explanation-heading">
          <span className="chaos-eyebrow">THE IDEA BEHIND THE ART</span>
          <h3 id="chaos-explanation-heading">How can randomness make a pattern?</h3>
          <p>
            Each step is random, but the same simple rule is repeated.
            Together, those tiny choices build a geometric fractal.
          </p>
        </div>
        <ol className="chaos-steps">
          <li><span className="chaos-step-number">01</span><strong>Pick a vertex</strong><p>Choose any one of the triangle’s three corners at random.</p></li>
          <li><span className="chaos-step-number">02</span><strong>Move and place a point</strong><p>Move halfway toward that corner (or 75% in my original experiment) and draw a tiny dot.</p></li>
          <li><span className="chaos-step-number">03</span><strong>Repeat 16,000 times</strong><p>The classic 50% rule forms a Sierpiński triangle; the original 75% rule creates a more separated pattern.</p></li>
        </ol>
        <div className="chaos-math-note">
          <div>
            <span className="chaos-math-kicker">ONE LINE OF MATH</span>
            <code>next = current + ratio × (vertex − current)</code>
            <p>The original version was built in Haskell with Graphics.Gloss. This browser version recreates the movement rule using React and Canvas.</p>
          </div>
          <a href={GITHUB_SOURCE} target="_blank" rel="noopener noreferrer">Read the Haskell source ↗</a>
        </div>
      </div>
    </section>
  );
}

export default ChaosTriangle;
