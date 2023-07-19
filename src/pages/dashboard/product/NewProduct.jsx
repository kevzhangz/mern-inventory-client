import { useState } from "react";
import auth from '../../../helpers/auth'
import ProductServices from "../../../services/ProductServices";
import ProductForm from "../../../components/ProductForm";

const NewProduct = (props) => {
  const { handleClose, setChange } = props
  const token = auth.isAuthenticated().token
  const [values, setValues] = useState({
    name: '',
    brand: '',
    stock: '',
    price: '',
    error: '',
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    values.price = values.price.replaceAll(',', '')
    ProductServices.create(values, token).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        setChange(true)
        handleClose()
      }
    })
  
  };

  return(
    <ProductForm 
      handleSubmit={handleSubmit} 
      values={values} 
      setValues={setValues} 
      action="Tambah" 
    />
  )

}

export default NewProduct