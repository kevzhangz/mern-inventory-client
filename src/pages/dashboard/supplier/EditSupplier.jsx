import { useState, useEffect} from "react";
import auth from '../../../helpers/auth'
import { useNavigate } from "react-router-dom";
import SupplierServices from "../../../services/SupplierServices";
import SupplierForm from "../../../components/SupplierForm";

const EditSupplier = () => {
  const token = auth.isAuthenticated().token
  const id = window.location.pathname.split("/").pop()
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    address: '',
    phone_number: '',
    error: ''
  })

  useEffect(() => {
    SupplierServices.find(id, token).then(data => {
      if(data){
        setValues(data)
      }
    })
  }, [id, token])

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    SupplierServices.update(id, token, values).then(data => {
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
      action="Ubah"
    />
  )
}

export default EditSupplier