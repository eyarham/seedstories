import { Button } from '@mui/material';
import Papa from 'papaparse';
import React, { useContext, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const EcoRegionUploader = () => {
  const [isLoading, setIsLoading] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const handleSubmission = () => {
    setIsLoading(true);
    Papa.parse(selectedFile, {
      header: true,
      complete: results => {
        const { data, meta } = results;
        // setFileFields(meta.fields);
        // setColumns(getDataCols(meta.fields));

        // setRows(addRowIds(data));
        // setFilteredRows(addRowIds(data));

        // setTotalsRows([getTotalsRow(data, meta.fields)])
        const valuesToSave = data.map(d => ({ number: d.Number, name: d.Name, range: d.Range }));
        const ecoregionApi = api(db, "ecoregions", authUser.uid)
        valuesToSave.forEach(async e => {
          await ecoregionApi.createDoc(e);
        })
        setIsLoading(false);
      }
    })
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  if (isLoading) return <Spinner />
  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked && <span>👍</span>}
      <Button onClick={handleSubmission}>Upload</Button>

    </div>
  )
}

export default EcoRegionUploader