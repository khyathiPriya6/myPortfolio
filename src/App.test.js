import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { projects } from './data/projects';

// The Canvas component has independent rendering and control regression tests.
jest.mock('./components/ChaosTriangle', () => function Playground() {
  return <div>Interactive Canvas playground</div>;
});

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
});

test('renders the new hero, required sections and verified projects without placeholders', () => {
  const { container } = render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Khyathi Priya');
  for (const id of ['about', 'skills', 'experience', 'practice', 'projects']) {
    expect(container.querySelector(`section#${id}`)).toBeInTheDocument();
  }
  expect(screen.getByText('Software Engineer at Visa')).toBeInTheDocument();
  expect(screen.getByText('Mentor at Talent sprint')).toBeInTheDocument();
  expect(screen.queryByText('Book Recommender')).not.toBeInTheDocument();
  for (const project of projects) {
    expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: `View ${project.title} source` })).toHaveAttribute('href', project.github);
  }
  for (const link of container.querySelectorAll('a')) {
    const href = link.getAttribute('href');
    expect(href).not.toMatch(/your-profile|yourusername|example\.com/);
    if (href.startsWith('#')) expect(container.querySelector(href)).toBeInTheDocument();
  }
});

test('opens the playground on demand, closes it and restores focus and scrolling', async () => {
  render(<App />);
  const trigger = screen.getByRole('button', { name: 'Open Chaos Triangle playground' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(trigger);
  expect(await screen.findByText('Interactive Canvas playground')).toBeInTheDocument();
  expect(screen.getByRole('dialog')).toHaveAccessibleName('Chaos Triangle playground');
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.click(screen.getByRole('button', { name: 'Close playground' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe('');
  fireEvent.click(trigger);
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test('mobile navigation closes after selecting a section or pressing Escape', () => {
  render(<App />);
  const menu = screen.getByRole('button', { name: /Menu/ });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Skills' }));
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(menu);
  fireEvent.keyDown(screen.getByRole('link', { name: 'Practice' }), { key: 'Escape' });
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  expect(menu).toHaveFocus();
});
