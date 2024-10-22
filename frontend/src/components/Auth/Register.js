// src/components/Auth/Register.js

import React, { useState } from 'react';
import authService from '../../api/authService';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import { AccountCircle, Lock, Person } from '@mui/icons-material';

export default function Register() {
  const [notaryId, setNotaryId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await authService.register(notaryId, name, password);

    if (response) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } else {
      alert('Error al registrar. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={handleRegister}>
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
            label="Nombre Completo"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
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
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.
        </Typography>
      </Box>
    </Container>
  );
}
