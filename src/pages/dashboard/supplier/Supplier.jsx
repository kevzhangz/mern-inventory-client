import { Button, Grid, Typography } from "@mui/material";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import authHelpers from '../../../helpers/auth'
import supplierServices from '../../../services/SupplierServices'
import { Link } from "react-router-dom";


const SupplierTable = (props) => {
  return (
    <div style={{ height: 500, width: '100%', marginTop: '30px' }}>
      <DataGrid
        rows={props.data}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[10, 25, 100, 200]}
      />
    </div>
  );
}

const Supplier = () => {
  const token = authHelpers.isAuthenticated().token
  const [supplier, setSupplier] = React.useState(Array)
  const [change, setChange] = React.useState(false)

  React.useEffect(() => {
    supplierServices.listSupplier(token).then((data) => {
      if(data.result){
        setSupplier(data.result)
        setChange(false)
      }
    })
  }, [change, token])

  const handleDelete = (id) => {
    supplierServices.destroy(id, token).then(() => {
      setChange(true)
    })
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'name', headerName: 'Nama Supplier', flex: 1 },
    { field: 'address', headerName: 'Alamat', flex: 1 },
    { field: 'phone_number', headerName: 'No.Telp', flex: 1 },
    { field: 'action', headerName: 'Aksi', flex: 1, renderCell: (params) => {
      return (<>
        <Button variant="contained" onClick={() => handleDelete(params.row.id)}>Hapus</Button>
        <Button variant="contained" component={Link} to={`${params.row.id}`} style={{ marginLeft: 5 }}>Ubah</Button>
      </>)
    }}
  ];

  return(
    <div>
      <Grid container spacing="1">
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ textAlign: 'left' }}>
            Data Supplier
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button component={Link} to="new" variant="contained" sx={{ float: 'right' }}>Tambah Data</Button>
        </Grid>
      </Grid>
      <SupplierTable data={supplier} columns={columns}/>
    </div>
  )
}

export default Supplier;