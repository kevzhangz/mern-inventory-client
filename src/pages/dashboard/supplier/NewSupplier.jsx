import { useState } from "react";
import auth from '../../../helpers/auth'
import SupplierServices from "../../../services/SupplierServices";
import SupplierForm from "../../../components/SupplierForm";

const NewSupplier = (props) => {
  const { handleClose, setChange } = props
  const token = auth.isAuthenticated().token
  const [values, setValues] = useState({
    name: '',
    address: '',
    phone_number: '',
    error: ''
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    SupplierServices.create(values, token).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        setChange(true)
        handleClose()
      }
    })
  
  };

  return (
    <SupplierForm
      handleSubmit={handleSubmit}
      values={values}
      setValues={setValues}
      action="Tambah"
    />
  )
}

export default NewSupplier;