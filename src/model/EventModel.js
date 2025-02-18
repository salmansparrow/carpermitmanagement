import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
     type : String,
   required : true,
    unique : true
 },
  code: {
    type : String,
     required : true,
    unique : true

},
  year: Number,
  dates: [Date],
  notes: String,
});
export default mongoose.models.Event || mongoose.model('Event', EventSchema);
