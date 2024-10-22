// src/components/About.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function About() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Acerca de NotariChain
      </Typography>
      <Typography variant="body1" paragraph>
        NotariChain es una plataforma innovadora que permite a los notarios crear, gestionar y almacenar contratos de manera eficiente y segura. Utilizamos tecnología blockchain y herramientas de inteligencia artificial para optimizar tu trabajo diario.
      </Typography>
      {/* Agrega más información relevante */}
    </Container>
  );
}

export default About;
