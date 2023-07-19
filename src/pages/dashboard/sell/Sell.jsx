import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import auth from '../../../helpers/auth'
import { numberFormat } from "../../../helpers/number";
import SellServices from "../../../services/SellServices";
import CustomTableView from "../../../components/CustomTableView";
import CustomDialog from '../../../components/CustomDialog';
import NewSell from './NewSell'
import EditSell from './EditSell'

const Sell = () => {
  const token = auth.isAuthenticated().token
  const [sell, setSell] = useState(Array)
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
    SellServices.listSell(token).then((data) => {
      if(data.result){
        setSell(data.result)
        setChange(false)
      }
    })
  }, [change, token])

  const handleDelete = (id) => {
    let confirmDelete = confirm('Hapus data barang keluar?')

    if(confirmDelete){
      SellServices.destroy(id, token).then(() => {
        setChange(true)
      })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'buyer', headerName: 'Nama Pembeli', flex: 1 },
    { field: 'productName', headerName: 'Nama Produk', flex: 1, valueGetter: params => params.row.product.name},
    { field: 'quantity', headerName: 'Jumlah Beli', flex: 1 },
    { field: 'price', headerName: 'Harga', flex: 1, valueFormatter: params => numberFormat(params.value) },
    { field: 'date', headerName: 'Tanggal', flex: 1, valueFormatter: params => new Date(params.value).toISOString().split('T')[0]},
    { field: 'staff', headerName: 'Petugas', flex: 1, valueGetter: params => params.row.user.name},
    { field: 'action', headerName: 'Aksi', flex: 1, renderCell: params => {
      return(
        <div>
          <Button variant="contained" onClick={() => handleOpen('edit', params.row.id)}>Ubah</Button>
          <Button variant="contained" onClick={() => handleDelete(params.row.id)} style={{ marginLeft: 5 }}>Hapus</Button>
        </div>
      )
    }}
  ];

  return(
    <div>
      <CustomTableView data={sell} columns={columns} handleOpen={handleOpen} menu='Barang Keluar' />
      <CustomDialog
        component={<NewSell handleClose={() => handleClose('create')} setChange={setChange} />} 
        open={openCreate} 
        handleClose={() => handleClose('create')}
      />
      <CustomDialog
        component={<EditSell id={selectedEdit} handleClose={() => handleClose('edit')} setChange={setChange} />} 
        open={openEdit} 
        handleClose={() => handleClose('edit')} 
      />
    </div>
  )
}

export default Sell;