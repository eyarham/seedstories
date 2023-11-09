import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const SeedAdd = () => {
  const [seedFields, setSeedFields] = useState();
  const [newSeedRecord, setNewSeedRecord] = useState({});
  const formRef = useRef()
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const seedFieldsApi = api(db, "seedFields");
    seedFieldsApi.getDocsSub(docs => {
      const flatDocs = docs.map(d => ({ ...d.data(), id: d.id }))
      const sorteddocs = flatDocs.sort((a, b) => a.order - b.order)
      return setSeedFields(sorteddocs)
    }
    )
  }, [db])
  const onSeedAddSubmit = async e => {
    e.preventDefault();
    const seedsApi = api(db, "seeds");

    await seedsApi.createDoc(newSeedRecord);
    formRef.current.reset();
  }
  return (
    <div>
      <Box component="form" onSubmit={onSeedAddSubmit} ref={formRef}>
        Add new Envelope to catalog
        {seedFields &&
          seedFields.map((s, i) => {
            const onChangeFieldValue = e => {
              const newValue = newSeedRecord;
              newValue[s.name] = e.target.value;
              setNewSeedRecord(newValue);
            }
            return <div key={i}>
              <TextField placeholder={s.name} onChange={onChangeFieldValue} />
            </div>
          }
          )}
        <Button variant="contained" type="submit">submit</Button>
      </Box>
    </div>
  )
}

export default SeedAdd