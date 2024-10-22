// src/components/LandingPage.js

import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Gavel as GavelIcon } from '@mui/icons-material'; // Ícono de mazo (justicia)

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <GavelIcon sx={{ fontSize: 80, color: 'primary.main' }} /> {/* Ícono destacado */}
      <Typography variant="h2" component="h1" gutterBottom>
        Bienvenido a NotariChain
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        La forma más sencilla y segura de crear y gestionar tus contratos notariales.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/register')}
          sx={{ mr: 2 }}
        >
          Regístrate Gratis
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate('/login')}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
}

export default LandingPage;
