import { Button } from '@mui/material';
import React, { useState } from 'react';
import Entries from './Entries';
import EntryAdd from './EntryAdd';

const Notebook = () => {
  const [showAdd, setShowAdd] = useState();
  return (
    <div>
      <h2>My Notebook</h2>
      <p>jot down the seeds you've got, and add more info as you go</p>
      <Button onClick={() => setShowAdd(!showAdd)}>Add New Entry</Button>
      {showAdd && <EntryAdd />}
      <Entries />
    </div>
  )
}

export default Notebook