const { required } = require('joi');
const mongo = require('../SetDB');

const crueltyReportSchema = new mongo.Schema({
  reporter_name: {
    type: String,
    required: true,
  },
  reporter_email:{
    type: String,
    required:true,
  },
  address:{
    type: String,
    required:true,
  },
  description:{
    type:String,
    required:true,

  },
  city:{
    type:String,
    required:true,
  },
  // date of incident
  doi:{
    type: Date,
    required: true,
  },
  reporter_phone:{
    type:String,
    required:true,
  },
  animal_city:{
    type:String,
    required:true,
  },
  animal_location:{
    type:String,
    required:true,
  },
  photo_url:{
    type:[String],
    required:false,
  },
  status:{
    type:String,
    enum: ['Pending', 'In Review', 'Resolved'],
    default: 'Pending',
  },
  consent:{
    type: Boolean,
    required:true,
  }
},{
  timestamps: true,
});

const CrueltyReport = mongo.model('CrueltyReport', crueltyReportSchema);

module.exports = CrueltyReport;