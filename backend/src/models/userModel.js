const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [
      'administrator',
      'user',
      'clientOfLawFirm',
      'staffOfLawFirm',
      'staffOfLegalEdge'
    ],
    required: true
  },
  socialSecurityNumber: {
    type: String,
    required: true
  },
  securityQuestions: [
    {
      question: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }
  ],
  isMFAEnabled: {
    type: Boolean,
    default: false
  },
  mfaSecret: String,
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  lawFirm: {
    type: Schema.Types.ObjectId,
    ref: 'LawFirm'
  },
  termsAgreementDate: {
    type: Date,
    required: true
  },
  mfaWaiverSigned: {
    type: Boolean,
    default: false
  }
})

// Encrypt password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare password for authentication
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)
module.exports = User
