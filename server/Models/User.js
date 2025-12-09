import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 🔥 New Fields for Reset Password
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const User = mongoose.model('User', userSchema);
export default User;