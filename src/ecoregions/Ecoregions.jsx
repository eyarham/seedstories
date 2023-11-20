import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FirebaseDataGrid from '../firebaseDataGrid/FirebaseDataGrid';
import EcoregionFinder from './EcoregionFinder';

const collectionString = "ecoregions";
const fields = ["number", "name", "range"]
const Ecoregions = () => {
  const [selectedZip, setSelectedZip] = useState();
  const params = useSearchParams();
  useEffect(() => {
    if (params && params[0]) {
      const zip = params[0].get("zip")
      zip && setSelectedZip(zip)
    }
  }, [params])
  const onSearchSubmit = (zip) => {
    setSelectedZip(zip);
  }
  return (
    <div>
      <h2>Ecoregions</h2>
      <EcoregionFinder onSearchSubmit={onSearchSubmit} initialZip={selectedZip} />
      <FirebaseDataGrid collectionString={collectionString} fields={fields} />
    </div>
  )
}

export default Ecoregions