import { Box, Button, TextField, Typography, Grid } from "@mui/material"
import { numberFormat } from "../helpers/number"

const ProductForm = (props) => {
  const {handleSubmit, values, setValues, action }  = props

  const handleChange = name => event => {
    if(name == 'price' && event.target.value != ''){
      event.target.value = numberFormat(event.target.value)
    }
    setValues({...values, [name]: event.target.value })
  }

  return(
    <Box>
      <Typography component="h1" align="left" variant="h5">
          {action} Data Produk
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {
          values?.error ? (<Typography component="p" color="error">
            {values.error}
          </Typography>) : ''
        }
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
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
              value={values.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="brand"
              label="Brand"
              id="brand"
              autoComplete="brand"
              onChange={handleChange('brand')}
              value={values.brand}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="stock"
              label="Stock"
              id="stock"
              type="number"
              autoComplete="stock"
              disabled={action == 'Ubah'}
              onChange={handleChange('stock')}
              value={values.stock}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Harga"
              id="price"
              autoComplete="price"
              onChange={handleChange('price')}
              value={values.price}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, float: 'left' }}
        >
          {action}
        </Button>
      </Box>
    </Box>
  )
}

export default ProductForm