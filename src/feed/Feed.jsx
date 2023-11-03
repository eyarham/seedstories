import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import FeedEntries from './FeedEntries';

const Feed = () => {
  const [zip, setZip] = useState();
  const [zipEntry, setZipEntry] = useState();
  const zipSubmit = (e) => {
    e.preventDefault();
    setZip(zipEntry)
  }
  const onZipChange=e=>{
    setZipEntry(e.target.value)
  }
  return (
    <div>
      <h2>Select Region</h2>
      <Box component="form" onSubmit={zipSubmit}>
        <TextField id="outlined-basic" label="Zip" variant="outlined" type="number" onChange={onZipChange} />
      </Box>
      <Box>
        Showing results for {zip}
        <FeedEntries />
      </Box>


    </div>
  )
}

export default Feed