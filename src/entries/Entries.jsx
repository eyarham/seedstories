import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import EntryAdd from './EntryAdd';

const columns = [
  { field: "envelope", headerName: "Envelope" },
  { field: "date", headerName: "Date" },  
  { field: "location", headerName: "Location" }
]
const Entries = () => {
  const [rows, setRows] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  useEffect(() => {
    const entriesApi = api(db, "entries");

    entriesApi.getDocsForCurrentUserSub(authUser, docs => setRows(docs.map(d => ({ ...d.data(), id: d.id }))))
  }, [authUser, db])
  return (
    <div>
      {rows && columns &&
        <DataGrid rows={rows} columns={columns} />
      }
      <EntryAdd />
    </div>
  )
}

export default Entries