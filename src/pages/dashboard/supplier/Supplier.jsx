import { useState, useEffect } from 'react';
import authHelpers from '../../../helpers/auth'
import supplierServices from '../../../services/SupplierServices'
import CustomTableView from "../../../components/CustomTableView";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

const Supplier = () => {
  const token = authHelpers.isAuthenticated().token
  const [supplier, setSupplier] = useState(Array)
  const [change, setChange] = useState(false)

  useEffect(() => {
    supplierServices.listSupplier(token).then((data) => {
      if(data.result){
        setSupplier(data.result)
        setChange(false)
      }
    })
  }, [change, token])

  const handleDelete = (id) => {
    let confirmDelete = confirm('Hapus data supplier?')

    if(confirmDelete){
      supplierServices.destroy(id, token).then(() => {
        setChange(true)
      })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'name', headerName: 'Nama Supplier', flex: 1 },
    { field: 'address', headerName: 'Alamat', flex: 1 },
    { field: 'phone_number', headerName: 'No.Telp', flex: 1 },
    { field: 'action', headerName: 'Aksi', flex: 1, renderCell: (params) => {
      return (<>
        <Button variant="contained" component={Link} to={params.row.id}>Ubah</Button>
        <Button variant="contained" onClick={() => handleDelete(params.row.id)} style={{ marginLeft: 5 }}>Hapus</Button>
      </>)
    }}
  ];

  return(
    <CustomTableView data={supplier} columns={columns} menu='Supplier' />
  )
}

export default Supplier;