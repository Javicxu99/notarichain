// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Azul oscuro
    },
    secondary: {
      main: '#1976D2', // Azul medio
    },
    background: {
      default: '#E3F2FD', // Azul claro
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
