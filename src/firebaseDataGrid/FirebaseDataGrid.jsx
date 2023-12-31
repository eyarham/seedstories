import { DeleteForever } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import { UserContext } from '../user/UserContextProvider';
import AddRow from './AddRow';

const FirebaseDataGrid = ({ collectionString, fields, filter, orderByArray }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isEditMode, setIsEditMode] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const user = useContext(UserContext);
  const setRowsFromDocs = docs => setRows(docs.map(d => ({ ...d.data(), id: d.id })));
  useEffect(() => {
    const entriesApi = api(db, collectionString);
    if (filter) {
      entriesApi.getDocsByFieldSub("ecoregion", filter, setRowsFromDocs)
    }
    else {
      entriesApi.getDocsSub(orderByArray || [], setRowsFromDocs);
    }
  }, [authUser, collectionString, db, filter, orderByArray])
  useEffect(() => {
    const deleteEntry = (id) => {
      if (authUser) {
        const entriesApi = api(db, collectionString, authUser.uid);
        entriesApi.deleteDocument(id);
      }
    }
    const cols = fields.map(f => ({ field: f, headerName: f, width: 200, editable: isEditMode }));
    if (isEditMode) {
      cols.push({
        field: "actions", type: 'actions', headerName: "actions", width: 100,
        getActions: params => [
          <GridActionsCellItem
            icon={<DeleteForever />}
            label="Delete"
            onClick={() => deleteEntry(params.id)}
            hidden={!isEditMode}
          />
        ]
      })
    }
    setColumns(cols);
  }, [authUser, collectionString, db, fields, isEditMode])
  useEffect(() => {
    if (user && user.isAdmin) {
      setIsEditMode(true);
    }
    else {
      setIsEditMode(false);
    }
  }, [user])

  const processRowUpdate = async (newRow) => {
    const regionsApi = api(db, collectionString, authUser.uid);
    const { id } = newRow;
    const newData = newRow;
    fields.forEach(f => newData[f] = newData[f] || "");
    await regionsApi.updateDoc(id, newData);
    return newRow;
  };
  const processRowUpdateError = (e) => {
    setErrorMessage(e.message);
  }

  if (!columns || !rows) return <Spinner />
  return (
    <div>
      {isEditMode && <AddRow collectionString={collectionString} fields={fields} />}
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={processRowUpdateError}
      />
      {errorMessage}
    </div>
  )
}

export default FirebaseDataGrid