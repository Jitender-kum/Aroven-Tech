import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


// --- Token Generator Helper ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // 30 din tak login rahega
  });
};

// @desc    Register a new Admin (Sirf ek baar use karenge)
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Password ko Hash (Encrypt) karo
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // User banao
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Login Admin & Get Token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check Email
    const user = await User.findOne({ email });

    // Check Password (Jo dala hai vs Jo database me hai)
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id), // Ye rahi chabi 🗝️
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ya koi aur service
    auth: {
      user: process.env.EMAIL_USER, // .env me dalenge
      pass: process.env.EMAIL_PASS, // .env me dalenge
    },
  });

  const message = {
    from: `Aroven Tech <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Reset Token Generate karo
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Database me Token Hash karke save karo
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes expiry

    await user.save({ validateBeforeSave: false });

    // Email Bhejo
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please go to this link to reset your password:\n\n${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Token',
        message,
      });

      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resettoken
export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Check expiry
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Token' });
    }

    // Naya Password Set karo (Aur bcrypt handle karega agar humne save hook lagaya hai, par yaha manual hash karenge)
    const salt = await bcrypt.genSalt(10); // bcrypt import hona chahiye upar
    user.password = await bcrypt.hash(req.body.password, salt);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({ success: true, message: 'Password Updated Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};