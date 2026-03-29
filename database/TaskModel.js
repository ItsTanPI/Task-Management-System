import { openDB } from './db.js';
import { DBErrorHandler } from './errorHandler.js';

/**
 * Task Model - Handle all task operations for users
 */
export const TaskModel = 
{
    /**
     * Create a new task for the current user
     * @param {string} username - Current user's username
     * @param {string} title - Task title
     * @param {string} description - Task description
     * @param {string} status - Task status (default: 'pending')
     * @returns {Promise<number>} - Task ID
     */
    async createTask(username, title, description, status = 'pending') 
    {
        try 
        {
            if (!username || !title) 
            {
                throw new Error('Username and title are required');
            }

            const db = await openDB();
            const result = await db.run(
                'INSERT INTO tasks (username, title, description, status) VALUES (?, ?, ?, ?)',
                [username, title, description, status]
            );
            DBErrorHandler.info(`Task created with ID: ${result.lastID}`, 'TaskModel');
            return result.lastID;
        } 
        catch (error) 
        {
            return DBErrorHandler.handle(error, 'TaskModel - Create Task');
        }
    },

    /**
     * Get all tasks for the current user
     * @param {string} username - Current user's username
     * @returns {Promise<Array>} - Array of user's tasks
     */
    async getTasksByUser(username) 
    {
        try 
        {
            if (!username) 
            {
                throw new Error('Username is required');
            }

            const db = await openDB();
            const tasks = await db.all(
                'SELECT * FROM tasks WHERE username = ? ORDER BY created_at DESC',
                [username]
            );
            DBErrorHandler.info(`Retrieved ${tasks.length} tasks for user: ${username}`, 'TaskModel');
            return tasks;
        } 
        catch (error) 
        {
            return DBErrorHandler.handle(error, 'TaskModel - Get Tasks By User');
        }
    },

    /**
     * Get a single task by ID (verify it belongs to current user)
     * @param {number} taskId - Task ID
     * @param {string} username - Current user's username
     * @returns {Promise<Object>} - Task object
     */
    async getTaskById(taskId, username) 
    {
        try 
        {
            if (!taskId || !username) 
            {
                throw new Error('Task ID and username are required');
            }

            const db = await openDB();
            const task = await db.get(
                'SELECT * FROM tasks WHERE id = ? AND username = ?',
                [taskId, username]
            );
            if (task) 
            {
                DBErrorHandler.info(`Retrieved task ${taskId}`, 'TaskModel');
            } 
            else 
            {
                DBErrorHandler.warn(`Task ${taskId} not found for user ${username}`, 'TaskModel');
            }
            return task;
        } 
        catch (error) 
        {
            return DBErrorHandler.handle(error, 'TaskModel - Get Task By ID');
        }
    },

    /**
     * Update a task (only for current user)
     * @param {number} taskId - Task ID
     * @param {string} username - Current user's username
     * @param {Object} updates - Object with fields to update
     * @returns {Promise<boolean>} - Success status
     */
    async updateTask(taskId, username, updates) 
    {
        try 
        {
            if (!taskId || !username || !updates) 
            {
                throw new Error('Task ID, username, and updates are required');
            }

            const db = await openDB();
            const { title, description, status } = updates;
            
            const result = await db.run(
                'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND username = ?',
                [title, description, status, taskId, username]
            );
            
            if (result.changes > 0) 
            {
                DBErrorHandler.info(`Task ${taskId} updated`, 'TaskModel');
                return true;
            } 
            else 
            {
                DBErrorHandler.warn(`Task ${taskId} not found for user ${username}`, 'TaskModel');
                return false;
            }
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskModel - Update Task');
            return false;
        }
    },

    /**
     * Delete a task (only for current user)
     * @param {number} taskId - Task ID
     * @param {string} username - Current user's username
     * @returns {Promise<boolean>} - Success status
     */
    async deleteTask(taskId, username) 
    {
        try 
        {
            if (!taskId || !username) 
            {
                throw new Error('Task ID and username are required');
            }

            const db = await openDB();
            const result = await db.run(
                'DELETE FROM tasks WHERE id = ? AND username = ?',
                [taskId, username]
            );
            
            if (result.changes > 0) 
            {
                DBErrorHandler.info(`Task ${taskId} deleted`, 'TaskModel');
                return true;
            } 
            else 
            {
                DBErrorHandler.warn(`Task ${taskId} not found for user ${username}`, 'TaskModel');
                return false;
            }
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskModel - Delete Task');
            return false;
        }
    },

    /**
     * Get tasks by status for current user
     * @param {string} username - Current user's username
     * @param {string} status - Task status to filter by
     * @returns {Promise<Array>} - Array of tasks with matching status
     */
    async getTasksByStatus(username, status) 
    {
        try 
        {
            if (!username || !status) 
            {
                throw new Error('Username and status are required');
            }

            const db = await openDB();
            const tasks = await db.all(
                'SELECT * FROM tasks WHERE username = ? AND status = ? ORDER BY created_at DESC',
                [username, status]
            );
            DBErrorHandler.info(`Retrieved ${tasks.length} ${status} tasks for user: ${username}`, 'TaskModel');
            return tasks;
        } 
        catch (error) 
        {
            return DBErrorHandler.handle(error, 'TaskModel - Get Tasks By Status');
        }
    }
};
