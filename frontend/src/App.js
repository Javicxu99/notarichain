// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import About from './components/About'; // Importación añadida
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import CreateContract from './components/Dashboard/CreateContract';
import ContractEditor from './components/Dashboard/ContractEditor';
import PrivateRoute from './routes/PrivateRoute';
import ContractComposer from './components/Dashboard/ContractComposer';
import ContractTemplateGenerator from './components/Dashboard/ContractTemplateGenerator';
import FullContractGenerator from './components/Dashboard/FullContractGenerator';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} /> {/* Nueva ruta añadida */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-contract"
          element={
            <PrivateRoute>
              <CreateContract />
            </PrivateRoute>
          }
        />
        <Route
          path="/contracts/:id"
          element={
            <PrivateRoute>
              <ContractEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/write-contract"
          element={
            <PrivateRoute>
              <ContractComposer />
            </PrivateRoute>
          }
        />
        <Route
          path="/generate-template"
          element={
            <PrivateRoute>
              <ContractTemplateGenerator />
            </PrivateRoute>
          }
        />
        <Route
          path="/generate-full-contract"
          element={
            <PrivateRoute>
              <FullContractGenerator />
            </PrivateRoute>
          }
        />

        {/* Ruta por defecto para rutas no definidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
