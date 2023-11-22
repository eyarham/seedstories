import { DeleteForever, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import Entry from './Entry';

const Entries = () => {
  const [rows, setRows] = useState();
  const [openEntry, setOpenEntry] = useState();
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
  const editEntry = (id) => {
    const entryArr = rows.filter(r => r.id === id);
    if (entryArr.length === 1)//there can only be one
    {
      setOpenEntry(entryArr[0])
    }
  }
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "envelope", headerName: "Envelope", width: 200 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "banked", headerName: "Banked?", width: 100, valueGetter: params => { return params.value ? "yes" : "no" } },
    {
      field: "actions", type: 'actions', headerName: "actions", width: 100,
      getActions: params => [
        <GridActionsCellItem
          icon={<DeleteForever />}
          label="Delete"
          onClick={() => deleteEntry(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editEntry(params.id)}
        />
      ]
    }
  ]
  return (
    <div>
      {rows && columns &&
        <DataGrid rows={rows} columns={columns} />
      }
      {openEntry &&
        <div>
          <Button onClick={() => setOpenEntry()}>X</Button>
          <Entry entry={openEntry} />
        </div>
      }
    </div>
  )
}

export default Entries