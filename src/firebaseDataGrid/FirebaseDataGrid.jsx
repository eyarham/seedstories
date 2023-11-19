import { DeleteForever } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import { UserContext } from '../user/UserContextProvider';
import AddRow from './AddRow';

const FirebaseDataGrid = ({ collectionString, fields }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isEditMode, setIsEditMode] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const user = useContext(UserContext);
  useEffect(() => {
    const entriesApi = api(db, collectionString);
    entriesApi.getDocsSub(docs => setRows(docs.map(d => ({ ...d.data(), id: d.id }))));
  }, [authUser, collectionString, db])
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
        editMode="row"
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={processRowUpdateError}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
      />
      {errorMessage}
    </div>
  )
}

export default FirebaseDataGrid