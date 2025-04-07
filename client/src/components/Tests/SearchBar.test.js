import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../Filters/SearchBar.js';

describe('SearchBar Component', () => {
    test('should call applySearch when the Search button is clicked', () => {
        const mockApplySearch = jest.fn();
        render(<SearchBar applySearch={mockApplySearch} />);

        // Find the search button by its role and name (button with text "Search")
        const searchButton = screen.getByRole('button', { name: /search/i });

        // Simulate the button click
        fireEvent.click(searchButton);

        // Assert that the mock function was called once
        expect(mockApplySearch).toHaveBeenCalledTimes(1);
    });

    test('should call applySearch when the Enter key is pressed in the input field', () => {
        const mockApplySearch = jest.fn();  // Mock the applySearch function

        render(<SearchBar applySearch={mockApplySearch} />);

        // Find the search input by its label text
        const searchInput = screen.getByLabelText(/Search Listings/i);  

        // Simulate typing in the input field
        fireEvent.change(searchInput, { target: { value: 'Test' } });  

        // Simulate pressing the Enter key
        fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });  

        // Assert that applySearch was called once and with the correct argument
        expect(mockApplySearch).toHaveBeenCalledTimes(1);  
        expect(mockApplySearch).toHaveBeenCalledWith('Test');  
    });
});
