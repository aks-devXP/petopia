const  mongo = require('./SetDB');
const schema  = mongo.Schema;
const appointmentSchema = new schema({
    user_id:{
        type: mongo.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['vet', 'groomer', 'trainer','daycare']
    },
    authority_id: {
        type: mongo.Schema.Types.ObjectId,
        required: true,
        refPath: 'type',
      },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    pet_id:{
        type: mongo.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'confirmed', 'completed', 'cancelled']
    },
    description:{
        type: String,
        // required: true
    },
    serviceCost:{
        type: Number,
        required: true
    },
    serviceName:{
        type: String,
        // required: true
    },
    addons: [
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    
},{
        timestamps: true
    });

appointmentSchema.index({user_id:1, authority_id:1});




module.exports = mongo.model('Appointment', appointmentSchema)