import dbConnect from '../../../../lib/dbConnect';
import CarPermit from '../../../model/CarPermitModel';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  console.log(id);
  

  try {
    switch (req.method) {
      case 'GET':
        return id ? getCarPermitById(req, res, id) : getAllCarPermits(req, res);
      case 'POST':
        return createCarPermit(req, res);
      case 'PUT':
        return updateCarPermit(req, res, id);
      case 'DELETE':
        return deleteCarPermit(req, res, id);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

//  GET Single Car Permit
const getCarPermitById = async (req, res, id) => {
  try {
    const carPermit = await CarPermit.findById(id).populate('event card');
    if (!carPermit) return res.status(404).json({ error: 'Car Permit not found' });
    return res.status(200).json(carPermit);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching Car Permit' });
  }
};

//  GET All Car Permits
const getAllCarPermits = async (req, res) => {
   
    
  try {
    const carPermits = await CarPermit.find().populate('event card');
    if (carPermits.length === 0) return res.status(404).json({ message: 'No Car Permits found' });
    return res.status(200).json(carPermits);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  CREATE Car Permit
const createCarPermit = async (req, res) => {
    console.log(req.body);
    
  try {
    const { event, card, originalImage, editedImage, notes } = req.body;
    if (!event || !card || !originalImage || !editedImage) {
      return res.status(400).json({ message: 'Fill all required fields' });
    }

    const newCarPermit = new CarPermit({ event, card, originalImage, editedImage, notes });
    await newCarPermit.save();
    return res.status(201).json(newCarPermit);
  } catch (error) {
    return res.status(500).json({ message:error.message });
  }
};

//  UPDATE Car Permit
const updateCarPermit = async (req, res, id) => {
  try {
    const updatedCarPermit = await CarPermit.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCarPermit) return res.status(404).json({ error: 'Car Permit not found' });
    return res.status(200).json(updatedCarPermit);
  } catch (error) {
    return res.status(400).json({ error: 'Error updating Car Permit' });
  }
};

//  DELETE Car Permit
const deleteCarPermit = async (req, res, id) => {
  try {
    const deletedCarPermit = await CarPermit.findByIdAndDelete(id);
    if (!deletedCarPermit) return res.status(404).json({ error: 'Car Permit not found' });
    return res.status(200).json({ message: 'Car Permit deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting Car Permit' });
  }
};
