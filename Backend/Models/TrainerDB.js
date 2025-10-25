const mongo = require('mongoose');
const { create } = require('./AppointmentsDB');
const Schema = mongo.Schema;
// Use a distinct schema and model name for trainers to avoid
// clashing with the Vet model and triggering OverwriteModelError.
const TrainerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  rating:{
    type: Number,
    default: 4
  },
  phone:{
    type: Number,
    // required: true
  },
  address:{
    type: String,
    // required: true
  },
  city:{
    type: String,
    // required: true
  },
  state:{
    type: String,
    // required: true
  },
  zip:{
    type: Number,
    // required: true
  },
  profilePic:{
    type: String,
    default: ""
  },
  image:{
    type: [String],
    // required: true
  },
  about:{
    type: String,
    // required: true
  },
tenure:{
    type: Number,
    // required: true
  },
  timings:{
    type: [[String]],
    // required: true
  },
  specialization:{
    type: String,
    // required: true
  },
  password:{
    type: String,
    required: true
  },
  cv:{
    type: String,
    default: ""
  }
  ,
  verified:{
    type: Boolean,
    default: false
  },
  created_at:{
    type: Date,
    default: Date.now
  },
})
// Guard against recompiling the model in watch/hot-reload scenarios
module.exports = mongo.models.Trainer || mongo.model('Trainer', TrainerSchema)
  
