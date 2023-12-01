import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FirebaseDataGridReadonly from '../firebaseDataGrid/FirebaseDataGridReadonly';
import EcoregionFinder from './EcoregionFinder';

const collectionString = "ecoregions";
const fields = ["number", "name", "range"]
const Ecoregions = () => {
  const [selectedZip, setSelectedZip] = useState("");
  const params = useSearchParams();
  useEffect(() => {
    if (params && params[0]) {
      const zip = params[0].get("zip")
      zip && setSelectedZip(Number(zip))
    }
  }, [params])
  const onSearchSubmit = (zip) => {
    setSelectedZip(Number(zip));
  }

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
  const numFieldComparator = (a, b) => {
    const numA = getNumFromRegion(a);
    const numB = getNumFromRegion(b);
    if (numA !== numB) {
      return numA - numB
    }
    else {
      const letA = getLettersFromRegion(a)
      const letB = getLettersFromRegion(b);
      return letA.localeCompare(letB);
    }
  }
  return (
    <div>
      <h2>Ecoregions</h2>
      <EcoregionFinder onSearchSubmit={onSearchSubmit} initialZip={selectedZip} />
      <FirebaseDataGridReadonly
        collectionString={collectionString}
        fields={fields}
        orderByArray={["lv3num", "letter"]}
        fieldContainsArray={selectedZip && [{ "zips": selectedZip }]}
        sortComparators={[{ field: "number", comparator: numFieldComparator }]} />
    </div>
  )
}

export default Ecoregions