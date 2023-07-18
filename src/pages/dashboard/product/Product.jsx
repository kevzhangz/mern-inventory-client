import * as React from 'react';
import productServices from "../../../services/ProductServices";
import auth from '../../../helpers/auth'
import { numberFormat } from "../../../helpers/number";
import CustomTableView from "../../../components/CustomTableView";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Product = () => {
  const token = auth.isAuthenticated().token
  const [product, setProduct] = React.useState(Array)

  React.useEffect(() => {
    productServices.listProduct(token).then((data) => {
      if(data.result){
        setProduct(data.result)
      }
    })
  }, [token])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100,},
    { field: 'name', headerName: 'Nama Produk', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 100},
    { field: 'price', headerName: 'Harga', flex: 1, valueFormatter: params => numberFormat(params.value) },
    { field: 'action', headerName: 'Aksi', flex: 1, renderCell: params => {
      return (
        <>
          <Button variant="contained" component={Link} to={params.row.id}>Ubah</Button>
        </>
      )
    }}
  ];

  return(
    <CustomTableView data={product} columns={columns} menu='Produk' />
  )
}

export default Product;