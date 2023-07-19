import { useState } from "react";
import auth from "../../../helpers/auth";
import PurchaseForm from "../../../components/PurchaseForm";
import PurchaseServices from "../../../services/PurchaseServices";

const NewPurchase = (props) => {
  const { handleClose, setChange } = props
  const token = auth.isAuthenticated().token
  const [values, setValues] = useState({
    date: '',
    stock: '',
    price: '',
    error: '',
  })

  const [selected, setSelected] = useState({
    supplier: {
      name: ''
    },
    product: {
      name: '',
      price: '',
      stock: ''
    }
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    values.price = values.price.replaceAll(',', '')

    if(!selected.supplier.id || !selected.product.id){
      setValues({...values, error: 'Supplier and Product is required'})
      return
    }

    PurchaseServices.create(values, token, selected.supplier.id, selected.product.id).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        setChange(true)
        handleClose()
      }
    })
  
  };

  return(
    <PurchaseForm 
    token={token}
    handleSubmit={handleSubmit} 
    setSelected={setSelected}
    setValues={setValues}
    values={values}
    selected={selected}
    action="Tambah" />
  )

}

export default NewPurchase