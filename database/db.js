import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { DBErrorHandler } from './errorHandler.js';

/**
 * Initialize and open SQLite database, create users and tasks tables
 * @returns {Promise<Object>} - Database connection object
 */
export async function openDB() 
{
    try 
    {
        const db = await open(
        {
            filename: './TaskSystem.db',
            driver: sqlite3.Database
        });

        DBErrorHandler.info('Creating tables...', 'Database');

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (username) REFERENCES users(username)
            )
        `);

        DBErrorHandler.info('Users table created/verified', 'Database');
        DBErrorHandler.info('Tasks table created/verified', 'Database');
        DBErrorHandler.info('All tables initialized successfully!', 'Database');

        return db;
    } 
    catch (error) 
    {
        DBErrorHandler.handle(error, 'Database Initialization');
        throw error;
    }
}