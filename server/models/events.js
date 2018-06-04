const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Event', eventSchema);
