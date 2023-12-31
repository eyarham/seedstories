import React, { useContext } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import FirebaseDataGridReadonly from '../firebaseDataGrid/FirebaseDataGridReadonly';

const fields = ["name", "envelope", "date", "location", "banked"];

const Bank = () => {
  const user = useContext(AuthUserContext);
  return (
    <div>
      <h2>My Bank</h2>
      <p>the seeds you've catalogued</p>
      <FirebaseDataGridReadonly collectionString={"entries"} fields={fields} filters={[{ createdBy: user.uid }, { banked: true }]} />
    </div>
  )
}

export default Bank