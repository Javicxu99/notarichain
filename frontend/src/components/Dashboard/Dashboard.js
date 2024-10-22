// src/components/Dashboard/Dashboard.js

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ExitToApp as ExitToAppIcon,
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material'; // Importamos los íconos necesarios
import ContractList from './ContractList'; // Importamos ContractList

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const actions = [
    {
      label: 'Crear Contrato',
      onClick: () => navigate('/create-contract'),
      icon: <AddCircleIcon />,
    },
    {
      label: 'Escribir Contrato desde Cero',
      onClick: () => navigate('/write-contract'),
      icon: <EditIcon />,
    },
    {
      label: 'Generar Modelo de Contrato',
      onClick: () => navigate('/generate-template'),
      icon: <DescriptionIcon />,
    },
    {
      label: 'Generar Contrato Completo',
      onClick: () => navigate('/generate-full-contract'),
      icon: <AssignmentIcon />,
    },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <HomeIcon sx={{ mr: 1 }} /> {/* Añadimos el ícono de inicio */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NotariChain
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
          >
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Control
        </Typography>
        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={action.onClick}
                    startIcon={action.icon}
                  >
                    {action.label}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ContractList /> {/* Mostramos la lista de contratos */}
      </Container>
    </>
  );
}

export default Dashboard;
