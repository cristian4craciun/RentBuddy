import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../Profile';

describe('Profile Component', () => {
  test('renders profile information and displays edit button', () => {
    render(<Profile />);

    // Check that the profile title is displayed
    expect(screen.getByText(/my profile/i)).toBeInTheDocument();

    // Check that the description text is displayed
    expect(screen.getByText(/complete your profile information below/i)).toBeInTheDocument();

    // Check that the "Edit Profile" button is rendered
    const editButton = screen.getByText(/edit profile/i);
    expect(editButton).toBeInTheDocument();
    
    // Check if the button is clickable
    fireEvent.click(editButton);
    
  });
});

// Mock the EditProfile component
jest.mock('../Profile/EditProfile', () => {
    return ({ open, onClose, userProfile, onSave }) => {
      if (!open) return null;
      return (
        <div>
          <h2>Edit Profile</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Simulating saving the updated profile
              onSave({ ...userProfile, name: 'Updated Name' });
            }}
          >
            <input name="name" defaultValue={userProfile.name} />
            <button type="submit">Save</button>
          </form>
          <button onClick={onClose}>Close</button>
        </div>
      );
    };
  });