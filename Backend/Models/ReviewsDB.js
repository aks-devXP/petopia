const mongo = require('./SetDB');
const Schema = mongo.Schema;
const ReviewSchema = new Schema({
    rating: {
        type: Number,
        // required: true
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
const Review = mongo.model('Review', ReviewSchema);
module.exports = Review;
    