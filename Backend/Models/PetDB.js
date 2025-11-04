const mongoo = require('./SetDB');

const Schema = mongoo.Schema;

const PetSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  age:{
    type: Number,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  breed:{
    type: String,
    required: true,
  }

  
});

const Pet = mongoo.model('Pet', PetSchema);

module.exports = Pet;
