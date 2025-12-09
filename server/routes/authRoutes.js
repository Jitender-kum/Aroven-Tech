import express from 'express';
import { registerUser, loginUser , resetPassword, forgotPassword} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser); // Account banane ke liye
router.post('/login', loginUser);       // Login karne ke liye
router.post('/forgotpassword', forgotPassword); // <--- New
router.put('/resetpassword/:resettoken', resetPassword);

export default router;