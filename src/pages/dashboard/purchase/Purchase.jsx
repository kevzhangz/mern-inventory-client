import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import auth from '../../../helpers/auth'
import { numberFormat } from "../../../helpers/number";
import PurchaseServices from "../../../services/PurchaseServices";
import CustomTableView from "../../../components/CustomTableView";
import CustomDialog from '../../../components/CustomDialog';
import NewPurchase from './NewPurchase'
import EditPurchase from './EditPurchase'

const Purchase = () => {
  const token = auth.isAuthenticated().token
  const [purchase, setPurchase] = useState(Array)
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
    PurchaseServices.listPurchase(token).then((data) => {
      if(data.result){
        setPurchase(data.result)
        setChange(false)
      }
    })
  }, [change, token])

  const handleDelete = (id) => {
    let confirmDelete = confirm('Hapus data barang masuk?')

    if(confirmDelete){
      PurchaseServices.destroy(id, token).then(() => {
        setChange(true)
      })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'supplierName', headerName: 'Supplier', flex: 1, valueGetter: params => params.row.supplier.name },
    { field: 'productName', headerName: 'Nama Produk', flex: 1, valueGetter: params => params.row.product.name},
    { field: 'stock', headerName: 'Jumlah Beli', flex: 1 },
    { field: 'price', headerName: 'Harga', flex: 1, valueFormatter: params => numberFormat(params.value) },
    { field: 'date', headerName: 'Tanggal', flex: 1, valueFormatter: params => new Date(params.value).toISOString().split('T')[0]},
    { field: 'staff', headerName: 'Petugas', flex: 1, valueGetter: params => params.row.user.name},
    { field: 'action', headerName: 'Aksi', flex: 1, renderCell: params => {
      return(
        <div>
          <Button variant="contained" onClick={() => {handleOpen('edit',params.row.id)}}>Ubah</Button>
          <Button variant="contained" onClick={() => handleDelete(params.row.id)} style={{ marginLeft: 5 }}>Hapus</Button>
        </div>
      )
    }}
  ];

  return(
    <div>
      <CustomTableView data={purchase} columns={columns} handleOpen={handleOpen} menu='Barang Masuk' />
      <CustomDialog
        component={<NewPurchase handleClose={() => {handleClose('create')}} setChange={setChange} />} 
        open={openCreate} 
        handleClose={() => {handleClose('create')}}
      />
      <CustomDialog
        component={<EditPurchase id={selectedEdit} handleClose={() => {handleClose('edit')}} setChange={setChange} />} 
        open={openEdit} 
        handleClose={() => {handleClose('edit')}} 
      />
    </div>
  )
}

export default Purchase;