import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

const FirebaseDataGridReadonly = ({ collectionString, fields, filters, sortComparators, orderByArray }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const { db } = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const setRowsFromDocs = docs => setRows(docs.map(d => ({ ...d.data(), id: d.id })));
  useEffect(() => {
    const entriesApi = api(db, collectionString);
    if (filters) {
      entriesApi.getDocsByFieldsSub(filters, orderByArray || [], setRowsFromDocs)
    }
    else {
      entriesApi.getDocsSub(orderByArray || [], setRowsFromDocs);
    }
  }, [authUser, collectionString, db, filters, orderByArray])
  useEffect(() => {
    const cols = fields.map(f => ({ field: f, headerName: f, width: 200 }));
    if (sortComparators && sortComparators.length === 1) {
      const comparator = sortComparators[0];
      const colArr = cols.filter(c => c.field === comparator.field);
      if (colArr && colArr.length === 1) {
        const col = colArr[0];
        col.sortComparator = comparator.comparator
      }
    }
    setColumns(cols);
  }, [authUser, collectionString, db, fields, sortComparators])
  if (!columns || !rows) return <Spinner />
  return (
    <div>
      <DataGrid
        sx={{ marginBottom: 10 }}
        rows={rows}
        columns={columns}
      />
    </div>
  )
}

export default FirebaseDataGridReadonly