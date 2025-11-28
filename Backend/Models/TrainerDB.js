const mongo = require('./SetDB');
const Schema = mongo.Schema;
const { Int32 } = require('bson');   // for bitmask (facilities)

const TrainerSchema = new Schema(
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

    rating: {
      type: Number,
      default: 4,
    },

    // how many ratings/reviews
    ratingCount: {
      type: Number,
      default: 0,
    },

    phone: {
      type: Number,
      // required: true,
    },

    address: {
      type: String,
      // required: true,
    },

    city: {
      type: String,
      // required: true,
    },

    state: {
      type: String,
      // required: true,
    },

    zip: {
      type: Number,
      // required: true,
    },

    profilePic: {
      type: String,
      default: '',
    },

    // NEW: gallery of images (replaces older `image` array)
    gallery: {
      type: [String],
      default: [],
    },

    about: {
      type: String,
      // required: true,
    },
    experience: {
      type: Number,
      // required: true,
    },

    // NEW: spoken languages
    languages: {
      type: [String],
      default: [],
    },

    // timings: [{ start, end }]
    timings: [
      {
        _id: false,
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
    ],

    specialization: {
      type: String,
      // required: true,
    },

    // logical list of services user sees (e.g. “Obedience”, “Puppy”)
    services: {
      type: [String],
      default: [],
    },

    // amenities/flags compressed into a bitmask like vets
    facMask: {
      type: mongo.Schema.Types.Mixed, // stores Int32
      default: () => new Int32(0),
      // if you want getters/setters later, you can add them like in Vet
    },

    // approach bullet points
    approach: {
      type: [String],
      default: [],
    },

    // achievements bullet points
    achievements: {
      type: [String],
      default: [],
    },


    // addons: [{ id, label, price }]
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
    timestamps: true, // createdAt + updatedAt
  }
);
TrainerSchema.index({facMask:1});
TrainerSchema.index({name:"text"});
TrainerSchema.index({city:1,locality:1});

// Guard against recompiling the model in watch/hot-reload scenarios
module.exports = mongo.models.Trainer || mongo.model('trainer', TrainerSchema);
