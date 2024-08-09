import { Router } from "express";
import { Register, Login } from "./userController";
import { Dashboard } from './userController'; 
import { authMiddleware } from "./authMiddleware";


const router = Router();

router.post('/register', Register);
router.post('/login', Login); // Add the login route
router.get('/dashboard', authMiddleware, Dashboard);

export default router;
