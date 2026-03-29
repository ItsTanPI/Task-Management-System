import { TaskModel } from '../database/TaskModel.js';
import { DBErrorHandler } from '../database/errorHandler.js';

/**
 * Task Middleware
 */
export const TaskMiddleware = 
{
    /**
     * Create a new task
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async createTask(req, res) 
    {
        try 
        {
            const { username, title, description, status } = req.body;

            if (!username || !title) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username and title are required'
                });
            }

            const taskId = await TaskModel.createTask(username, title, description, status || 'pending');

            return res.status(201).json(
            {
                success: true,
                message: 'Task created successfully',
                taskId: taskId
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskMiddleware - Create Task');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    },

    /**
     * Get all tasks for a user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async getTasks(req, res) 
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

            const tasks = await TaskModel.getTasksByUser(username);

            return res.status(200).json(
            {
                success: true,
                tasks: tasks,
                count: tasks.length
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskMiddleware - Get Tasks');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    },

    /**
     * Get task by ID
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async getTaskById(req, res) 
    {
        try 
        {
            const { username, taskId } = req.params;

            if (!username || !taskId) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username and task ID are required'
                });
            }

            const task = await TaskModel.getTaskById(taskId, username);

            if (!task) 
            {
                return res.status(404).json(
                {
                    success: false,
                    error: 'Task not found'
                });
            }

            return res.status(200).json(
            {
                success: true,
                task: task
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskMiddleware - Get Task By ID');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    },

    /**
     * Update a task
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async updateTask(req, res) 
    {
        try 
        {
            const { username, taskId } = req.params;
            const { title, description, status } = req.body;

            if (!username || !taskId) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username and task ID are required'
                });
            }

            const success = await TaskModel.updateTask(taskId, username,
            {
                title,
                description,
                status
            });

            if (!success) 
            {
                return res.status(404).json(
                {
                    success: false,
                    error: 'Task not found or update failed'
                });
            }

            return res.status(200).json(
            {
                success: true,
                message: 'Task updated successfully'
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskMiddleware - Update Task');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    },

    /**
     * Delete a task
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async deleteTask(req, res) 
    {
        try 
        {
            const { username, taskId } = req.params;

            if (!username || !taskId) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username and task ID are required'
                });
            }

            const success = await TaskModel.deleteTask(taskId, username);

            if (!success) 
            {
                return res.status(404).json(
                {
                    success: false,
                    error: 'Task not found or delete failed'
                });
            }

            return res.status(200).json(
            {
                success: true,
                message: 'Task deleted successfully'
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskMiddleware - Delete Task');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    },

    /**
     * Get tasks by status
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async getTasksByStatus(req, res) 
    {
        try 
        {
            const { username, status } = req.params;

            if (!username || !status) 
            {
                return res.status(400).json(
                {
                    success: false,
                    error: 'Username and status are required'
                });
            }

            const tasks = await TaskModel.getTasksByStatus(username, status);

            return res.status(200).json(
            {
                success: true,
                tasks: tasks,
                count: tasks.length,
                status: status
            });
        } 
        catch (error) 
        {
            DBErrorHandler.handle(error, 'TaskMiddleware - Get Tasks By Status');
            return res.status(500).json(
            {
                success: false,
                error: 'Internal server error'
            });
        }
    }
};
