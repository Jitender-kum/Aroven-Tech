import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// --- 1. EMAIL SENDER CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Save contact & Send Email Alert
// @route   POST /api/contact
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    // 2. Database mein Save karo
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // 3. 📧 EMAIL ALERT SEND KARO (Boss ko)
    const mailOptions = {
      from: `"Aroven Bot" <${process.env.EMAIL_USER}>`, // Bhejne wala
      to: process.env.EMAIL_USER, // Milne wala (Aap khud)
      subject: `🚀 New Lead: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb;">New Project Inquiry! 🎉</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email/Phone:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #2563eb;">
            ${message}
          </blockquote>
          <p style="margin-top: 20px; color: #888;">Go to Admin Panel to reply.</p>
        </div>
      `,
    };

    // Email bhejo (Await nahi karenge taaki client ko wait na karna pade)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("❌ Email Error:", err);
      else console.log("✅ Lead Email Sent:", info.response);
    });

    res.status(201).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all messages
// @route   GET /api/contact
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete message
// @route   DELETE /api/contact/:id
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await Contact.deleteOne({ _id: req.params.id });
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};