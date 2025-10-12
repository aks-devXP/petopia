const mongoose = require('mongoose');
const slugify = require('slugify');

const ImageSchema = new mongoose.Schema(
  { url: { type: String, default: '' }, public_id: { type: String, default: '' } },
  { _id: false }
);

const BreedSchema = new mongoose.Schema(
  {
    breed: { type: String, required: true, trim: true },
    species: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },

    general_info: {
      breedGroup: String,
      description: String,
      temperament: String,
      height: String,
      weight: String,
      lifeExpectancy: String
    },

    ratings: {
      energyLevel: { type: Number, min: 0, max: 5 },
      vocalizationLevel: { type: Number, min: 0, max: 5 },
      drooling: { type: Number, min: 0, max: 5 },
      shedding: { type: Number, min: 0, max: 5 },
      groomingNeeds: { type: Number, min: 0, max: 5 },
      trainability: { type: Number, min: 0, max: 5 },
      compatibilityWithKids: { type: Number, min: 0, max: 5 },
      compatibilityWithOtherPets: { type: Number, min: 0, max: 5 },
      apartmentSuitability: { type: Number, min: 0, max: 5 },
      canStayAlone: { type: Number, min: 0, max: 5 },
      familyFriendly: { type: Number, min: 0, max: 5 },
      warmWeatherSuitability: { type: Number, min: 0, max: 5 },
      coldWeatherSuitability: { type: Number, min: 0, max: 5 }
    },

    physical_characteristics: {
      ears: String, head: String, fur: String, body: String, tail: String
    },

    history: [String],

    care: { exercise: String, grooming: String, training: String },

    diet: { recommended: [String], notRecommended: [String] },

    health: { commonIssues: [String], symptomsToWatch: [String], preventiveTips: [String] },

    owner_tips: [String],

    images: {
      primary: { type: ImageSchema, default: () => ({}) },
      secondary: { type: ImageSchema, default: () => ({}) }
    }
  },
  { timestamps: true }
);

BreedSchema.index({ species: 1, breed: 1 }, { unique: true });

BreedSchema.pre('save', function (next) {
  if (this.isModified('breed') || this.isModified('species') || this.isNew) {
    const base = `${this.species || ''} ${this.breed || ''}`.trim();
    this.slug = slugify(base, { lower: true, strict: true });
  }
  next();
});

// Return UI-friendly shape (image fields as URLs)
BreedSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id; delete ret._id; delete ret.__v;
    ret.images = {
      primary: ret.images?.primary?.url || '',
      secondary: ret.images?.secondary?.url || ''
    };
    return ret;
  }
});

module.exports = mongoose.model('Breed', BreedSchema);
