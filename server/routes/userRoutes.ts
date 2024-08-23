import { Router } from "express";
import { Register, Login } from "../controllers/userController";
import { Dashboard } from '../controllers/userController'; 
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/dashboard', authMiddleware, Dashboard);

export default router;