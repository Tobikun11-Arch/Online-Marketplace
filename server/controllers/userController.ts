import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
import { GenerateTokens } from '../middleware/AuthenticatedJWT';
import User from '../models/user';
const crypto = require('crypto');
const sendMail = require('../services/sendMail');

dotenv.config();

interface RequestWithUser extends Request {
  user?: any;
}

interface NewUser {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Role: string;
  Username: string;
  emailToken: string;
}

export const Register = async (req: Request, res: Response) => {
  const { FirstName, LastName, Email, Password, Role, Username } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ error: 'Email and Password are required' });
  }
  const userRole = Role
  const newUser = User(userRole)
  const lowerCaseEmail = Email.toLowerCase();

  try {
    const existedBuyer = await User('buyer').findOne({ Email: Email.toLowerCase() })
    const existedSeller = await User('seller').findOne({ Email: Email.toLowerCase() })
    if (existedBuyer || existedSeller) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
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

  console.log("working")

  try {
    let user = await User('buyer').findOne({ Email: Email.toLowerCase() });
    if(!user) {
      user = await User('seller').findOne({ Email: Email.toLowerCase() });
    }
    console.log("user: ", user)
    

    if (!user || !(await user.comparePassword(Password))) {
      return res.status(401).json({ error: 'Invalid Email or Password' });
    }

    if (user.isVerifiedEmail === true) {
      const { accessToken, refreshToken } = GenerateTokens(user._id.toString());
      
      user.refreshToken = refreshToken
      await user.save();
      res.cookie('accessToken', accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({ message: 'Login successful', user });
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



