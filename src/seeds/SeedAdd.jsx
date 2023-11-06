import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const SeedAdd = () => {
  const [seedFields, setSeedFields] = useState();
  const [newSeedRecord, setNewSeedRecord] = useState({});
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
  const seedFieldsApi = api(db, "seedFields");
    seedFieldsApi.getDocsSub(setSeedFields)
  }, [db])
  const onSeedAddSubmit = e=>{
    e.preventDefault();
    const seedsApi = api(db, "seeds");
        
    seedsApi.createDoc(newSeedRecord)
  }
  return (
    <div>
      <Box component="form" onSubmit={onSeedAddSubmit}>
        Add new Seed to catalog
        {seedFields &&
          seedFields.sort(a=>a.data().order).map((s, i) =>
          {
            const onChangeFieldValue = e=>{
              const newValue = newSeedRecord;
              newValue[s.data().name] = e.target.value;
              setNewSeedRecord(newValue);
            }
           return <div key={i}>
              <TextField placeholder={s.data().name} onChange={onChangeFieldValue} />
            </div>
          }
          )}
          <Button variant="contained" type="submit">submit</Button>
      </Box>
    </div>
  )
}

export default SeedAdd