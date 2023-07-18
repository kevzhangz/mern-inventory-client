import { useState } from "react";
import auth from '../../../helpers/auth'
import { useNavigate } from "react-router-dom";
import SupplierServices from "../../../services/SupplierServices";
import SupplierForm from "../../../components/SupplierForm";

const NewSupplier = () => {
  const token = auth.isAuthenticated().token
  const navigate = useNavigate();
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
        navigate('/dashboard/supplier')
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