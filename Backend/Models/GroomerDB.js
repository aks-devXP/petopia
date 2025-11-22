// Models/GroomerDB.js
const mongo = require('./SetDB');
const Schema = mongo.Schema;
const { Int32 } = require('bson');

const GroomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    rating: {
      type: Number,
      default: 4,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },

    phone: {
      type: Number,
    },

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    locality: {
      type: String,
      trim: true,
      default: "",
    },

    zip: {
      type: Number,
    },

    profilePic: {
      type: String,
      default: "",
    },

    // multiple shop / salon images
    gallery: {
      type: [String],
      default: [],
    },

    about: {
      type: String,
      trim: true,
    },

    // years of grooming experience
    experience: {
      type: Number,
    },

    // languages spoken in the salon
    languages: {
      type: [String],
      default: [],
    },

    /**
     * Timings:
     * You can accept [["10:00 AM","1:00 PM"], ["4:00 PM","8:00 PM"]] at API layer
     * and normalize in controller to:
     *   { start: "...", end: "..." }
     */
    timings: [
        { _id:false,
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
    
    ],

    specialization: {
      type: String,
      trim: true, // e.g. "Show Grooming", "Double Coat Breeds"
    },

    // logical tags user sees e.g. ["Bath & Blow Dry", "Full Groom", "Tick & Flea Treatment"]
    services: {
      type: [String],
      default: [],
    },

    // bitmask of grooming facilities/amenities (GROOMER_FACILITY_BITS)
    facMask: {
      type: mongo.Schema.Types.Mixed, // stores Int32
      default: () => new Int32(0),
    },

    // how they work / USP bullet points
    approach: {
      type: [String],
      default: [],
    },

    // awards, recognitions, etc.
    achievements: {
      type: [String],
      default: [],
    },

    // optional upsells: spa add-on, pickup, deshedding package, etc.
    addons: [
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],

    password: {
      type: String,
      required: true,
    },

    // registration docs / shop license / certifications
    docs: {
      type: [String],
      default: [],
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes similar to Vet/Trainer
GroomerSchema.index({ facMask: 1 });
GroomerSchema.index({ name: 'text' });
GroomerSchema.index({ city: 1, locality: 1 });

module.exports =
  mongo.models.Groomer || mongo.model('groomer', GroomerSchema);
