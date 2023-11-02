import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid } from '@mui/material'
import React from 'react'

const Home = () => {
  const cardContent = [
    {
      title: "Milkweed is the thing",
      text: "let's leard about milkweed",
      image: "milkweed-seeds-close-up.jpg"
    },    
    {
      title: "Sunflower Dreams",
      text: "you may think you know everything about sunflowers...",
      image: "sunflower-seeds-13783896322gw.jpg"
    },    
    {
      title: "When to Harvest?",
      text: "experts advise on the key signs to know your seeds are ready",
      image: "yellowing-seeds.jpg"
    }
  ]
  return (
    <div>
      <h2>This is Home</h2>
      <h3>Learning Opportunities</h3>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {cardContent.map(({ title, text, image }) => (
              <Grid item xs={4} >
                <Card variant='outlined' >
                  <CardHeader title={title} />
                  <CardMedia component="img"
                    height="194"
                    image={image}
                    alt="Mlikweed seeds"
                  />
                  <CardContent>
                    {text}
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}            
          </Grid>

        </Box>
      </div>
      <h3>Latest from the Community</h3>
    </div>
  )
}

export default Home