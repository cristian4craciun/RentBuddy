import React, { useState } from 'react';
import { TextField, Grid, Box } from '@mui/material';

// Functional component for the search bar
const SearchBar = ({ applySearch }) => {
    // State to manage search query
    const [searchQuery, setSearchQuery] = useState("");

    // Handle changes in the search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Apply the search filter based on the entered keyword
    const handleSearch = () => {
        applySearch(searchQuery);
    };

    return (
        <Box sx={{ p: 2, mb: 3, backgroundColor: "#1e1e1e", borderRadius: 2, boxShadow: 3 }}>
            <Grid container spacing={2} justifyContent="center">
                {/* Search Input */}
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Search Listings"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}  // Trigger search when Enter is pressed
                    />
                </Grid>
                {/* Search Button */}
                <Grid item xs={12} sm={6} md={2}>
                    <button 
                        onClick={handleSearch} 
                        style={{
                            width: '100%', 
                            padding: '10px', 
                            backgroundColor: '#1976d2', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Search
                    </button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchBar;
