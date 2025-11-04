const mongo = require('../SetDB');
const schema = mongo.Schema;

const NGO_Model= new schema({
  name:{
    type: String,
    required: true,
    unique: true,
  },
  founder:{
    type: String,
    required:true
  },
  email:{
    type:String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required: true,
  },
  contact_no:{
    type:String,
    required: true,
    unique: true,
  },
  description:{
    type:String,
    required:true,
  },
  social_media_links:{
    type: Map,
    of: String,
    default:{},
    required: false,
  },
  website:{
    type: String,
    required: false,
    unique: true,
  },
  address:{
    type:String,
    required: true,
  },
  city:{
    type: String,
    required:true,
  },
  state:{
    type: String,
    required: true,
  },
  // This will also contain the payment details
  verification_docs:{
    type: Map,
    of: String,
    default:{},
    required: true,
  },
  is_verified:{
    type: Boolean,
    default: false,
  },
  logo:{
    type: String,
    required: true,
  },
  images:{
    type : [String],
    default: [],
    required: false,

  },
  activities:{
    type: [String],
    default: [],
    required: false,
  },
  facilities:{
    type: [String],
    default: [],
    required: false,
  },
  established_in:{
    type: Number,
    required: true,
  },
  // This will be updated whenever any campaign is created by the ngo
  total_funds_raised:{
    type: Number,
    default:0,
    min:0,
    required: false,
  },
  total_campaigns:{
    type: Number,
    default:0,
    min:0,
    required: false,
  }

}
)

module.exports = mongo.model('NGO',NGO_Model);
