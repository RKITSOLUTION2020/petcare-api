import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  species: String,
  age: Number,
  personality: String,
  mood: String,
  adopted: { type: Boolean, default: false },
  adoption_date: { type: Date, default: null },
});

const Pets = model('Pets', schema);

export default Pets;
