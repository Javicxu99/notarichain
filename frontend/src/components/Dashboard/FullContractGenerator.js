// src/components/Dashboard/FullContractGenerator.js

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { Assignment as AssignmentIcon, Save as SaveIcon } from '@mui/icons-material';
import apiService from '../../api/apiService';
import { useNavigate } from 'react-router-dom';

function FullContractGenerator() {
  const [contractType, setContractType] = useState('');
  const [names, setNames] = useState('');
  const [dnis, setDnis] = useState('');
  const [contract, setContract] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateContract = async () => {
    if (!contractType || !names || !dnis) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    const generatedContract = await apiService.generateFullContract(contractType, names, dnis);
    setIsLoading(false);

    if (generatedContract) {
      setContract(generatedContract);
    } else {
      alert('Error al generar el contrato.');
    }
  };

  const handleSave = async () => {
    // Lógica para guardar el contrato generado
    alert('Contrato guardado exitosamente.');
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generar Contrato Completo
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Tipo de Contrato"
          variant="outlined"
          required
          fullWidth
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
          placeholder="Ejemplo: Compraventa, Arrendamiento, etc."
          margin="normal"
        />
        <TextField
          label="Nombres de las Partes (separados por comas)"
          variant="outlined"
          required
          fullWidth
          value={names}
          onChange={(e) => setNames(e.target.value)}
          placeholder="Juan Pérez, María García"
          margin="normal"
        />
        <TextField
          label="DNIs de las Partes (en el mismo orden, separados por comas)"
          variant="outlined"
          required
          fullWidth
          value={dnis}
          onChange={(e) => setDnis(e.target.value)}
          placeholder="12345678A, 87654321B"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateContract}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={24} /> : <AssignmentIcon />}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Generando...' : 'Generar Contrato'}
        </Button>
        {contract && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Contrato Generado
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={15}
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
              startIcon={<SaveIcon />}
              sx={{ mt: 2 }}
            >
              Guardar Contrato
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default FullContractGenerator;
