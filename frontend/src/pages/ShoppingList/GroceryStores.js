import React from "react";
import { Box, Container, Typography } from "@mui/material";
import MapComponent from "../../components/MapComponent/MapComponent";

function GroceryStores() {

  return (
    <Box
      sx={{
        background: '#a1c298',
        borderRadius: '8px',
        p: 2,
        mt: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
      <Typography variant="h4" fontWeight="bold">
        Grocery Stores Nearby
      </Typography>

      <MapComponent />
    </Box>

  );
};

export default GroceryStores;