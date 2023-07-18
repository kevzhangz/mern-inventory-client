import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from '../../../helpers/auth'
import { numberFormat } from "../../../helpers/number";
import PurchaseForm from "../../../components/PurchaseForm";
import PurchaseServices from "../../../services/PurchaseServices";
import dayjs from "dayjs";

const EditPurchase = () => {
  const token = auth.isAuthenticated().token
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop()
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
      stock: '',
    }
  })

  useEffect(() => {
    PurchaseServices.find(id, token).then(data => {
      let {date, stock, price, supplier, product} = data
      date = dayjs(new Date(date).toISOString())
      price = numberFormat(price)
      product.price = numberFormat(product.price)
      setValues({date,stock,price})
      setSelected({supplier, product})
    })
  }, [id, token])
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    values.price = values.price.replaceAll(',', '')
    values.supplier = selected.supplier.id
    values.product = selected.product.id

    PurchaseServices.update(id, token, values).then(data => {
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
    values={values} 
    setValues={setValues}
    selected={selected}
    setSelected={setSelected}
    action="Ubah" />
  )

}

export default EditPurchase