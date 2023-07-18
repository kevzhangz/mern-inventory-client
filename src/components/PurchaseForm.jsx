import { Box, Button, TextField, Typography, Grid, Autocomplete } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { numberFormat } from "../helpers/number";
import { useEffect, useState } from "react";
import SupplierServices from "../services/SupplierServices";
import ProductServices from "../services/ProductServices";

const PurchaseForm = (props) => {
  const { action, values, setValues, selected, setSelected, handleSubmit, token } = props
  const [supplierOptions, setSupplierOptions] = useState([])
  const [productOptions, setProductOptions] = useState([])

  useEffect(() => {
    const setOptions = () => {
      SupplierServices.listSupplier(token).then((data) => {
        if(data.result.length != 0){
          let options = data.result.map(({id, name}) => {
            return {id, name}
          })
          setSupplierOptions(options)
        }
      })
  
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

  const handleChange = name => (event, newValue) => {
    let value = ''
    if(name == 'price' && event.target.value != ''){
      value = numberFormat(event.target.value)
    } else if(name == 'supplier' || name == 'product'){
      if(name == 'product'){
        productOptions.find(({id, name: option, price, stock}) => {
          if(option == newValue){
            setSelected({...selected, [name]: {
              id,
              stock,
              price: numberFormat(price),
              name: option
            }})
          }
        })
      } else {
        supplierOptions.find(({id, name: option}) => {
          if(option == newValue){
            setSelected({...selected, [name]: {
              id,
              name: option
            }})
          }
        })
      }
      return
    } else if(name == 'date'){
      value = event.$d
    } else {
      value = event.target.value
    }

    if(name == 'supplier' || name == 'product'){
      setSelected({...selected, [name]: value})
    } else {
      setValues({...values, [name]: value })
    }
  }

  return(
    <Box>
      <Typography component="h1" align="left" variant="h5">
          {action} Data Barang Masuk
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {
          values?.error ? (<Typography component="p" color="error">
            {values.error}
          </Typography>) : ''
        }
        <Grid container>
          <Grid item xs={9}>
            <Grid item xs={5} sx={{ marginTop: '10px' }}>
              <Autocomplete
                freeSolo
                name="supplier"
                onChange={handleChange('supplier')}
                id="controllable-supplier"
                isOptionEqualToValue={(option) => option == selected.supplier}
                options={supplierOptions.map(options => options.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Supplier" />}
                value={selected.supplier.name}
                disableClearable
                forcePopupIcon
              />
            </Grid>
            <Grid item xs={5} sx={{ marginTop: '20px' }}>
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
              />
            </Grid>
            <Grid item xs={4} sx={{ marginTop: '10px' }}>
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
            <Grid item sm={3} md={2} lg={2}>
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
                InputProps={{ inputProps: { min: 1 } }}
                helperText={`Stock: ${selected.product.stock}`}
              />
            </Grid>
            <Grid item xs={3}>
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
                helperText={`Harga Jual: ${selected.product.price}`}
              />
            </Grid>
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

export default PurchaseForm