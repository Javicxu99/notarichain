// src/components/Dashboard/ContractEditor.js

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import apiService from '../../api/apiService';
import { useParams, useNavigate } from 'react-router-dom';

function ContractEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [clauses, setClauses] = useState([]);

  useEffect(() => {
    const fetchContract = async () => {
      const data = await apiService.getContractById(id);
      if (data) {
        setContract(data);
        setClauses(data.clauses || []);
      } else {
        alert('Error al obtener el contrato.');
      }
    };
    fetchContract();
  }, [id]);

  const handleSave = async () => {
    const updatedContract = await apiService.updateContract(id, clauses);
    if (updatedContract) {
      alert('Contrato actualizado exitosamente.');
      navigate('/dashboard');
    } else {
      alert('Error al actualizar el contrato.');
    }
  };

  if (!contract) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">Cargando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editando Contrato: {contract.contractType}
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        {clauses.map((clause, index) => (
          <TextField
            key={index}
            label={`Cláusula ${index + 1}`}
            variant="outlined"
            fullWidth
            multiline
            margin="normal"
            value={clause}
            onChange={(e) => {
              const newClauses = [...clauses];
              newClauses[index] = e.target.value;
              setClauses(newClauses);
            }}
          />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<SaveIcon />}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ContractEditor;
