const mongo = require('./SetDB');
const schema = mongo.Schema;
const DaycareSchema = new schema({
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
    about:{
      type: String,
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
    cv:{
      type: String,
      default: ""
    }
    ,
    timings:{
        type: [[String]],
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

module.exports = mongo.model('Daycare', DaycareSchema);