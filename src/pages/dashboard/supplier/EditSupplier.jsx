import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

import { useState, useEffect} from "react";
import auth from '../../../helpers/auth'
import { useNavigate } from "react-router-dom";
import SupplierServices from "../../../services/SupplierServices";

const EditSupplier = () => {
  const token = auth.isAuthenticated().token
  const id = window.location.pathname.split("/").pop()
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    address: '',
    phone_number: '',
    error: ''
  })

  useEffect(() => {
    SupplierServices.find(id, token).then(data => {
      if(data){
        setValues(data)
      }
    })
  }, [id, token])

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    SupplierServices.update(id, token, values).then(data => {
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
          Ubah Data Supplier
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
              value={values.name}
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
              value={values.address}
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
              value={values.phone_number}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, float: 'left' }}
        >
        Ubah
        </Button>
      </Box>
    </Box>
  )
}

export default EditSupplier