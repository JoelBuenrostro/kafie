const Plan = require('../models/plan.model');

// Obtener todos los planes (público)
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ active: true });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los planes' });
  }
};

// Crear un nuevo plan (admin)
const createPlan = async (req, res) => {
  try {
    const { name, frequency, quantity, description } = req.body;

    const newPlan = new Plan({ name, frequency, quantity, description });
    await newPlan.save();

    res.status(201).json({ message: 'Plan creado', plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el plan' });
  }
};

// Desactivar un plan (admin)
const deactivatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await Plan.findByIdAndUpdate(id, { active: false });
    res.status(200).json({ message: 'Plan desactivado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar el plan' });
  }
};

module.exports = {
  getAllPlans,
  createPlan,
  deactivatePlan,
};
