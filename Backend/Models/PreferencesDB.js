const mongo = require("./SetDB");

const schema = mongo.Schema;

const PreferencesDB = new schema({
  user_id:{
    type: mongo.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vets:[{
    type:mongo.Types.ObjectId,
    ref:'Vet'
  }],
  trainers:[
    {
      type: mongo.Types.ObjectId,
      ref: 'Trainer',
    }
  ],
  groomers:[
    {
      type: mongo.Types.ObjectId,
      ref: 'Groomer'
    }
  ],
  iam:{
    type: Boolean,
    default:false,
  },     //In-app messages,

  email_alerts:{
    type: Boolean,
    default:false
  },
  s_w:{
    type:Boolean,
    default:false
  },
});

module.exports = mongo.model('Preference',PreferencesDB);
