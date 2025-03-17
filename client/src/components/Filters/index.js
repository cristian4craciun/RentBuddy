// Import necessary dependencies from React and Material-UI
import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, FormControlLabel, Checkbox, Box } from '@mui/material';

// Functional component for the filter bar
const FilterBar = ({ applyFilters }) => {
    // State to manage filter selections
    const [filters, setFilters] = useState({
        minPrice: "",          // Minimum price filter
        maxPrice: "",          // Maximum price filter
        bedrooms: "",          // Number of bedrooms filter
        bathrooms: "",         // Number of bathrooms filter
        petsAllowed: false,    // Checkbox: Pets allowed filter
        parkingAvailable: false // Checkbox: Parking availability filter
    });

    // Handles changes in filter inputs (both text fields and checkboxes)
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        });
    };

    // Function to apply the selected filters
    const handleApplyFilters = () => {
        applyFilters(filters); // Passes the selected filters to the parent component
    };

    // Function to clear all filters and reset selections
    const handleClearFilters = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            bedrooms: "",
            bathrooms: "",
            petsAllowed: false,
            parkingAvailable: false
        });
        applyFilters({}); // Resets the displayed listings
    };

    return (
        // Box container with styling for background and spacing
        <Box sx={{ p: 2, mb: 3, backgroundColor: "#1e1e1e", borderRadius: 2, boxShadow: 3 }}>
            {/* Grid container for filter inputs - first row */}
            <Grid container spacing={2} justifyContent="center">
                {/* Minimum Price Input */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Min Price"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Maximum Price Input */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Max Price"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Bedrooms Dropdown */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Bedrooms"
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem value="">Any</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5+</MenuItem>
                    </TextField>
                </Grid>

                {/* Bathrooms Dropdown */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Bathrooms"
                        name="bathrooms"
                        value={filters.bathrooms}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem value="">Any</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3+</MenuItem>
                    </TextField>
                </Grid>

                {/* Pets Allowed Checkbox */}
                <Grid item xs={6} sm={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.petsAllowed}
                                onChange={handleChange}
                                name="petsAllowed"
                            />
                        }
                        label="Pets Allowed"
                    />
                </Grid>

                {/* Parking Available Checkbox */}
                <Grid item xs={6} sm={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.parkingAvailable}
                                onChange={handleChange}
                                name="parkingAvailable"
                            />
                        }
                        label="Parking Available"
                    />
                </Grid>
            </Grid>

            {/* Grid for Apply and Clear Filters buttons */}
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                {/* Apply Filters Button */}
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                        Apply Filters
                    </Button>
                </Grid>

                {/* Clear Filters Button */}
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
                        Clear Filters
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

// Export the FilterBar component for use in other parts of the application
export default FilterBar;
