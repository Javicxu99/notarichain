// ContractList.js

import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const ContractList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await apiService.getContracts();
        setContracts(data);
      } catch (error) {
        console.error('Error al obtener los contratos:', error);
      }
    };

    fetchContracts();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Contratos Guardados
      </Typography>
      <List>
        {contracts.map((contract) => (
          <ListItem key={contract.id} button component={Link} to={`/contracts/${contract.id}/edit`}>
            <ListItemText
              primary={contract.name} // Mostrar el nombre del contrato
              secondary={`Creado el ${new Date(contract.createdAt).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContractList;
