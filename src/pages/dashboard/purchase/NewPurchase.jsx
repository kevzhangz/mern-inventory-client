import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PurchaseForm from "../../../components/PurchaseForm";
import PurchaseServices from "../../../services/PurchaseServices";
import auth from "../../../helpers/auth";

const NewPurchase = () => {
  const token = auth.isAuthenticated().token
  const navigate = useNavigate();
  const [values, setValues] = useState({
    date: '',
    stock: '',
    price: '',
    error: '',
  })
  const [selected, setSelected] = useState({
    supplier: {
      name: 'Pilih Supplier'
    },
    product: {
      name: 'Pilih Barang',
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
        navigate('/dashboard/purchase')
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