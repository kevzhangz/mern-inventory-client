import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { numberFormat } from "../../../helpers/number";
import auth from '../../../helpers/auth'
import productServices from "../../../services/ProductServices";
import CustomTableView from "../../../components/CustomTableView";
import CustomDialog from '../../../components/CustomDialog';
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";

const Product = () => {
  const token = auth.isAuthenticated().token
  const [product, setProduct] = useState(Array)
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
    console.log('wat')
    productServices.listProduct(token).then((data) => {
      if(data.result){
        setProduct(data.result)
        setChange(false)
      }
    })
  }, [change, token])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100,},
    { field: 'name', headerName: 'Nama Produk', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 100},
    { field: 'price', headerName: 'Harga', flex: 1, valueFormatter: params => numberFormat(params.value) },
    { field: 'action', headerName: 'Aksi', flex: 1, renderCell: params => {
      return (
        <>
          <Button variant="contained" onClick={() => {handleOpen('edit', params.row.id)}}>Ubah</Button>
        </>
      )
    }}
  ];

  return(
    <div>
      <CustomTableView data={product} columns={columns} handleOpen={handleOpen} menu='Produk' />
      <CustomDialog
        component={<NewProduct handleClose={() => {handleClose('create')}} setChange={setChange} />} 
        open={openCreate} 
        handleClose={() => {handleClose('create')}}
      />
      <CustomDialog
        component={<EditProduct id={selectedEdit} handleClose={() => {handleClose('edit')}} setChange={setChange} />} 
        open={openEdit} 
        handleClose={() => {handleClose('edit')}} 
      />
    </div>

  )
}

export default Product;