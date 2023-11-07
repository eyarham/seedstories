import { DeleteForever } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
const SeedFields = () => {
  const authUser = useContext(AuthUserContext);
  const [seedFields, setSeedFields] = useState();
  const [newFieldName, setNewFieldName] = useState();
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const seedFieldsApi = api(db, "seedFields");
    seedFieldsApi.getDocsSub(docs => setSeedFields(docs.map(f => ({ ...f.data(), id: f.id }))))
  }, [db])

  const onChangeNewFieldName = e => {
    setNewFieldName(e.target.value)
  }
  const onNewFieldSubmit = e => {
    e.preventDefault();
    const seedFieldsApi = api(db, "seedFields", authUser.uid);
    seedFieldsApi.createDoc({ name: newFieldName, order: 99 })
  }
  if (!seedFields) return <Spinner />
  const deleteField = id => {
    const seedFieldsApi = api(db, "seedFields", authUser.uid);
    seedFieldsApi.deleteDocument(id)
  }
  const columns = [
    { field: "name", headerName: "name", width: 200, editable: true },
    { field: "order", headerName: "order", type: 'number', width: 200, editable: true },
    {
      field: "actions", type: 'actions', headerName: "actions", width: 200,
      getActions: params => [
        <GridActionsCellItem
          icon={<DeleteForever />}
          label="Delete"
          onClick={() => deleteField(params.id)}
        />
      ]
    }
  ]
  const processRowUpdate = (newRow) => {
    const seedFieldsApi = api(db, "seedFields", authUser.uid);
    const { id } = newRow
    const newData = newRow;
    delete newData['id'];
    seedFieldsApi.updateDoc(id, newData)
    return newRow;
  };
  return (
    <div>
      Envelope Fields
      <div>
        <DataGrid
          rows={seedFields}
          columns={columns}
          editMode='row'
          processRowUpdate={processRowUpdate}
          initialState={{
            sorting: {
              sortModel: [{ field: 'order', sort: 'asc' }],
            },
          }}
        />
      </div>
      <div>
        <Box component="form" onSubmit={onNewFieldSubmit}>
          <TextField placeholder="field name" onChange={onChangeNewFieldName} />
        </Box>
      </div>
    </div>
  )
}

export default SeedFields