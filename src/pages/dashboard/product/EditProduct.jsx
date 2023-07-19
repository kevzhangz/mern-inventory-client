import { useEffect, useState } from "react"
import auth from "../../../helpers/auth"
import { numberFormat } from "../../../helpers/number"
import ProductServices from "../../../services/ProductServices"
import ProductForm from "../../../components/ProductForm"

const EditProduct = (props) => {
  const { id, handleClose, setChange } = props

  const token = auth.isAuthenticated().token
  const [values, setValues] = useState({
    name: '',
    brand: '',
    stock: '',
    price: '',
    error: '',
  })

  useEffect(() => {
    ProductServices.find(id, token).then((data) => {
      if(data){
        data.price = numberFormat(data.price)
        setValues(data)
      }
    })
  }, [id, token])

  const handleSubmit = (event) => {
    event.preventDefault();

    values.price = values.price.replaceAll(',', '')
    ProductServices.update(values.id, token, values).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        setChange(true)
        handleClose()
      }
    })
  };

  return (
    <ProductForm
     handleSubmit={handleSubmit} 
     values={values} 
     setValues={setValues} 
     action="Ubah" 
    />
  )
}

export default EditProduct