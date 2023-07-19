import { Navigate } from 'react-router-dom';
import auth from '../helpers/auth';

const Guest = ({ children }) => {
    const token = auth.isAuthenticated().token

    return token ? <Navigate to="/dashboard" /> : children
}

export default Guest