import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/ChaosTriangle', () => function MockChaosTriangle() {
  return <section aria-label="Chaos Triangle interactive experiment">Chaos experiment ready</section>;
});

test('renders the refreshed homepage and interactive artwork section', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Khyathi Priya/i })).toBeInTheDocument();
  expect(screen.getByRole('region', { name: /Chaos Triangle interactive experiment/i })).toBeInTheDocument();
});
