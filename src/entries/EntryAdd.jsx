import { Box, Button, Input } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const EntryAdd = () => {
  const [newEntry, setNewEntry] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const formRef = useRef();
  const onChangeFieldValue = e => {
    const updatedEntry = newEntry || {};
    const field = e.target.name;
    updatedEntry[field] = e.target.value
    setNewEntry(updatedEntry);
  }
  const onNewSeedSubmit = async (e) => {
    e.preventDefault();
    const entriesApi = api(db, "entries", authUser.uid);
    await entriesApi.createDoc(newEntry);
    formRef.current.reset();
  }
  return (
    <div>
      <h2>New Seed</h2>
      <Box component="form" onSubmit={onNewSeedSubmit} ref={formRef}>
        <div>
          <Input name="envelope" onChange={onChangeFieldValue} />
        </div>
        <div>
          <Input name="date" type="date" onChange={onChangeFieldValue} />
        </div>
        <div>
          <Input name="location" onChange={onChangeFieldValue} />
        </div>
        <Button type="Submit">Add</Button>
      </Box>
    </div>
  )
}

export default EntryAdd