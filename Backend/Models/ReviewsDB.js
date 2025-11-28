const mongo = require('./SetDB');
const Schema = mongo.Schema;
const ReviewSchema = new Schema({
    authority_id:{
        type: mongo.Types.ObjectId,
        required: true,
    },
    user_id:{
        type: mongo.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        // required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    appointment_id: {
        type: mongo.Types.ObjectId,
        ref: 'Appointment',
        required: true
    }
})

ReviewSchema.index({
    user_id:1,appointment_id:1
});

ReviewSchema.index({
    authority_id:1, appointment_id:1
});

const Review = mongo.model('Review', ReviewSchema);

module.exports = Review;
    