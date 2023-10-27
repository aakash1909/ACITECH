const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
  },
  role: String, // 'admin' or 'user'
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

