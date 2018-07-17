const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const interestSchema = new Schema({
  interestedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  eventOwner: {
    type: String,
    required: true
  },
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Interest', interestSchema);
