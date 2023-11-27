import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const EcoregionManager = () => {
  const [ecoregions, setRegions] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const ecoregionsApi = api(db, "ecoregions", authUser.uid);
  useEffect(() => {
    ecoregionsApi.getDocsSub(setRegions)
  }, [ecoregionsApi])
  const getNumFromRegion = a => {
    var secondDigit = Number(a.slice(1, 2));
    var isTwoDigit = secondDigit === 0 || secondDigit;
    if (isTwoDigit) {
      return Number(a.substring(0, 2))
    }
    else { return Number(a.substring(0, 1)) }
  }
  const getLettersFromRegion = a => {
    var hasTwoLetters = !Number(a.substring(a.length - 2, a.length - 1))
    if (hasTwoLetters) { return a.substring(a.length - 2) }
    else { return a.substring(a.length - 1) }

  }
  const addlvl3 = async () => {
    for (const e of ecoregions) {
      const { number } = e.data();
      const lv3number = getNumFromRegion(number);
      const letter = getLettersFromRegion(number);
      const docToUpdate = { ...e.data(), lv3number: lv3number, letter: letter };
      await ecoregionsApi.updateDoc(e.id, docToUpdate);
      console.log(`lv3num: ${docToUpdate.lv3number}, letter: ${letter}`)
    };
    // ecoregions.forEach(e => {
    //   const { number } = e.data();
    //   const lv3number = getNumFromRegion(number);
    //   const letter = getLettersFromRegion(number);
    //   const docToUpdate = { ...e.data(), lv3number: lv3number, letter: letter };
    //    ecoregionsApi.updateDoc(e.id, docToUpdate);
    //   console.log(`lv3num: ${docToUpdate.lv3number}, letter: ${letter}`)
    // })
  }
  return (
    <div>
      <h3>EcoregionManager</h3>
      <Button onClick={addlvl3}>add level 3 numbers</Button>
    </div>
  )
}

export default EcoregionManager