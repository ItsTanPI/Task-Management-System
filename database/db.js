import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDB() 
{
    const db = await open({
        filename: './auth.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('Auth database initialized successfully!');

    return db;
}