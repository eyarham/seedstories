import React from 'react';
import FirebaseDataGrid from '../firebaseDataGrid/FirebaseDataGrid';

const Species = () => {
  const fields = ["common name", "genus", "species", "variety", "cultivar", "native range", "ecoregion"];
  return (
    <div>
      <h2>Species</h2>
      <FirebaseDataGrid collectionString={"species"} fields={fields} />
    </div>
  )
}

export default Species