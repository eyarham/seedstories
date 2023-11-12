import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import SeedAdd from './SeedAdd';
// import data from "./data.json";
import { DeleteForever } from '@mui/icons-material';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';

const Seeds = () => {
  const [columns, setColumns] = useState([]);
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  useEffect(() => {
    const deleteEnvelope = (id) => {
      if (authUser) {
        const seedsApi = api(db, "seeds", authUser.uid);
        seedsApi.deleteDocument(id);
      }
    }
    const seedFieldsApi = api(db, "seedFields");
    seedFieldsApi.getDocsSub(c => {
      const cols = c.sort((a, b) => a.data().order - b.data().order)
        .map(d => {
          const { name } = d.data();
          return ({ field: name, headerName: name, editable: true })
        })
      cols.push({
        field: "actions", type: 'actions', headerName: "actions", width: 200,
        getActions: params => [
          <GridActionsCellItem
            icon={<DeleteForever />}
            label="Delete"
            onClick={() => deleteEnvelope(params.id)}
          />
        ]
      })
      return setColumns(cols);
    })
  }, [authUser, db])
  const [rows, setRows] = useState();
  useEffect(() => {
    const seedsApi = api(db, "seeds");
    seedsApi.getDocsSub(docs => {
      const data = docs.map(d => ({ ...d.data(), id: d.id }))

      setRows(data);
    })
  }, [db])

  if (!rows || !columns) return <Spinner />
  const processRowUpdate = (newRow) => {
    const seedFieldsApi = api(db, "seeds", authUser.uid);
    const { id } = newRow
    const newData = newRow;
    delete newData['id'];
    seedFieldsApi.updateDoc(id, newData)
    return newRow;
  };
  return (
    <div>
      Envelopes
      <DataGrid
        rows={rows}
        columns={columns}

        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
      {authUser &&

        <SeedAdd />

      }
    </div>
  )
}

export default Seeds