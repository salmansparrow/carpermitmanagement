import mongoose from 'mongoose';

// Function to generate a unique autoCode
const generateAutoCode = async function () {
  let autoCode;
  let isDuplicate = true;

  while (isDuplicate) {
    autoCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit random code
    const existingPermit = await mongoose.models.Permit.findOne({ autoCode });
    if (!existingPermit) {
      isDuplicate = false;
    }
  }

  return autoCode;
};

const permitSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  code: { type: String, required: true }, // Manually entered code
  autoCode: { type: String, unique: true, required: true, default: async function () { return await generateAutoCode(); } },
  carNumber: { type: String, unique: true, required: true }
});

export default mongoose.models.Permit || mongoose.model('Permit', permitSchema);
