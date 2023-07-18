import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from '../../../helpers/auth'
import SellForm from "../../../components/SellForm"
import SellServices from "../../../services/SellServices";
import dayjs from "dayjs";
import { numberFormat } from "../../../helpers/number";

const NewSell = () => {
  const token = auth.isAuthenticated().token
  const id = window.location.pathname.split("/").pop()
  const navigate = useNavigate();
  const [values, setValues] = useState({
    buyer: '',
    date: '',
    quantity: '',
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
      let { buyer, date, quantity, product } = data
      date = dayjs(new Date(date).toISOString())
      product.price = numberFormat(product.price)
      setValues({buyer, date, quantity})
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
        navigate('/dashboard/sell')
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