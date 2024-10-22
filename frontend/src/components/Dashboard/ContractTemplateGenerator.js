// src/components/Dashboard/ContractTemplateGenerator.js

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { Article as ArticleIcon, Save as SaveIcon } from '@mui/icons-material';
import apiService from '../../api/apiService';
import { useNavigate } from 'react-router-dom';

function ContractTemplateGenerator() {
  const [contractType, setContractType] = useState('');
  const [template, setTemplate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateTemplate = async () => {
    if (!contractType) {
      alert('Por favor, ingresa el tipo de contrato.');
      return;
    }

    setIsLoading(true);
    const generatedTemplate = await apiService.generateContractTemplate(contractType);
    setIsLoading(false);

    if (generatedTemplate) {
      setTemplate(generatedTemplate);
    } else {
      alert('Error al generar el modelo de contrato.');
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
        Generar Modelo de Contrato
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateTemplate}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} /> : <ArticleIcon />}
            sx={{ height: '56px', ml: 2, mt: '16px' }}
          >
            {isLoading ? 'Generando...' : 'Generar Modelo'}
          </Button>
        </Box>
        {template && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Modelo Generado
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={15}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
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

export default ContractTemplateGenerator;
