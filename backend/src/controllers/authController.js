const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const speakeasy = require('speakeasy')
const { validationResult } = require('express-validator')
const sendEmail = require('../utils/sendEmail')
const nodemailer = require('nodemailer')

// Register a new user
exports.registerUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    firstName,
    lastName,
    email,
    password,
    role,
    securityQuestions,
    lastFourSSN
  } = req.body

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      securityQuestions,
      lastFourSSN
    })

    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Login user
exports.loginUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const payload = {
      id: user._id,
      role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Handle password reset
exports.resetPassword = async (req, res) => {
  // Implement the logic to handle password reset, send email with reset link, validate security questions, etc.
}

// Handle MFA enrollment
exports.enrollMFA = async (req, res) => {
  // Implement the logic to handle MFA enrollment, generate QR code or secret, etc.
}

// Handle MFA waiver
exports.handleMFAWaiver = async (req, res) => {
  // Implement the logic to handle MFA waiver, store waiver information, etc.
}

// Verify MFA token
exports.verifyMFAToken = async (req, res) => {
  // Implement the logic to verify MFA token during authentication, etc.
}

// Verify security questions
exports.verifySecurityQuestions = async (req, res) => {
  // Implement the logic to verify user's security questions
}

// Handle account recovery
exports.accountRecovery = async (req, res) => {
  // Implement the logic to handle account recovery, arrange a call, and request required documents
}
