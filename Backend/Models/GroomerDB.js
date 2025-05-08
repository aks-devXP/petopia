const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    city: {
        type: String,
        // required: true
    },
    zip: {
        type: Number,
        // required: true
    },
    profilePic:{
      type: String,
      default: ""
    }
    ,
    image:{
      type:[String],
      // required:true
    },
    services:{
      type:[String],
    },
    price:{
      type:[Number],
    },
    verified:{
      type: Boolean,
      default: false
    },
    password: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 4
    },
    about:{
    type: String,
    }
    ,
    cv:{
        type: String,
        default: ""
    }
    ,
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
    created_at: {
        type: Date,
        default: Date.now
    }
});
const Groomer = mongoose.model('Groomer', GroomerSchema);
module.exports = Groomer;