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
    type: String,
    required: true
  }
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Review', reviewSchema);
