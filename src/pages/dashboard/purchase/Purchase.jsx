import * as React from 'react';
import auth from '../../../helpers/auth'
import PurchaseServices from "../../../services/PurchaseServices";
import { numberFormat } from "../../../helpers/number";
import CustomTableView from "../../../components/CustomTableView";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Purchase = () => {
  const token = auth.isAuthenticated().token
  const [purchase, setPurchase] = React.useState(Array)
  const [change, setChange] = React.useState(false)

  React.useEffect(() => {
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
          <Button variant="contained" component={Link} to={params.row.id}>Ubah</Button>
          <Button variant="contained" onClick={() => handleDelete(params.row.id)} style={{ marginLeft: 5 }}>Hapus</Button>
        </div>
      )
    }}
  ];

  return(
    <CustomTableView data={purchase} columns={columns} menu='Barang Masuk' />
  )
}

export default Purchase;