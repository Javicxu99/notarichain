// controllers/contractsController.js

const Contract = require('../models/Contract');
const { getClauseSuggestions, getFullContractFromAI } = require('../services/aiService');

// Crear un nuevo contrato
exports.createContract = async (req, res) => {
  try {
    const { name, content, contractType } = req.body;
    const newContract = await Contract.create({
      name,
      content,
      contractType,
    });
    res.status(201).json(newContract);
  } catch (error) {
    console.error('Error al guardar el contrato:', error);
    res.status(500).json({ error: 'Error al guardar el contrato.' });
  }
};

// Obtener todos los contratos
exports.getContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(contracts);
  } catch (error) {
    console.error('Error al obtener los contratos:', error);
    res.status(500).json({ error: 'Error al obtener los contratos.' });
  }
};

// Obtener un contrato por ID
exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contrato no encontrado' });
    }
    res.json(contract);
  } catch (error) {
    console.error('Error al obtener el contrato:', error);
    res.status(500).json({ error: 'Error al obtener el contrato.' });
  }
};

// Actualizar un contrato
exports.updateContract = async (req, res) => {
  try {
    const { name, content, contractType } = req.body;
    const [updated] = await Contract.update(
      { name, content, contractType },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedContract = await Contract.findByPk(req.params.id);
      res.json(updatedContract);
    } else {
      res.status(404).json({ error: 'Contrato no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el contrato:', error);
    res.status(500).json({ error: 'Error al actualizar el contrato.' });
  }
};

// Otras funciones del controlador...

exports.autocompleteContract = async (req, res, next) => {
  try {
    const { contractType, currentContent } = req.body;

    // Generar el prompt para la IA
    const prompt = generarPromptContrato(contractType, 'autocompletado', [], []);

    // Llamar al servicio de IA para obtener la sugerencia
    const suggestion = await getAutocompleteSuggestionFromAI(prompt, currentContent);

    res.json({ suggestion });
  } catch (error) {
    console.error('Error en autocompletado:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const { generarPromptContrato, getContractTemplateFromAI } = require('../services/aiService');

// ... otras funciones del controlador ...

exports.generateContractTemplate = async (req, res, next) => {
  try {
    console.log('Iniciando generateContractTemplate');
    const { contractType } = req.body;

    if (!contractType) {
      console.log('Error: Tipo de contrato no proporcionado');
      return res.status(400).json({ message: 'El tipo de contrato es obligatorio.' });
    }

    console.log(`Generando prompt para tipo de contrato: ${contractType}`);
    // Generar el prompt para la IA
    const prompt = generarPromptContrato(contractType, 'modelo', [], []);

    console.log('Llamando al servicio de IA');
    // Llamar al servicio de IA
    const template = await getContractTemplateFromAI(prompt);

    console.log('Plantilla generada exitosamente');
    res.json({ template });
  } catch (error) {
    console.error('Error al generar modelo de contrato:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getContractTemplateFromAI = async (prompt) => {
  const response = await openai.createCompletion({
    model: 'gpt-3.5-turbo', // Cambiado de 'text-davinci-003' a 'gpt-3.5-turbo'
    prompt: prompt,
    max_tokens: 1000,
    temperature: 0.7,
  });
  const template = response.data.choices[0].text.trim();
  return template;
};

exports.generateFullContract = async (req, res) => {
  try {
    const { contractId, contractType, names, dnis } = req.body;

    if (!contractId || !contractType || !names || !dnis) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Buscar el contrato existente
    const contract = await Contract.findOne({
      where: { id: contractId, notaryId: req.notary.id },
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contrato no encontrado' });
    }

    const nombresArray = names.split(',').map((name) => name.trim());
    const dnisArray = dnis.split(',').map((dni) => dni.trim());

    // Generar el prompt para la IA
    const prompt = generarPromptContrato(contractType, 'completo', nombresArray, dnisArray);

    // Llamar al servicio de IA para generar el contrato completo
    const fullContractText = await getFullContractFromAI(prompt);

    // Actualizar el contrato en la base de datos
    await contract.update({ fullContract: fullContractText });

    res.status(200).json({ message: 'Contrato completo generado con éxito', contract: fullContractText });
  } catch (error) {
    console.error('Error al generar contrato completo:', error);
    res.status(500).json({ message: 'Error al generar contrato' });
  }
};
