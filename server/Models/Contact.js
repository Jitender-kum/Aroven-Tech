import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // Naam hona zaroori hai
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Jis time message aya, wo time apne aap save ho jayega
  },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;