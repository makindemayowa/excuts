const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs'),
  SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  phone_no: {
    type: String,
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  password: String,
  address: String,
  height: Number,
  weight: Number,
  age: Number,
  here_to: {
    type: String,
    enum: ['here_for_fun', 'here_to_hire', 'professional']
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'others']
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  best_time: {
    type: String,
  },
  occupation: {
    type: String,
  },
  public: {
    type: Boolean,
  },
  education: {
    type: String,
  },
  about: {
    type: String,
  },
  photos: Array,
  info: String,
  interests: String,
  status: String,
  verifyingToken: String,
  passwordResetToken: String,
  role: {
    type: String,
    default: 'availableForRent'
  },
  loc: {
    type: { type: String },
    coordinates: [],
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  dateRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'Date'
  }]
},
{ timestamps: { createdAt: 'created_at' } });
// UserSchema.index({ email: 1, phone_no: 1 }, { unique: true });

// Dunno why I did this...Next you want to tie an index to the schema:
UserSchema.index({ loc: '2dsphere' });

UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  });
});

UserSchema.methods.comparePassword = function (plainText) {
    return bcrypt.compareSync(plainText, this.password);
  },

module.exports = mongoose.model('User', UserSchema);
