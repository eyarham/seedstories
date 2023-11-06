import { Box, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const SeedFields = () => {
  const [seedFields, setSeedFields] = useState();
  const [newFieldName, setNewFieldName] = useState();
  const { db } = useContext(FirebaseContext);
  const seedFieldsApi = api(db, "seedFields");
  useEffect(() => {
    seedFieldsApi.getDocsSub(setSeedFields)
  }, [seedFieldsApi])

  const onChangeNewFieldName = e => {
    setNewFieldName(e.target.value)
  }
  const onNewFieldSubmit = e => {
    e.preventDefault();
    seedFieldsApi.createDoc({ name: newFieldName })
  }
  return (
    <div>
      {seedFields &&
        seedFields.map((s,i) => <div key={i}>{s.data().name}</div>)}
      <div></div>
      <div>
        <Box component="form" onSubmit={onNewFieldSubmit}>
          <TextField placeholder="field name" onChange={onChangeNewFieldName} />
        </Box>
      </div>
    </div>
  )
}

export default SeedFields