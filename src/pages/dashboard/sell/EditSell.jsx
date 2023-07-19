import { useEffect, useState } from "react";
import auth from '../../../helpers/auth'
import { numberFormat } from "../../../helpers/number";
import SellForm from "../../../components/SellForm"
import SellServices from "../../../services/SellServices";
import dayjs from "dayjs";

const NewSell = (props) => {
  const { id, handleClose, setChange } = props
  const token = auth.isAuthenticated().token
  const [values, setValues] = useState({
    buyer: '',
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

  useEffect(() => {
    SellServices.find(id, token).then(data => {
      let { buyer, date, price, quantity, product } = data
      date = dayjs(new Date(date).toISOString())
      price = numberFormat(price)
      product.price = numberFormat(product.price)
      setValues({buyer, date, quantity, price})
      setSelected({product})
    })
  }, [id, token])
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    values.product = selected.product.id
    values.price = selected.product.price.replaceAll(',', '')

    if(!selected.product.id){
      setValues({...values, error: 'Product is required'})
    }

    SellServices.update(id, token, values).then(data => {
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
    action="Ubah" />
  )

}

export default NewSell