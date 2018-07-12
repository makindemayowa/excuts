const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  created_by_id: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  details: {
    type: String,
  },
  preference: {
    type: String,
  },
  extra: {
    type: String,
  },
  status: {
    type: String,
  },
  interestedIn: {
    type: String,
    enum: ['male', 'female', 'others']
  },
  interested: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Event', eventSchema);
