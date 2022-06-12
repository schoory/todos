import { render } from '@testing-library/react';
import App from './App';

test('Renders app', () => {
  const { container } = render(<App />);
  const app = container.querySelector('.app')
  expect(app).toBeInTheDocument();
});