import { Box, Button, Checkbox, FormControlLabel, Input } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const defaultNewEntry = {
  banked: false,
  date: new Date().toLocaleDateString('en-CA')
}
const EntryAdd = () => {
  const [newEntry, setNewEntry] = useState(defaultNewEntry);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const formRef = useRef();
  const onChangeFieldValue = (e) => {
    const field = e.target.name;
    const newFieldObj = {};
    newFieldObj[field] = e.target.value
    setNewEntry({ ...newEntry, ...newFieldObj });
    setIsReadyToSubmit(true);
  }
  const onNewSeedSubmit = async (e) => {
    e.preventDefault();
    const entriesApi = api(db, "entries", authUser.uid);
    await entriesApi.createDoc(newEntry);
    formRef.current.reset();
    setIsReadyToSubmit(false);
  }
  const onIncludeChange = (e) => {
    const field = e.target.name;
    const newFieldObj = {};
    newFieldObj[field] = e.target.checked;
    setNewEntry({ ...newEntry, ...newFieldObj });
    setIsReadyToSubmit(true);
  }
  const today = new Date().toLocaleDateString('en-CA');
  return (
    <div>
      <h2>New Seed Entry</h2>
      <Box component="form" onSubmit={onNewSeedSubmit} ref={formRef}>
        <div>
          <Input name="name" placeholder="name" onChange={onChangeFieldValue} />
        </div>
        <div>
          <Input name="envelope" placeholder="envelope" onChange={onChangeFieldValue} />
        </div>
        <div>
          <Input name="date" type="date" onChange={onChangeFieldValue} defaultValue={today} />
        </div>
        <div>
          <Input name="location" placeholder='location' onChange={onChangeFieldValue} />
        </div>
        <div>
          <FormControlLabel control={<Checkbox name='banked' onChange={onIncludeChange} aria-label='Include in Bank?' />} label="Include in Bank?" />
        </div>
        <Button type="Submit" disabled={!isReadyToSubmit}>Add</Button>
      </Box>
    </div>
  )
}

export default EntryAdd