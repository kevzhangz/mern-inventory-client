import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import auth from '../../../helpers/auth'
import { useNavigate } from "react-router-dom";
import ProductServices from "../../../services/ProductServices";
import { numberFormat } from "../../../helpers/number";

const NewProduct = () => {
  const token = auth.isAuthenticated().token
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    brand: '',
    stock: '',
    price: '',
    error: '',
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    ProductServices.create(values, token).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        navigate('/dashboard/product')
      }
    })
  
  };
  
  const handleChange = name => event => {
    let value = event.target.value
    if(name == 'price' && event.target.value != ''){
      value = value.replaceAll(',', '')
      event.target.value = numberFormat(event.target.value)
    }
    setValues({...values, [name]: value })
  }

  return(
    <Box>
      <Typography component="h1" align="left" variant="h5">
          Tambah Data Produk
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {
          values.error && (<Typography component="p" color="error">
            {values.error}
          </Typography>)
        }
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nama Produk"
          name="name"
          autoComplete="name"
          autoFocus
          onChange={handleChange('name')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="brand"
          label="Brand"
          id="brand"
          autoComplete="brand"
          onChange={handleChange('brand')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="stock"
          label="Stock"
          id="stock"
          autoComplete="stock"
          onChange={handleChange('stock')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="price"
          label="Harga"
          id="price"
          autoComplete="price"
          onChange={handleChange('price')}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, float: 'left' }}
        >
          Tambah
        </Button>
      </Box>
    </Box>
  )

}

export default NewProduct