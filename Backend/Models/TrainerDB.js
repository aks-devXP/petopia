const mongo = require('mongoose'); 
const Schema = mongo.Schema;
const TrainerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        // required : true
    },
    location : {
        type : String,
        // required : true
    },
    city : {
        type : String,
        // required : true
    },
    zip : {
        type : Number,
        // required : true
    },
    experience : {
        type : String,
        // required : true
    },
    description : {
        type : String,
        // required : true
    },
    profilePic:{
        type: String,
        default: ""
    },
    image:{
      type: [String],
    //   required: true
    }
    ,
    services:{
    //   required: true,
      type: [String]
    }
    ,
    about:{
        type: String,
        // required: true
      },
    price:{
    //   required: true,
      type: [Number]
    },
    verified:{
      type: Boolean,
      default: false
    },
    timings:{
        type: [[String]],

    },
    password : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        default : 4
    },
    cv:{
        type : String,
        default : ""
    },
    specialization:{
        type : String,
    },
    created_at : {
        type : Date,
        default : Date.now
    },

  })

  const Trainer = mongo.model('Trainer', TrainerSchema)
  module.exports = Trainer;