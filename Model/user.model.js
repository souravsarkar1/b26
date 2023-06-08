const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { required: true, type: String },
    email: { required: true, type: String },
    pass: { required: true, type: String },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
