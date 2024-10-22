// src/components/Dashboard/ContractComposer.js

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { AutoFixHigh as AutoFixHighIcon, Save as SaveIcon } from '@mui/icons-material';
import apiService from '../../api/apiService';

function ContractComposer() {
  const [content, setContent] = useState('');
  const [contractType, setContractType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAutocomplete = async () => {
    if (!contractType) {
      alert('Por favor, ingresa el tipo de contrato.');
      return;
    }

    setIsLoading(true);
    const suggestion = await apiService.getAutocompleteSuggestion(contractType, content);
    setIsLoading(false);

    if (suggestion) {
      setContent((prevContent) => prevContent + suggestion);
    } else {
      alert('Error al obtener sugerencias de autocompletado.');
    }
  };

  const handleSave = async () => {
    // Lógica para guardar el contrato en progreso
    alert('Contrato guardado exitosamente.');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Escribir Contrato
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Tipo de Contrato"
          variant="outlined"
          fullWidth
          required
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
          placeholder="Ejemplo: Compraventa, Arrendamiento, etc."
          margin="normal"
        />
        <TextField
          label="Contenido del Contrato"
          variant="outlined"
          fullWidth
          multiline
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu contrato aquí..."
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAutocomplete}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} /> : <AutoFixHighIcon />}
          >
            {isLoading ? 'Obteniendo sugerencia...' : 'Autocompletar con IA'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            startIcon={<SaveIcon />}
          >
            Guardar Contrato
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ContractComposer;
