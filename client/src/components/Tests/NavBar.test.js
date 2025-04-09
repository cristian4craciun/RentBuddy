// Import React (not always necessary, but good practice)
import React from 'react';

// Import testing utilities from React Testing Library
import { render, screen } from '@testing-library/react';

// Import Jest-DOM for extended matchers like `toBeInTheDocument`
import '@testing-library/jest-dom'; // ✅ Ensures better assertion support

// Import MemoryRouter from React Router for simulating navigation in tests
import { MemoryRouter } from 'react-router-dom';

// Import the Navigation component that we are testing
import Navigation from '../Navigation';

describe('Navigation Component', () => {
  test('renders navigation links correctly and handles unauthenticated users', () => {
    // Render the Navigation component inside a MemoryRouter
    // MemoryRouter allows us to test components that use React Router
    render(
      <MemoryRouter>
        <Navigation authUser={null} firebase={{}} />
      </MemoryRouter>
    );

    expect(screen.getByText('RentBuddy')).toBeInTheDocument();
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('renders navigation links correctly and handles authenticated users', () => {
    render(
      <MemoryRouter>
        <Navigation authUser={{ uid: '123' }} firebase={{ doSignOut: jest.fn() }} />
      </MemoryRouter>
    );

    expect(screen.getByText('RentBuddy')).toBeInTheDocument();
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('Roommate Finder')).toBeInTheDocument();
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });
});