import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import SeedAdd from './SeedAdd';
// import data from "./data.json";
import { Link } from 'react-router-dom';

const Seeds = () => {
  const [columns, setColumns] = useState([]);
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const seedFieldsApi = api(db, "seedFields");
    seedFieldsApi.getDocsSub(c => {
      const cols = c.sort(a=>a.data().order)
      .map(d => {
        const { name } = d.data();
        return ({ field: name, headerName: name })
      })
      return setColumns(cols);
    })
  }, [db])
  const [rows, setRows] = useState();
  useEffect(() => {
    const seedsApi = api(db, "seeds");
    seedsApi.getDocsSub(d => {
      const data = d.map((d, i) => ({ ...d.data(), id: i}))

    setRows(data);
  })
}, [db])

if (!rows) return <span>spinner</span>
return (
  <div>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
    <SeedAdd />
    <Link to="/seedFields">seed fields</Link>
  </div>
)
}

export default Seeds