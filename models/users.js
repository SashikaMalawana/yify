const Joi = require('joi');
const mongoose = require('mongoose');

const mongooseUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20
  },
  country: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20
  },
  phone: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20
  },
  accountType: {
    type: String,
    required: true,
    enum: ['bronze', 'silver', 'gold', 'platinum']
  },
  downloads: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
    // function () {
    //   if (this.accountType == 'bronze')
    //     return 1000;
    //   if (this.accountType == 'silver')
    //     return 2000;
    //   if (this.accountType == 'gold')
    //     return 3000;
    //   if (this.accountType == 'platinum')
    //     return 5000;
    // }
  },
  requests: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  comments: {
    type: [String],
    required: true
  },
  joined: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const User = mongoose.model('User', mongooseUserSchema);

function joiValidateUserRequest(req) {
  const joiUserSchema = {
    name: Joi.string().min(4).max(20).required(),
    country: Joi.string().min(4).max(20).required(),
    email: Joi.string().min(10).max(20).required(),
    phone: Joi.string().min(4).max(20).required(),
    accountType: Joi.string().required()
  };

  const result = Joi.validate(req.body, joiUserSchema);
  return result;
}

module.exports.User = User;
module.exports.joiValidateUserRequest = joiValidateUserRequest;