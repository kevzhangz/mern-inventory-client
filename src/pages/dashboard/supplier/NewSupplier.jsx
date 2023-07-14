import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

import { useState } from "react";
import auth from '../../../helpers/auth'
import { useNavigate } from "react-router-dom";
import SupplierServices from "../../../services/SupplierServices";

const NewSupplier = () => {
  const token = auth.isAuthenticated().token
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    address: '',
    phone_number: '',
    error: ''
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    SupplierServices.create(values, token).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        navigate('/dashboard/supplier')
      }
    })
  
  };
  
  const handleChange = name => event => {
    let value = event.target.value
    setValues({...values, [name]: value })
  }

  return (
    <Box>
      <Typography component="h1" variant="h5" align="left">
          Tambah Data Supplier
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} align="left">
        {
          values.error && (<Typography component="p" color="error">
            {values.error}
          </Typography>)
        }
        <Grid container justifyContent="flex-start">
          <Grid item md={4}>
            <TextField
              margin="normal"
              required
              id="name"
              label="Nama Supplier"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange('name')}
              sx={{ width: 400 }}
            />
            <TextField
              margin="normal"
              required
              name="address"
              label="Alamat"
              id="address"
              autoComplete="address"
              onChange={handleChange('address')}
              sx={{ width: 400 }}
            />
            <TextField
            margin="normal"
            required
            name="phone_number"
            label="No.Telp"
            id="phone_number"
            autoComplete="phone_number"
            onChange={handleChange('phone_number')}
            sx={{ width: 200 }}
            />
          </Grid>
        </Grid>
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

export default NewSupplier;