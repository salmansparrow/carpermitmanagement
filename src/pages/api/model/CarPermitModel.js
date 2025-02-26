import mongoose from "mongoose";

const CarPermitSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: true,
  },
  originalImage: {
    type: String,
    required: true,
  },
  editedImage: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CarPermit ||
  mongoose.model("CarPermit", CarPermitSchema);
