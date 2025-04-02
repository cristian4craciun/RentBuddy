// Define fetch & Response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
  })
);
global.Response = class {
  constructor(body, init) {
    this.body = body;
    this.init = init;
  }
};

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

let Login;

// mock Firebase
const mockFirebase = {
  doSignInWithEmailAndPassword: jest.fn(() => Promise.resolve('mocked-id-token')),
};

beforeAll(async () => {
  const module = await import('../auth/Login/Login');
  Login = module.default;
});

test('Sign In page displays all components correctly', () => {
  render(
    <MemoryRouter>
      <Login firebase={mockFirebase} />
    </MemoryRouter>
  );

  // Ensure all text and labels are displayed 
  expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
  expect(screen.getByText('Use your email and password to log in')).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  // Ensure sign in button is displayed
  const signInButton = screen.getByRole('button', { name: /sign in/i });
  expect(signInButton).toBeInTheDocument();
  expect(signInButton).not.toBeDisabled();
});
