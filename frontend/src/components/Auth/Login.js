// src/components/Auth/Login.js

import React, { useState } from 'react';
import authService from '../../api/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material'; // Importamos los íconos

export default function Login() {
  const [notaryId, setNotaryId] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await authService.login(notaryId, password);

    if (response) {
      setAuthToken(response.token);
      navigate('/dashboard'); // Actualiza la ruta si es necesario
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="ID de Notario"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={notaryId}
            onChange={(e) => setNotaryId(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>.
        </Typography>
      </Box>
    </Container>
  );
}
