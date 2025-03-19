const  mongo = require('mongoose');
const schema  = mongo.Schema;
const appointmentSchema = new schema({
    user_id:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    authority_id:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
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