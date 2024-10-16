import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
import { GenerateToken } from '../middleware/AuthenticatedJWT';
import User from '../models/user';
const crypto = require('crypto');
const sendMail = require('../services/sendMail');

dotenv.config();

interface RequestWithUser extends Request {
  user?: any;
}


export const Register = async (req: Request, res: Response) => {
  const { FirstName, LastName, Email, Password, Role, Username } = req.body;
if (!Email || !Password) {
  return res.status(400).json({ error: 'Email and Password are required' });
}

const existedBuyer = await User('buyer').findOne({ Email: Email.toLowerCase() })
const existedSeller = await User('seller').findOne({ Email: Email.toLowerCase() })

if(existedBuyer && existedSeller) {
  console.log("existing")
  return;
}

const userRole = Role
const newUser = User(userRole)
const lowerCaseEmail = Email.toLowerCase();

  try {
      const HashPassword = await bcrypt.hash(Password, 10);
      const emailToken = crypto.randomBytes(64).toString('hex');
      const newUsers = new newUser({ FirstName, LastName, Email: lowerCaseEmail, Password: HashPassword, Role, Username, emailToken });
      await sendMail(lowerCaseEmail, emailToken)
      await newUsers.save();
      res.status(201).json();
  }
  catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Registration failed' });
  }
};


export const Login = async (req: Request, res: Response) => {
  const { Email, Password } = req.body;

if (!Email || !Password) {
  return res.status(400).json({ error: 'Email and Password are required' });
}

  try {
    let user = await User('buyer').findOne({ Email: Email.toLowerCase() });
    if(!user) {
      user = await User('seller').findOne({ Email: Email.toLowerCase() });
    }

    if (!user || !(await user.comparePassword(Password))) {
      console.log('Invalid attempt');
      return res.status(401).json({ error: 'Invalid Email or Password' });
    }

    if (user.isVerifiedEmail === true) {
      const token = GenerateToken(user._id.toString());
      res.json({ token, user: { FirstName: user.FirstName, LastName: user.LastName, Email: user.Email, Role: user.Role} });
    }

    else if (user.isVerifiedEmail === false) {
      return res.status(401).json({ error: 'Invalid Email or Password' });
    }
  } 

  catch (error) {
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


