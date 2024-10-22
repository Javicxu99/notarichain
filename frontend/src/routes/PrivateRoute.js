// PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { authToken } = useAuth();

  console.log('Verificando autenticación, token:', authToken);

  return authToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
