const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewersName: {
    type: String,
  },
  review: {
    type: String,
    required: true
  },
  reviewee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Review', reviewSchema);
