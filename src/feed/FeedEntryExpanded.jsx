import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid } from '@mui/material';
import React from 'react';

const FeedEntryExpanded = ({ feedEntry, onClose }) => {
  const { name, description, image, alt, region, start } = feedEntry;

  return (
    <Grid item xs={12} md={4}  >
      <Card variant='outlined' >
        <CardHeader title={name} />
        <CardMedia component="img"
          height="194"
          image={image}
          alt={alt}
        />
        <CardContent>
          {description}
          <div>
            Region: {region}
          </div>
          <div>
            Start: {start}
          </div>
          <div>
            <Button sx={{ margin: 1 }} variant='contained'>Feedback</Button>
          </div>
          <div>
            <Button sx={{ margin: 1 }} variant='contained'>Add</Button>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClose}>Close</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default FeedEntryExpanded