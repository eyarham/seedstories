import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid } from '@mui/material'
import React, { useState } from 'react'
import FeedEntryExpanded from './FeedEntryExpanded';

const FeedEntry = ({ feedEntry }) => {
  const { name, description, image, alt } = feedEntry;
  const [isExpanded, setIsExpanded ] = useState(false);
  const onClickLearnMore = ()=>{
    setIsExpanded(true)
  }
  const onCloseExpanded = ()=>{
    setIsExpanded(false)
  }
  if(isExpanded)
  {
    return <FeedEntryExpanded feedEntry={feedEntry} onClose={onCloseExpanded}/>
  }
  return (
    <Grid item xs={12} md={4}  >
      <Card variant='outlined' onClick={onClickLearnMore} sx={{cursor:'pointer'}} >
        <CardHeader title={name} />
        <CardMedia component="img"
          height="194"
          image={image}
          alt={alt}
        />
        <CardContent>
          {description}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClickLearnMore}>Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default FeedEntry