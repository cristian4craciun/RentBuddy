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

// Define the test case
test('renders navigation links correctly', () => {
  // Render the Navigation component inside a MemoryRouter
  // MemoryRouter allows us to test components that use React Router
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  // Check if the "Housing" link is present in the document
  expect(screen.getByText('Housing')).toBeInTheDocument();

  // Check if the "Roommate Finder" link is present in the document
  expect(screen.getByText('Roommate Finder')).toBeInTheDocument();

  // Check if the "My Profile" link is present in the document
  expect(screen.getByText('My Profile')).toBeInTheDocument();
});
