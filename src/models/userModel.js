// const validator = require('validator');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide Name']
    },
    phone: {
      type: String,
      required: [true, 'Please provide Phone Number'],
      minLength: [14, 'Incorrect phone number format, try +2349012345678'],
      maxLength: [14, 'Incorrect phone number format, try +2349012345678'],
      validate: {
        validator: function(value) {
          return value.startsWith('+234');
        },
        message: 'Please provide Phone Number with +234 area code'
      }
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'superuser']
    },
    password: {
      type: String,
      required: [true, 'Please provide Password'],
      minlength: 5,
      select: false
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide confirmPassword'],
      validate: {
        validator: function(value) {
          return value === this.password;
        },
        message: 'Please provide password that match'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    verificationCode: {
      type: String,
      select: false
    },
    verified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    verificationExpires: Date
  },
  { versionKey: false }
);

userSchema.pre('save', async function(next) {
  // is the password field is not added skip
  if (!this.isModified('password')) return next();

  // hash password at cost
  this.password = await bcrypt.hash(this.password, 12);
  // makes confirmPassword field not added to the Database
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function(password, inputPassword) {
  const correctPassword = await bcrypt.compare(password, inputPassword);
  return correctPassword;
};

const user = mongoose.model('user', userSchema);

module.exports = user;
