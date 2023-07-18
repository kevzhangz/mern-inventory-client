import { useState, useEffect } from 'react';
import auth from '../../../helpers/auth'
import SellServices from "../../../services/SellServices";
import { numberFormat } from "../../../helpers/number";
import CustomTableView from "../../../components/CustomTableView";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Sell = () => {
  const token = auth.isAuthenticated().token
  const [sell, setSell] = useState(Array)
  const [change, setChange] = useState(false)

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
          <Button variant="contained" component={Link} to={params.row.id}>Ubah</Button>
          <Button variant="contained" onClick={() => handleDelete(params.row.id)} style={{ marginLeft: 5 }}>Hapus</Button>
        </div>
      )
    }}
  ];

  return(
    <CustomTableView data={sell} columns={columns} menu='Barang Keluar' />
  )
}

export default Sell;