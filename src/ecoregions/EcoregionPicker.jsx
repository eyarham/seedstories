import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const collectionString = "ecoregions"
const EcoregionPicker = ({ setSelectedEcoregion }) => {
  const [ecoregion, setEcoregion] = useState("");
  const [ecoregions, setEcoregions] = useState();
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const ecoregionsApi = api(db, collectionString);
    ecoregionsApi.getDocsSub(docs => setEcoregions(docs.map(d => ({ ...d.data(), id: d.id }))));
  }, [db]);

  const handleChange = (event) => {
    setEcoregion(event.target.value);
    setSelectedEcoregion(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ecoregion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ecoregion}
          label="Ecoregion"
          onChange={handleChange}
        >
          <MenuItem value={""}>--All Ecoregions--</MenuItem>
          {ecoregions && ecoregions.map((r, i) => <MenuItem key={i} value={r.number}>{`${r.number}. ${r.name}`}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  )
}

export default EcoregionPicker