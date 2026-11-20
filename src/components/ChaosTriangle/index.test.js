import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ChaosTriangle from './index';

let frames;
let nextId;
let now;
let context;
function advance(count = 120) {
  act(() => {
    for (let i = 0; i < count; i += 1) {
      now += 16;
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach(callback => callback(now));
    }
  });
}
beforeEach(() => {
  frames = new Map();
  nextId = 0;
  now = 0;
  context = Object.fromEntries(['setTransform', 'clearRect', 'beginPath', 'moveTo', 'lineTo', 'stroke', 'arc', 'fill', 'fillRect', 'setLineDash'].map(name => [name, jest.fn()]));
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 640, height: 480 });
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frames.set(++nextId, callback); return nextId; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
});
afterEach(() => jest.restoreAllMocks());

test('draws points across consecutive frames, pauses, resumes and cleans up', () => {
  const { unmount } = render(<React.StrictMode><ChaosTriangle /></React.StrictMode>);
  advance();
  expect(context.fillRect).toHaveBeenCalled();
  const count = Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'));
  expect(count).toBeGreaterThan(0);
  fireEvent.click(screen.getByRole('button', { name: /Pause/ }));
  advance();
  expect(Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))).toBe(count);
  fireEvent.click(screen.getByRole('button', { name: /Resume/ }));
  advance(20);
  expect(Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))).toBeGreaterThan(count);
  unmount();
  expect(frames.size).toBe(0);
});

test('replays, changes speed and switches movement rules', () => {
  render(<ChaosTriangle />);
  advance();
  fireEvent.click(screen.getByRole('button', { name: /Replay from start/ }));
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  fireEvent.click(screen.getByRole('button', { name: 'Fast' }));
  expect(screen.getByRole('button', { name: 'Fast' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Original 75%' }));
  expect(screen.getByRole('button', { name: 'Original 75%' })).toHaveAttribute('aria-pressed', 'true');
  advance();
  expect(Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))).toBeGreaterThan(0);
});

test('reduced motion displays a static pattern and permits explicit playback', () => {
  window.matchMedia.mockReturnValue({ matches: true });
  render(<ChaosTriangle />);
  expect(context.fillRect).toHaveBeenCalled();
  expect(frames.size).toBe(0);
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1200');
  fireEvent.click(screen.getByRole('button', { name: /Resume/ }));
  advance(20);
  expect(Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))).toBeGreaterThan(1200);
});
