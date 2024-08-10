import express from "express";
import User from "./user";
import { GenerateToken } from "./AuthenticatedJWT";
const router = express.Router();


router.post("/", async (req, res, next) => {
    const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ Email: Email.toLowerCase() });
      console.log('Found user:', user);

      if (!user || !(await user.comparePassword(Password))) {
          console.log('Invalid attempt');
          return res.status(401).json({ error: 'Invalid Email or Password' });
      }
      
      const token = GenerateToken(user._id.toString());
      res.json({ token, user: { Name: user.Name, Email: user.Email} });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
  });
  
  module.exports = router;