const  mongo = require('mongoose');
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
        enum: ['vet', 'groomer', 'trainer']
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
        default: 'pending'
    },
    description:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongo.model('Appointment', appointmentSchema)