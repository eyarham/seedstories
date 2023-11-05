import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import data from "./data.json"

const columns = [
  {field: "Name", headerName: "Name"},
  {field: "Colonized ID", headerName: "Colonized ID"}
]

const Seeds = () => {
  const [rows, setRows] = useState();
  useEffect(()=>{
    setRows(data);
  },[])
  if(!rows) return <span>spinner</span>
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
    </div>
  )
}

export default Seeds