import { Button, Container, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const EcoregionFinder = ({ onSearchSubmit, initialZip }) => {
  const [zip, setZip] = useState(initialZip || "");
  useEffect(() => {
    if (initialZip) { setZip(initialZip) }
  }, [initialZip])
  const onZipChange = e => {
    setZip(e.target.value)
  }
  const onFormSubmit = e => {
    e.preventDefault();
    onSearchSubmit(zip);
  }
  return (
    <Container maxWidth="xl">
      <Paper elevation={4} sx={{ padding: 1, maxWidth: 300, margin: "0 auto" }} >
        <form onSubmit={onFormSubmit}>
          <p>search for an ecoregion:</p>
          <TextField id="zip" type="number" value={zip} name='zip' label="Zip" variant="outlined" onChange={onZipChange} />
          <Button type="submit">go</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default EcoregionFinder