import React, { useState } from 'react';
import RegionPicker from '../ecoregions/EcoregionPicker';
import FirebaseDataGrid from '../firebaseDataGrid/FirebaseDataGrid';

const Species = () => {
  const [selectedEcoregion, setSelectedEcoregion] = useState()

  const fields = ["common name", "genus", "species", "variety", "cultivar", "native range", "ecoregion"];

  return (
    <div>
      <h2>Species</h2>
      <RegionPicker setSelectedEcoregion={setSelectedEcoregion} />
      <FirebaseDataGrid collectionString={"species"} fields={fields} filter={selectedEcoregion} />
    </div>
  )
}

export default Species