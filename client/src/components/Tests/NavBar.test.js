import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ Ensure this is imported
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Navigation';

test('renders navigation links correctly', () => {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  expect(screen.getByText('Housing')).toBeInTheDocument();
  expect(screen.getByText('Roommate Finder')).toBeInTheDocument();
  expect(screen.getByText('My Profile')).toBeInTheDocument();
});
