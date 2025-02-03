const mongoo = require('mongoose');
const Schema = mongoo.Schema;
const ContactModel = new Schema  ({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  }
  ,
  message:{
    type: String,
    required: true
  }
});
module.exports = mongoo.model('Contact', ContactModel);