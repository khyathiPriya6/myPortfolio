import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio introduction and project navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Khyathi Priya' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View My Work' })).toHaveAttribute('href', '#projects');
});
