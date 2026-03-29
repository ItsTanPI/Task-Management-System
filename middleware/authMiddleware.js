import { AuthModel } from '../database/AuthModel.js';
import { hashString } from '../util/hash.js';
import { DBErrorHandler } from '../database/errorHandler.js';

/**
 * Authentication Middleware
 */
export const AuthMiddleware = 
{
    /**
     * Register a new user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async register(req, res) 
    {
        try 
        {
            const { username, password } = req.body;

            if (!username || !password) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username and password are required'
                });
            }

            const hashedPassword = hashString(password);
            const userId = await AuthModel.register(username, hashedPassword);

            if (!userId) 
            {
                return res.status(409).json(
                {
                    success: false,
                    error: 'Username already exists'
                });
            }

            return res.status(201).json(
            {
                success: true,
                message: 'User registered successfully',
                userId: userId
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'AuthMiddleware - Register');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    },

    /**
     * Login user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async login(req, res) 
    {
        try 
        {
            const { username, password } = req.body;

            if (!username || !password) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username and password are required'
                });
            }

            const user = await AuthModel.findByUsername(username);

            if (!user) 
            {
                return res.status(401).json(
                {
                    success: false,
                    error: 'Invalid username or password'
                });
            }

            const hashedPassword = hashString(password);

            if (user.password !== hashedPassword) 
            {
                return res.status(401).json(
                {
                    success: false,
                    error: 'Invalid username or password'
                });
            }

            return res.status(200).json(
            {
                success: true,
                message: 'Login successful',
                user: 
                {
                    id: user.id,
                    username: user.username
                }
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'AuthMiddleware - Login');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    },

    /**
     * Get user details
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async getUser(req, res) 
    {
        try 
        {
            const { username } = req.params;

            if (!username) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username is required'
                });
            }

            const user = await AuthModel.findByUsername(username);

            if (!user) 
            {
                return res.status(404).json(
                {
                    success: false,
                    error: 'User not found'
                });
            }

            return res.status(200).json(
            {
                success: true,
                user: 
                {
                    id: user.id,
                    username: user.username,
                    created_at: user.created_at
                }
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'AuthMiddleware - Get User');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    }
};
