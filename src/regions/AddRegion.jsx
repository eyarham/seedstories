import { Box, Button, Input } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const collectionString = "regions";
const fields = ["number", "name", "range"]
const AddRegion = () => {
  const [newEntry, setNewEntry] = useState();
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
    const entriesApi = api(db, collectionString, authUser.uid);
    await entriesApi.createDoc(newEntry);
    formRef.current.reset();
    setIsReadyToSubmit(false);
  }
  return (
    <Box component="form" onSubmit={onNewSeedSubmit} ref={formRef}>
      <div>
        {fields.map((f, i) => <Input key={i} name={f} placeholder={f} onChange={onChangeFieldValue} sx={{ margin: 1 }} />)}
      </div>
      <Button type="Submit" disabled={!isReadyToSubmit}>Add</Button>
    </Box>
  )
}

export default AddRegion