import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
import { GenerateToken } from './AuthenticatedJWT';
import User from './user';


dotenv.config();

interface RequestWithUser extends Request {
    
    user?: any;

}


export const Register = async (req: Request, res: Response) => {
  const { Name, Email, Password } = req.body;
const lowerCaseEmail = Email.toLowerCase();
  try {
      const HashPassword = await bcrypt.hash(Password, 10);
      const newUser = new User({ Name, Email: lowerCaseEmail, Password: HashPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
      console.log('Registering user with email:', lowerCaseEmail);
      console.log('Attempting to log in with email:', Email.toLowerCase());
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Registration failed' });
  }
};

export const Login = async (req: Request, res: Response) => {
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
  
};

export const Dashboard = async (req: RequestWithUser, res: Response) => {
    try {
     
        const user = req.user; 

        if (!user) {

            return res.status(401).json({ error: 'Unauthorized' });
            
        }

        // Respond with user data
        res.json({ message: 'Protected data', user: { Name: user.Name, Email: user.Email} });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};