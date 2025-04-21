const mongo = require('mongoose');
const Schema = mongo.Schema;
const VetSchema = new Schema({
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
  }
})
module.exports = mongo.model('Vet', VetSchema)
  
