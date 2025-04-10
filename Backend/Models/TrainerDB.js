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
    phone : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    zip : {
        type : Number,
        required : true
    },
    experience : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image:{
      type: [String],
      required: true
    }
    ,
    services:{
      required: true,
      type: [String]
    }
    ,
    price:{
      required: true,
      type: [Number]
    }

  })

  const Trainer = mongo.model('Trainer', TrainerSchema)
  module.exports = Trainer;