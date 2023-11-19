import { Box, Button, Input } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const AddRow = ({ collectionString, fields }) => {
  const [newEntry, setNewEntry] = useState();
  const [isReadyToSubmit, setIsReadyToSubmit] = useState();
  const firstTextBoxRef = useRef()
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
    firstTextBoxRef.current.focus();
  }
  if (!collectionString || !fields) <Spinner />
  return (
    <Box component="form" onSubmit={onNewSeedSubmit} ref={formRef}>
      <div>
        {fields.map((f, i) => {
          if (i === 0) {
            return <Input key={i} name={f} placeholder={f} onChange={onChangeFieldValue} sx={{ margin: 1 }} inputRef={firstTextBoxRef} />
          }
          else {
            return <Input key={i} name={f} placeholder={f} onChange={onChangeFieldValue} sx={{ margin: 1 }} />
          }
        })
        }
      </div>
      <Button type="Submit" disabled={!isReadyToSubmit}>Add</Button>
    </Box>
  )
}

export default AddRow