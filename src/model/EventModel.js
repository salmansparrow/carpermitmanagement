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

  startDate :{
    type : Date,
    required : true
  },
  endDate :{
    type : Date,
    required : true
  },
  notes: String,
});
export default mongoose.models.Event || mongoose.model('Event', EventSchema);
