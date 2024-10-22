// backend/services/aiService.js

const openai = require('../config/openai');

exports.getChatCompletion = async (messages) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Asegúrate de que aquí está 'gpt-3.5-turbo'
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error en getChatCompletion:', error.response ? error.response.data : error.message);
    throw error;
  }
};
