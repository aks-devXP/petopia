const mongoo = require('mongoose');

const Schema = mongoo.Schema;

const AdoptionPetSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, lowercase: true },
    breed: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    city: { type: String, default: '', trim: true },
    contactName: { type: String, default: '', trim: true },
    contactPhone: { type: String, default: '', trim: true },
    contactEmail: { type: String, default: '', trim: true },
    lister: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoo.model('AdoptionPet', AdoptionPetSchema);

