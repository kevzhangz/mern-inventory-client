import { Box, Button, Grid, TextField, Typography } from "@mui/material"

const SupplierForm = (props) => {
  const {handleSubmit, values, setValues, action} = props

  const handleChange = name => event => {
    let value = event.target.value
    setValues({...values, [name]: value })
  }

  return (
    <Box>
      <Typography component="h1" variant="h5" align="left">
          {action} Data Supplier
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
        Tambah
        </Button>
      </Box>
    </Box>
  )
}


export default SupplierForm