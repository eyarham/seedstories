import { Box, Card } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EcoregionFinder from '../ecoregions/EcoregionFinder'
const Home = () => {
  const navigate = useNavigate();
  const onSearchSubmit = (zip) => {
    navigate(`/ecoregions?zip=${zip}`)
  }
  return (
    <div>
      <h3>SeedStories</h3>
      <Box sx={{ margin: "0 auto", padding: 1, maxWidth: 200 }}>
        <Card sx={{ maxWidth: 200, margin: 1, padding: 1 }}>
          <Link to="/login">Log in</Link> and start your personal seed bank!
        </Card>
        <span style={{ padding: 2 }}>-OR-</span>
      </Box>
      <EcoregionFinder onSearchSubmit={onSearchSubmit} />
    </div>
  )
}

export default Home