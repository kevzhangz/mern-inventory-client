import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import auth from '../../../helpers/auth'
import supplierServices from '../../../services/SupplierServices'
import CustomTableView from "../../../components/CustomTableView";
import CustomDialog from '../../../components/CustomDialog';
import NewSupplier from './NewSupplier'
import EditSupplier from './EditSupplier'

const Supplier = () => {
  const token = auth.isAuthenticated().token
  const [supplier, setSupplier] = useState(Array)
  const [change, setChange] = useState(false)

  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState()

  const handleOpen = (type, id=null) => {
    if(type == 'create'){
      setOpenCreate(true)
    } else {
      setSelectedEdit(id)
      setOpenEdit(true)
    }
  };

  const handleClose = (type) => {
    if(type == 'create'){
      setOpenCreate(false)
    } else {
      setOpenEdit(false)
    }
  }

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
        <Button variant="contained" onClick={() => handleOpen('edit', params.row.id)}>Ubah</Button>
        <Button variant="contained" onClick={() => handleDelete(params.row.id)} style={{ marginLeft: 5 }}>Hapus</Button>
      </>)
    }}
  ];

  return(
    <div>
      {/* Supplier List Table */}
      <CustomTableView data={supplier} columns={columns} handleOpen={handleOpen} menu='Supplier' />
      <CustomDialog
        component={<NewSupplier handleClose={() => {handleClose('create')}} setChange={setChange} />} 
        open={openCreate} 
        handleClose={() => {handleClose('create')}}
      />
      <CustomDialog
        component={<EditSupplier id={selectedEdit} handleClose={() => {handleClose('edit')}} setChange={setChange} />} 
        open={openEdit} 
        handleClose={() => {handleClose('edit')}} 
      />
    </div>
  )
}

export default Supplier;