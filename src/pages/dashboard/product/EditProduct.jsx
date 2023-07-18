import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProductServices from "../../../services/ProductServices"
import auth from "../../../helpers/auth"
import ProductForm from "../../../components/ProductForm"
import { numberFormat } from "../../../helpers/number"

const EditProduct = () => {
  const navigate = useNavigate()
  const id = window.location.pathname.split("/").pop()
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
        navigate('/dashboard/product')
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