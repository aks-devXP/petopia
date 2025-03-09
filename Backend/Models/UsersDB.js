
const mogoo = require('mongoose');
const Schema = mogoo.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  age : {
    type: Number,
  },
  phone:{
  type: Number,
  },
  petStatus:{
    type: Boolean,
    default: false
  },
  petID:{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }
})

module.exports = mogoo.model('User', UserSchema)
