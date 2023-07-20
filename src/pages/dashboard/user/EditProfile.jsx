import ProfileForm from "../../../components/ProfileForm"
import auth from "../../../helpers/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthServices from "../../../services/AuthServices"

const EditProfile = () => {
  const navigate = useNavigate()
  const jwt = auth.isAuthenticated()
  const [values, setValues] = useState({
    id: jwt.user.id,
    username: jwt.user.username,
    name: jwt.user.name,
    email: jwt.user.email,
    old_password: '',
    new_password: '',
  })

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    AuthServices.update(jwt.user._id, jwt.token, values).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        auth.clearJWT(() => {
          navigate('/')
        })
      }
    })
  
  };

  return (
    <ProfileForm 
      values={values}
      setValues={setValues}
      handleSubmit={handleSubmit}
      action="Ubah"
    />
  )
}


export default EditProfile