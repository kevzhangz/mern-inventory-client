import { Navigate } from 'react-router-dom';
import auth from '../helpers/auth';

const Protected = ({ children }) => {
    const token = auth.isAuthenticated().token

    return token ? children : <Navigate to="/" />
}

export default Protected