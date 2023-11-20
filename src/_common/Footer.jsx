import { GitHub } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <footer>
    <Container maxWidth="xl" sx={{ minHeight: 40, backgroundColor: "#aaddaa", position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Box sx={{ float: "left", margin: 1 }}>
        ©2023 SeedStories
      </Box>
      <Box sx={{ float: "right", margin: 1, }}>
        <a href="https://github.com/eyarham/seedstories" target="_blank" rel="noopener noreferrer"><GitHub /></a>
      </Box>
    </Container>
    </footer>
  )
}

export default Footer