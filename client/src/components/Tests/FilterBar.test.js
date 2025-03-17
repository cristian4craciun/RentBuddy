import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../Filters";

describe("FilterBar Component", () => {
  let applyFiltersMock;

  beforeEach(() => {
    applyFiltersMock = jest.fn(); // Mock function to test applyFilters
    render(<FilterBar applyFilters={applyFiltersMock} />);
  });

  test("renders all filter input fields", () => {
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bathrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pets Allowed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Parking Available/i)).toBeInTheDocument();
  });

  test("updates filter state when input values change", () => {
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: "500" } });
    expect(minPriceInput.value).toBe("500");

    const maxPriceInput = screen.getByLabelText(/Max Price/i);
    fireEvent.change(maxPriceInput, { target: { value: "1500" } });
    expect(maxPriceInput.value).toBe("1500");
  });

  test("calls applyFilters function with correct data on Apply Filters", () => {
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: "700" } });

    const applyButton = screen.getByText(/Apply Filters/i);
    fireEvent.click(applyButton);

    expect(applyFiltersMock).toHaveBeenCalledWith({
      minPrice: "700",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      petsAllowed: false,
      parkingAvailable: false,
    });
  });

  test("clears all filters when Clear Filters is clicked", () => {
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: "900" } });

    const clearButton = screen.getByText(/Clear Filters/i);
    fireEvent.click(clearButton);

    expect(minPriceInput.value).toBe(""); // Input should be cleared
    expect(applyFiltersMock).toHaveBeenCalledWith({}); // Should reset filter
  });
});
