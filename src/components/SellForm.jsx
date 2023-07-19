import { Box, Button, TextField, Typography, Grid, Autocomplete } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { numberFormat } from "../helpers/number";
import ProductServices from "../services/ProductServices";
import { useState, useEffect } from "react";

const SellForm = (props) => {
  const { action, values, setValues, selected, setSelected, handleSubmit, token} = props
  const [productOptions, setProductOptions] = useState([])

  const handleChange = name => (event, newValue) => {
    let value = ''
    if(name == 'price' && event.target.value != ''){
      value = numberFormat(event.target.value)
    } else if(name == 'product'){
      productOptions.find(({id, name: option, price, stock}) => {
        if(option == newValue){
          let selectedOption = {
            id,
            name: option,
            price: numberFormat(price),
            stock: numberFormat(stock)
          }
          setSelected({...selected, [name]:selectedOption})
        }
      })
      return
    } else if(name == 'date'){
      value = event.$d
    } else {
      value = event.target.value
    }

    setValues({...values, [name]: value })
  }

  useEffect(() => {
    const setOptions = () => {
      ProductServices.listProduct(token).then(data => {
        if(data.result.length != 0){
          let options = data.result.map(({id, name, price, stock}) => {
            return {id, name, price, stock}
          })
  
          setProductOptions(options)
        }
      })
    }

    setOptions()
  }, [token])

  return(
    <Box>
      <Typography component="h1" align="left" variant="h5">
          {action} Data Barang Keluar
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {
          values?.error ? (<Typography component="p" color="error">
            {values.error}
          </Typography>) : ''
        }
        <Grid container columnSpacing={2}>
          <Grid item xs={7}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="buyer"
              label="Nama Pembeli"
              id="buyer"
              autoComplete="buyer"
              onChange={handleChange('buyer')}
              value={values.buyer}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '10px' }}>
            <Autocomplete
              freeSolo
              name="product"
              onChange={handleChange('product')}
              id="controllable-product"
              isOptionEqualToValue={(option) => option == selected.product}
              options={productOptions.map(options => options.name)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Product" />}
              value={selected.product.name}
              disableClearable
              forcePopupIcon
              disabled={action == 'Ubah'}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '10px', marginBottom: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Tanggal"
                  name="date"
                  inputFormat="YYYY-MM-DD"
                  id="date"
                  value={values.date}
                  onChange={handleChange('date')}
                  slotProps={{ textField: { variant: 'outlined', error: false } }}
                />
              </DemoContainer>
            </LocalizationProvider>
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
              disabled
              value={selected.product.stock || 0}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="Jumlah Beli"
              id="quantity"
              type="number"
              autoComplete="quantity"
              disabled={action == 'Ubah'}
              onChange={handleChange('quantity')}
              value={values.quantity}
              InputProps={{ inputProps: { min: 1 } }}
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
              value={action == 'Ubah' ? values.price : selected.product.price }
              disabled
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

export default SellForm