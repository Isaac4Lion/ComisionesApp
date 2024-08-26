import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

export const PrivateRouteAdmin = ({ children }) => 
{
    const { auth } = useContext(AuthContext)
    
    return (auth.rol == "admin") ? children : <Navigate to='/404' />
}