import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Kitties from the NavBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create and breed your cats/i);
  expect(linkElement).toBeInTheDocument();
});
