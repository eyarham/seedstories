import { Box, Button, Checkbox, FormControlLabel, Input } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const Entry = ({ entry }) => {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState();
  const [editedEntry, setEditedEntry] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  useEffect(() => {
    if (entry && (!editedEntry || (entry.id !== editedEntry.id))) {
      setEditedEntry(entry)
      setIsReadyToSubmit(false);
    }
  }, [editedEntry, entry])
  const onChangeFieldValue = e => {
    const field = e.target.name;
    const newFieldObj = {};
    newFieldObj[field] = e.target.value;
    setEditedEntry({ ...editedEntry, ...newFieldObj });
    setIsReadyToSubmit(true);
  }
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const entriesApi = api(db, "entries", authUser.uid);
    await entriesApi.updateDoc(entry.id, editedEntry);
    setIsReadyToSubmit(false);
  }
  const onIncludeChange = (e) => {
    const field = e.target.name;
    const newFieldObj = {};
    newFieldObj[field] = e.target.checked;
    setEditedEntry({ ...editedEntry, ...newFieldObj });
    setIsReadyToSubmit(true);
  }
  if (!editedEntry) return <Spinner />
  const { name, envelope, date, location, banked } = editedEntry;
  return (
    <div>
      <h2>Entry {name}</h2>
      <Box component="form" onSubmit={onFormSubmit} >
        <div>
          <Input name="name" placeholder="name" onChange={onChangeFieldValue} value={name} />
        </div>
        <div>
          <Input name="envelope" placeholder="envelope" onChange={onChangeFieldValue} value={envelope} />
        </div>
        <div>
          <Input name="date" type="date" onChange={onChangeFieldValue} value={date} />
        </div>
        <div>
          <Input name="location" placeholder='location' onChange={onChangeFieldValue} value={location} />
        </div>
        <div>
          <FormControlLabel control={<Checkbox checked={banked} name='banked' onChange={onIncludeChange} aria-label='Include in Bank?' />} label="Include in Bank?" />
        </div>
        <Button type="Submit" disabled={!isReadyToSubmit}>Save</Button>
      </Box>
    </div>
  )
}

export default Entry