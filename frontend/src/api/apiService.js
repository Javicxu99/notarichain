// src/api/apiService.js

import axios from 'axios';

// Crear una instancia de Axios con configuración base
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Cambia el puerto si es necesario
  withCredentials: true, // Si necesitas enviar cookies
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para obtener sugerencias de autocompletado para contratos
const getAutocompleteSuggestion = async (contractType, currentContent) => {
  try {
    const response = await axiosInstance.post('/api/contracts/autocomplete', {
      contractType,
      currentContent,
    });
    return response.data.suggestion;  // Suponemos que el backend devuelve el autocompletado en 'suggestion'
  } catch (error) {
    console.error('Error al obtener autocompletado:', error);
    return null;
  }
};

// Función para generar un modelo de contrato basado en el tipo de contrato
const generateContractTemplate = async (contractType) => {
  try {
    const response = await axiosInstance.post('/api/contracts/generate-template', { contractType });
    return response.data.template;
  } catch (error) {
    console.error('Error al generar modelo de contrato:', error);
    if (error.response) {
      console.error('Datos:', error.response.data);
      console.error('Estado:', error.response.status);
      console.error('Cabeceras:', error.response.headers);
    } else if (error.request) {
      console.error('No se recibió respuesta:', error.request);
    } else {
      console.error('Error de configuración:', error.message);
    }
    throw error;
  }
};

// Método para obtener todos los contratos
const getContracts = async () => {
  try {
    const response = await axiosInstance.get('/api/contracts');
    return response.data;
  } catch (error) {
    console.error('Error en getContracts:', error);
    throw error;
  }
};

// Método para obtener un contrato por ID
const getContractById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/contracts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en getContractById:', error);
    throw error;
  }
};

const createContract = async (contractType) => {
  try {
    const response = await axiosInstance.post('/api/contracts', { contractType });
    return response.data;
  } catch (error) {
    console.error('Error al crear contrato:', error);
    return null;
  }
};

const updateContract = async (id, contractData) => {
  try {
    const response = await axiosInstance.put(`/api/contracts/${id}`, contractData);
    return response.data;
  } catch (error) {
    console.error('Error en updateContract:', error);
    throw error;
  }
};

const generateFullContract = async (contractType, names, dnis) => {
  try {
    const response = await axiosInstance.post('/api/contracts/generate-full', {
      contractType,
      names,
      dnis,
    });
    return response.data.contract;  // Esperamos que el contrato completo esté en 'contract'
  } catch (error) {
    console.error('Error al generar contrato completo:', error);
    return null;
  }
};

// Nueva función para obtener la finalización del chat
const getChatCompletion = async (messages) => {
  try {
    const response = await axiosInstance.post('/api/chat/completion', { messages });
    return response.data;
  } catch (error) {
    console.error('Error en getChatCompletion:', error);
    throw error;
  }
};

// Implementación de la función saveContract
const saveContract = async (contractData) => {
  try {
    const response = await axiosInstance.post('/api/contracts', contractData);
    return response.data;
  } catch (error) {
    console.error('Error en saveContract:', error);
    throw error;
  }
};

// Exportando todas las funciones
export default {
  saveContract,
  getContracts,
  getContractById,
  updateContract,
  getAutocompleteSuggestion,
  generateContractTemplate,
  generateFullContract,
  getChatCompletion,
};
