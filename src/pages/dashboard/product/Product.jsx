import { Button, Grid, Typography } from "@mui/material";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import productServices from "../../../services/ProductServices";
import authHelpers from '../../../helpers/auth'
import { numberFormat } from "../../../helpers/number";
import { Link } from "react-router-dom";

const ProductTable = (props) => {
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

const Product = () => {
  const token = authHelpers.isAuthenticated().token
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
  ];

  return(
    <div>
      <Grid container spacing="1">
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ textAlign: 'left' }}>
            Data Barang
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button component={Link} to='new' variant="contained" sx={{ float: 'right' }}>Tambah Data</Button>
        </Grid>
      </Grid>
      <ProductTable data={product} columns={columns}/>
    </div>
  )
}

export default Product;