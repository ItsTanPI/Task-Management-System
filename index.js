import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { openDB } from './database/db.js';
import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

/**
 * Initialize Database
 */
async function initializeDatabase() 
{
    try 
    {
        await openDB();
        console.log('Database initialized successfully');
    } 
    catch (error) 
    {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

/**
 * Routes
 */
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

/**
 * Health Check
 */
app.get('/api/health', (req, res) =>
{
    res.status(200).json(
    {
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

/**
 * 404 Handler
 */
app.use((req, res) =>
{
    res.status(404).json(
    {
        success: false,
        error: 'Route not found',
        path: req.path
    });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) =>
{
    console.error('Server error:', err);
    res.status(500).json(
    {
        success: false,
        error: 'Internal server error'
    });
});

/**
 * Start Server
 */
async function start() 
{
    try 
    {
        await initializeDatabase();
        
        app.listen(PORT, () =>
        {
            console.log(`\nServer is running on http://localhost:${PORT}`);
            console.log('API Endpoints:');
            console.log('  Auth: POST   /api/auth/register');
            console.log('  Auth: POST   /api/auth/login');
            console.log('  Auth: GET    /api/auth/:username');
            console.log('  Tasks: POST  /api/tasks');
            console.log('  Tasks: GET   /api/tasks/:username');
            console.log('  Tasks: GET   /api/tasks/:username/:taskId');
            console.log('  Tasks: GET   /api/tasks/:username/status/:status');
            console.log('  Tasks: PUT   /api/tasks/:username/:taskId');
            console.log('  Tasks: DELETE /api/tasks/:username/:taskId');
            console.log('  Health: GET  /api/health\n');
        });
    } 
    catch (error) 
    {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

start();