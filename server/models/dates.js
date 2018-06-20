const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const dateSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  venue: {
    type: String,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'pending']
  },
  requested: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Date', dateSchema);
