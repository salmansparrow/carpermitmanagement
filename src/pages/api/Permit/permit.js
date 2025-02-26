import dbConnect from '../../../../lib/dbConnect';
import Permit from '../../../model/PermitModel';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        return id ? getPermitById(req, res, id) : getAllPermits(req, res);
      case 'POST':
        return createPermit(req, res);
      case 'PUT':
        return updatePermit(req, res, id);
      case 'DELETE':
        return deletePermit(req, res, id);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

//  GET Single Permit
const getPermitById = async (req, res, id) => {
  try {
    const permit = await Permit.findById(id).populate('event').populate('card');
    if (!permit) return res.status(404).json({ error: 'Permit not found' });
    return res.status(200).json(permit);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching permit' });
  }
};

//  GET All Permits
const getAllPermits = async (req, res) => {
  try {
    const permits = await Permit.find().populate('event').populate('card');
    if (permits.length === 0) return res.status(404).json({ message: 'No permits found' });
    return res.status(200).json(permits);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching permits' });
  }
};

//  CREATE Permit
const createPermit = async (req, res) => {
  try {
    const { event, card, code, carNumber } = req.body;
    if (!event || !card || !code || !carNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingPermit = await Permit.findOne({ carNumber });
    if (existingPermit) {
      return res.status(400).json({ message: 'Permit with this car number already exists.' });
    }

    const permit = new Permit({ event, card, code, carNumber });
    const newPermit = await permit.save();
    return res.status(201).json(newPermit);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//  UPDATE Permit
const updatePermit = async (req, res, id) => {
  try {
    const updatedPermit = await Permit.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPermit) return res.status(404).json({ error: 'Permit not found' });
    return res.status(200).json(updatedPermit);
  } catch (error) {
    return res.status(400).json({ error: 'Error updating permit' });
  }
};

//  DELETE Permit
const deletePermit = async (req, res, id) => {
  try {
    const deletedPermit = await Permit.findByIdAndDelete(id);
    if (!deletedPermit) return res.status(404).json({ error: 'Permit not found' });
    return res.status(200).json({ message: 'Permit deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting permit' });
  }
};
