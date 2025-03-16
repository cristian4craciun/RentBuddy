import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, FormControlLabel, Checkbox, Box } from '@mui/material';

const FilterBar = ({ applyFilters }) => {
    // State for filter options
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathrooms: "",
        petsAllowed: false,
        parkingAvailable: false
    });

    // Handles filter input changes
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        });
    };

    // Handles applying filters
    const handleApplyFilters = () => {
        applyFilters(filters);
    };

    // Handles clearing filters
    const handleClearFilters = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            bedrooms: "",
            bathrooms: "",
            petsAllowed: false,
            parkingAvailable: false
        });
        applyFilters({}); // Reset the filter results
    };

    return (
        <Box sx={{ p: 2, mb: 3, backgroundColor: "#1e1e1e", borderRadius: 2, boxShadow: 3 }}>
            <Grid container spacing={2} justifyContent="center">
                {/* First Row: Price Filters */}
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

                {/* Bedroom & Bathroom Filters */}
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

                {/* Second Row: Checkbox Filters */}
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

            {/* Buttons for applying and clearing filters */}
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                        Apply Filters
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
                        Clear Filters
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterBar;
