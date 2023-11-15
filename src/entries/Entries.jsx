import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import EntryAdd from './EntryAdd';
import { DeleteForever } from '@mui/icons-material';

const Entries = () => {
  const [rows, setRows] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  useEffect(() => {
    const entriesApi = api(db, "entries");

    entriesApi.getDocsForCurrentUserSub(authUser, docs => setRows(docs.map(d => ({ ...d.data(), id: d.id }))))
  }, [authUser, db])
  const deleteEntry = (id) => {
    if (authUser) {
      const entriesApi = api(db, "entries", authUser.uid);
      entriesApi.deleteDocument(id);
    }
  }
  const columns = [
    { field: "envelope", headerName: "Envelope", width: 200 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "actions", type: 'actions', headerName: "actions", width: 100,
      getActions: params => [
        <GridActionsCellItem
          icon={<DeleteForever />}
          label="Delete"
          onClick={() => deleteEntry(params.id)}
        />
      ]
    }
  ]
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