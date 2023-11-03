import { Box, Grid } from '@mui/material'
import React from 'react'
import FeedEntry from './FeedEntry'

const feedEntries = [
  {
    name: "Milkweed",
    description: "let's learn about milkweed",
    image: "milkweed-seeds-close-up.jpg",
    alt: "Milkweed seeds",
    region: "Midwest", 
    start: "March"
  },
  {
    name: "Sunflower",
    description: "let's learn about Sunflower",
    image: "sunflower-seeds-13783896322gw.jpg",
    alt: "Sunflower seeds",
    region: "Midwest", 
    start: "March"
  },

]
const FeedEntries = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {feedEntries.map((feedEntry, index) => (
          <FeedEntry key={index} feedEntry={feedEntry} />
        ))}
      </Grid>
    </Box>
  )
}

export default FeedEntries