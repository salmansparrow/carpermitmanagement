
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
 
}

});

const Card = mongoose.models.Card || mongoose.model('Card', cardSchema);
export default Card;
