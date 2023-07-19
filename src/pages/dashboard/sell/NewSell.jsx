import { useState } from "react";
import auth from '../../../helpers/auth'
import SellForm from "../../../components/SellForm"
import SellServices from "../../../services/SellServices";

const NewSell = (props) => {
  const { handleClose, setChange } = props
  const token = auth.isAuthenticated().token
  const [values, setValues] = useState({
    name: '',
    date: '',
    quantity: '',
    price: '',
    error: '',
  })
  
  const [selected, setSelected] = useState({
    product: {
      name: '',
      price: '',
      stock: '',
    }
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();

    values.price = selected.product.price.replaceAll(',', '')
    if(!selected.product.id){
      setValues({...values, error: 'Product is required'})
    }

    SellServices.create(values, token, selected.product.id).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        setChange(true)
        handleClose()
      }
    })
  
  };

  return(
    <SellForm
    token={token} 
    handleSubmit={handleSubmit} 
    values={values}
    setValues={setValues}
    selected={selected}
    setSelected={setSelected}
    action="Tambah" />
  )

}

export default NewSell