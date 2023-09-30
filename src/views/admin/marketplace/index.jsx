import React from "react";

// Chakra imports
import {
  Box,
} from "@chakra-ui/react";

// Custom components

import HistoryItem from "views/admin/marketplace/components/HistoryItem";


export default function Marketplace() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <HistoryItem
          name='Budget Section'
          author='Coming Soon!'
        />
    </Box>
  );
}
