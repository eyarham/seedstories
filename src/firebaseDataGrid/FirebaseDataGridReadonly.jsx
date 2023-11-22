import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const FirebaseDataGridReadonly = ({ collectionString, fields,  filters }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const setRowsFromDocs = docs => setRows(docs.map(d => ({ ...d.data(), id: d.id })));
  useEffect(() => {
    const entriesApi = api(db, collectionString);
    if (filters) {
      entriesApi.getDocsByFieldsSub(filters,setRowsFromDocs)
    }
    else {
      entriesApi.getDocsSub(setRowsFromDocs);
    }
  }, [authUser, collectionString, db, filters])
  useEffect(() => {
    const cols = fields.map(f => ({ field: f, headerName: f, width: 200 }));
    setColumns(cols);
  }, [authUser, collectionString, db, fields])
  if (!columns || !rows) return <Spinner />
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
  )
}

export default FirebaseDataGridReadonly