import { openDB } from './db.js';
import { DBErrorHandler } from './errorHandler.js';

/**
 * Authentication Model - Handle user registration and lookup
 */
export const AuthModel = 
{
    /**
     * Register a new user
     * @param {string} username - User's username
     * @param {string} hashedPassword - Pre-hashed password
     * @returns {Promise<number>} - User ID
     */
    async register(username, hashedPassword) 
    {
        try 
        {
            if (!username || !hashedPassword) 
            {
                throw new Error('Username and password are required');
            }

            const db = await openDB();
            const result = await db.run(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, hashedPassword]
            );
            DBErrorHandler.info(`User registered successfully: ${username}`, 'AuthModel');
            return result.lastID;
        } 
        catch (error) 
        {
            if (error.message.includes('UNIQUE constraint failed')) 
            {
                DBErrorHandler.warn(`Username already exists: ${username}`, 'AuthModel');
                return null;
            }
            return DBErrorHandler.handle(error, 'AuthModel - Register User');
        }
    },

    /**
     * Find user by username
     * @param {string} username - Username to search for
     * @returns {Promise<Object>} - User object or undefined
     */
    async findByUsername(username) 
    {
        try 
        {
            if (!username) 
            {
                throw new Error('Username is required');
            }

            const db = await openDB();
            const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
            
            if (user) 
            {
                DBErrorHandler.info(`User found: ${username}`, 'AuthModel');
            } 
            else 
            {
                DBErrorHandler.warn(`User not found: ${username}`, 'AuthModel');
            }
            return user;
        } 
        catch (error) 
        {
            return DBErrorHandler.handle(error, 'AuthModel - Find User By Username');
        }
    }
};