
const mogoo = require('mongoose');
const Schema = mogoo.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true // Decided name need not to be unique 
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  profilePic:{
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  phone:{
  type: Number,
  },
  petID:{
    type: [Schema.Types.ObjectId],
    ref: 'Pet'
  },
  profileColor:{
    type: String,
    default: "#000000"
  },
  nameColor:{
    type: String,
    default: "#0fff00"
  },
  city:{
    type: String,
    default: ""
  },
  state:{
    type: String,
    default: ""
  },
  address:{
    type: String,
    default: ""
  }
  
})

module.exports = mogoo.model('User', UserSchema)
