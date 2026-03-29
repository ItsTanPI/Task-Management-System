import express from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware.js';
import { TaskMiddleware } from '../middleware/taskMiddleware.js';

/**
 * Authentication Routes
 */
const authRouter = express.Router();

// POST /api/auth/register - Register a new user
authRouter.post('/register', AuthMiddleware.register);

// POST /api/auth/login - Login user
authRouter.post('/login', AuthMiddleware.login);

// GET /api/auth/:username - Get user details
authRouter.get('/:username', AuthMiddleware.getUser);

export default authRouter;
