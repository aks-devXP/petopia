const mongo = require('./SetDB');
const Schema = mongo.Schema;
const { Int32 } = require('bson');

const VetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Rating + count
    rating: {
      type: Number,
      default: 4,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },

    // Basic contact & location
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: Number,
    },
    locality: {
      type: String,
      default: "",
    },

    // Media
    profilePic: {
      type: String,
      default: "",
    },
    // renamed semantic: gallery = multiple images
    gallery: {
      type: [String],
      default: [],
    },

    // About & experience
    about: {
      type: String,
    },
    // new field that matches your dummy data
    experience: {
      type: Number,
    },

    specialization: {
      type: String,
    },

    // timings: [{ start: "08:30 AM", end: "09:15 AM" }, ...]
    timings: [
      {
        _id: false,
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
    ],
//  "password": "Qwerty12345@",
  // "experience":5,
    // Languages spoken
    languages: {
      type: [String],
      default: [],
    },

    // Approach bullet points
    approach: {
      type: [String],
      default: [],
    },

    // Achievements list
    achievements: {
      type: [String],
      default: [],
    },

    // Testimonials
    // testimonials: [
    //   {
    //     name: { type: String, required: true },
    //     quote: { type: String, required: true },
    //     date: { type: String }, // you can switch to Date later if needed
    //   },
    // ],

    // Add-ons: id/label/price
    addons: [
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],

    // Pricing
    price: {
      type: Number, // e.g. 1890
    },
    currency: {
      type: String,
      default: "₹",
    },

    // Bitmask facilities
    facMask: {
      type: mongo.Schema.Types.Mixed, // stores Int32
      default: () => new Int32(0),
      // you can re-enable getters/setters later if you want auto-conversion
      // get: v => (v?.value ?? 0),
      // set: v => new Int32(Number(v || 0)),
    },

    // Auth
    password: {
      type: String,
      required: true,
    },

    // Documentation (kept as simple list of URLs or "name|url" strings)
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

// Indexes – keep whatever you had already
VetSchema.index({ facMask: 1 });
VetSchema.index({ name: "text" });
VetSchema.index({ city: 1, locality: 1 });

module.exports = mongo.model('vet', VetSchema);
