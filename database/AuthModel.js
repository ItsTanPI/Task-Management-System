import { openDB } from './db.js';

export const AuthModel = 
{
    async register(username, hashedPassword) 
    {
        const db = await openDB();
        const result = await db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        return result.lastID;
    },

    async findByUsername(username) 
    {
        const db = await openDB();
        return db.get('SELECT * FROM users WHERE username = ?', [username]);
    }
};