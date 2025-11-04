const { required, string } = require('joi');
const mongo = require('../SetDB');

const schema = mongo.Schema;
// we use ngo id as organizer id to get the relevant data of the ngo

const CampaignModel = new schema({
  title: {
    type: String,
    required: true,
  },
  tagline:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  images:{
    type: [String],
    default:[],
    required: true
  },
  goal:{
    type: Number,
    default:0,
    min:0,
    required: false,
  },
  raised:{
    type: Number,
    default:0,
    min:0,
    required: false,
  },
  city:{
    type: String,
    required:true,
  },
  state:{
    type:String,
    required: true,
  },
  organizer_id:{
    type:mongo.Types.ObjectId,
    ref: 'NGO',
    required: true,
  },
  donation_url:{
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_last:{
    type: Date,
    default: Date.now,
    required: true,
  }
},{
    timestamps: true,
    /*By default, Mongoose adds a special field called __v to documents.
      It’s mainly used for optimistic concurrency control.
    */
    // versionKey: true,
  }
);
// Can crete more indexes but it will also have negative affect as we are low on mongo storage
/*
Indexes = extra data structures that MongoDB maintains in parallel with your collection.
-> Read queries get faster (lookups, filtering, sorting).
-> Writes (insert/update/delete) get slower → because MongoDB must update all relevant indexes every time a document changes.
-> More disk space → each index takes storage.

So, creating more indexes is a trade-off between read performance and write performance.
*/
// CampaignModel.index({state:1,city:1});

// CampaignModel.index(
//   { title: 'text', tagline: 'text', description: 'text' },
//   { name: 'CampaignTextIndex' }
// );
module.exports = mongo.model("Campaign",CampaignModel);