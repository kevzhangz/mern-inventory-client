import { Navigate } from 'react-router-dom';
import authHelpers from '../helpers/auth';

const Guest = ({ children }) => {
    const token = authHelpers.isAuthenticated().token

    return token ? <Navigate to="/dashboard" /> : children
}

export default Guest