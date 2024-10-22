// CreateContract.js

import React, { useState } from 'react';
import apiService from '../../api/apiService';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateContract = () => {
  const { register, handleSubmit } = useForm();
  const [contractContent, setContractContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // Nuevo estado para almacenar los mensajes de chat
  const [userInput, setUserInput] = useState(''); // Nuevo estado para la entrada del usuario

  const onSubmit = async (data) => {
    setLoading(true);

    const userMessage = {
      role: 'user',
      content: `
      Por favor, genera un contrato de **${data.tipoContrato || 'tipo no especificado'}** utilizando la siguiente información:
      Detalles del Vendedor:
      - Nombre: ${data.nombreVendedor || 'No proporcionado'}
      - Dirección: ${data.direccionVendedor || 'No proporcionado'}
      - NIF: ${data.nifVendedor || 'No proporcionado'}

      Detalles del Comprador:
      - Nombre: ${data.nombreComprador || 'No proporcionado'}
      - Dirección: ${data.direccionComprador || 'No proporcionado'}
      - NIF: ${data.nifComprador || 'No proporcionado'}
      `,
    };

    const updatedMessages = [...messages, userMessage];

    try {
      const assistantMessage = await apiService.getChatCompletion(updatedMessages);
      setMessages([...updatedMessages, assistantMessage]);
      setContractContent(assistantMessage.content);
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
      setContractContent('Lo siento, ocurrió un error al generar el contrato.');
    } finally {
      setLoading(false);
    }
  };

  const handleAssistantUpdate = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage = { role: 'user', content: userInput };
    const updatedMessages = [...messages, userMessage];

    try {
      const assistantMessage = await apiService.getChatCompletion(updatedMessages);
      setMessages([...updatedMessages, assistantMessage]);
      setContractContent(assistantMessage.content);
      setUserInput('');
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContract = async () => {
    try {
      await apiService.saveContract({ content: contractContent });
      alert('Contrato guardado exitosamente.');
    } catch (error) {
      console.error('Error al guardar el contrato:', error);
      alert('Ocurrió un error al guardar el contrato.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Nuevo Contrato
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo para el tipo de contrato */}
        <TextField
          label="Tipo de Contrato"
          fullWidth
          margin="normal"
          {...register('tipoContrato')}
        />

        <Typography variant="h6" gutterBottom>
          Detalles del Vendedor
        </Typography>
        <TextField
          label="Nombre Completo"
          fullWidth
          margin="normal"
          {...register('nombreVendedor')}
        />
        <TextField
          label="Dirección Completa"
          fullWidth
          margin="normal"
          {...register('direccionVendedor')}
        />
        <TextField
          label="NIF"
          fullWidth
          margin="normal"
          {...register('nifVendedor')}
        />

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Detalles del Comprador
        </Typography>
        <TextField
          label="Nombre Completo"
          fullWidth
          margin="normal"
          {...register('nombreComprador')}
        />
        <TextField
          label="Dirección Completa"
          fullWidth
          margin="normal"
          {...register('direccionComprador')}
        />
        <TextField
          label="NIF"
          fullWidth
          margin="normal"
          {...register('nifComprador')}
        />

        <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
          Generar Contrato
        </Button>
      </form>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {contractContent && (
        <Box sx={{ mt: 4, mb: 30 }}>
          <Typography variant="h5" gutterBottom>
            Contrato Generado
          </Typography>
          <ReactQuill
            value={contractContent}
            onChange={setContractContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'blockquote',
              'code-block',
              'list',
              'bullet',
            ]}
            style={{ height: '500px' }}
          />

          <TextField
          
            label="Solicitar cambios al asistente"
            fullWidth
            multiline
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            sx={{ mt: '43px', mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssistantUpdate}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Enviar al Asistente
          </Button>
          <Button variant="contained" color="primary" onClick={saveContract} sx={{ mt: 2 }}>
            Guardar Contrato
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CreateContract;
