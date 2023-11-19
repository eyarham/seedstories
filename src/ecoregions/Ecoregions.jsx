import React from 'react';
import FirebaseDataGrid from '../firebaseDataGrid/FirebaseDataGrid';

const collectionString = "ecoregions";
const fields = ["number", "name", "range"]
const Ecoregions = () => {
  return (
    <div>
      <h2>Ecoregions</h2>
      <FirebaseDataGrid collectionString={collectionString} fields={fields} />
    </div>
  )
}

export default Ecoregions