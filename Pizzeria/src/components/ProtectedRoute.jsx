import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useUser();
  
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;