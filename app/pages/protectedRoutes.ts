import { Router } from "express";
import { authMiddleware } from "./authMiddleware";
import User from "./user"; // Ensure this path is correct
import { Request, Response } from "express";

interface RequestWithUser extends Request {
    user?: any;

  }

const protectedroute = Router();
protectedroute.use(authMiddleware);

protectedroute.get('/dashboard', async (req: RequestWithUser, res: Response) => {
    const userEmail = req.user?.Email;

    try {
        // Type the user as the IUser interface
        const user = await User.findOne({ Email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure user is typed correctly
        res.json({ message: `Welcome, ${user.Name}!`, user: { Name: user.Name, Email: user.Email } });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default protectedroute;