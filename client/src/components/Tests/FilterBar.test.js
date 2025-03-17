import React from "react";
import "@testing-library/jest-dom"; // Extends Jest with DOM matchers for assertions
import { render, screen, fireEvent } from "@testing-library/react"; // Import testing utilities
import FilterBar from "../Filters"; // Import the FilterBar component

// ✅ Describe block groups related tests for the FilterBar component
describe("FilterBar Component", () => {
  let applyFiltersMock; // Mock function to track the applyFilters behavior

  // ✅ Run this before each test to render the component and reset mocks
  beforeEach(() => {
    applyFiltersMock = jest.fn(); // Create a mock function to simulate applyFilters prop
    render(<FilterBar applyFilters={applyFiltersMock} />); // Render FilterBar with mock function
  });

  // ✅ Test to check if all filter input fields are rendered correctly
  test("renders all filter input fields", () => {
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument(); // Check Min Price input
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument(); // Check Max Price input
    expect(screen.getByLabelText(/Bedrooms/i)).toBeInTheDocument(); // Check Bedrooms dropdown
    expect(screen.getByLabelText(/Bathrooms/i)).toBeInTheDocument(); // Check Bathrooms dropdown
    expect(screen.getByLabelText(/Pets Allowed/i)).toBeInTheDocument(); // Check Pets Allowed checkbox
    expect(screen.getByLabelText(/Parking Available/i)).toBeInTheDocument(); // Check Parking Available checkbox
  });

  // ✅ Test to check if the filter state updates when inputs change
  test("updates filter state when input values change", () => {
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: "500" } }); // Simulate user typing "500"
    expect(minPriceInput.value).toBe("500"); // Ensure the value updates correctly

    const maxPriceInput = screen.getByLabelText(/Max Price/i);
    fireEvent.change(maxPriceInput, { target: { value: "1500" } }); // Simulate user typing "1500"
    expect(maxPriceInput.value).toBe("1500"); // Ensure the value updates correctly
  });

  // ✅ Test to verify that Apply Filters button correctly calls applyFilters with the right data
  test("calls applyFilters function with correct data on Apply Filters", () => {
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: "700" } }); // Set Min Price to 700

    const applyButton = screen.getByText(/Apply Filters/i);
    fireEvent.click(applyButton); // Click Apply Filters button

    // Check if applyFiltersMock was called with expected filter values
    expect(applyFiltersMock).toHaveBeenCalledWith({
      minPrice: "700",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      petsAllowed: false,
      parkingAvailable: false,
    });
  });

  // ✅ Test to check if Clear Filters button resets all filters
  test("clears all filters when Clear Filters is clicked", () => {
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: "900" } }); // Set Min Price to 900

    const clearButton = screen.getByText(/Clear Filters/i);
    fireEvent.click(clearButton); // Click Clear Filters button

    expect(minPriceInput.value).toBe(""); // Ensure Min Price is cleared
    expect(applyFiltersMock).toHaveBeenCalledWith({}); // Ensure applyFilters is called with an empty object
  });
});
