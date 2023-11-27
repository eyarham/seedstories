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
  const getNumFromRegion = a => {
    var secondDigit = Number(a.slice(1, 2));
    var isTwoDigit = secondDigit === 0 || secondDigit;
    if (isTwoDigit) {
      return Number(a.substring(0, 2))
    }
    else { return Number(a.substring(0, 1)) }
  }
  const getLettersFromRegion = a => {
    var secondLastChar = Number(a.substring(a.length - 2, a.length - 1));
    var hasTwoLetters = !(secondLastChar === 0 || secondLastChar);
    if (hasTwoLetters) { return a.substring(a.length - 2) }
    else { return a.substring(a.length - 1) }
  }
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
        const valuesToSave = data.map(d => (
          {
            number: d.Number,
            lv3num: getNumFromRegion(d.Number),
            letter: getLettersFromRegion(d.Number),
            name: d.Name,
            range: d.Range
          }));
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