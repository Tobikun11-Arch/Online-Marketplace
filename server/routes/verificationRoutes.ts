import { Router } from "express";
import User from '../models/user';

const router = Router();

router.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    try {
      const user = await User('buyer').findOne({ emailToken: token }) || await User('seller').findOne({ emailToken: token });
    
        if (!user) {
          
          return res.status(404).json({ message: 'Invalid token.' });

        }
        
        if (user.isVerifiedEmail) {

          return res.status(400).json({ message: 'Email is already verified.' });
      }

      user.isVerifiedEmail = true;
      user.emailToken = undefined;
      await user.save();
      res.redirect('https://online-marketplace-beta.vercel.app/Client/Verification');

    } 
    
    catch (error) {

      console.error('Error verifying email:', error);
      res.status(500).json({ message: 'Internal server error' });

    }

  });

  export default router;