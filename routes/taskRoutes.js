import express from 'express';
import { TaskMiddleware } from '../middleware/taskMiddleware.js';

/**
 * Task Routes
 */
const taskRouter = express.Router();

// POST /api/tasks - Create a new task
taskRouter.post('/', TaskMiddleware.createTask);

// GET /api/tasks/:username - Get all tasks for user
taskRouter.get('/:username', TaskMiddleware.getTasks);

// GET /api/tasks/:username/:taskId - Get specific task
taskRouter.get('/:username/:taskId', TaskMiddleware.getTaskById);

// GET /api/tasks/:username/status/:status - Get tasks by status
taskRouter.get('/:username/status/:status', TaskMiddleware.getTasksByStatus);

// PUT /api/tasks/:username/:taskId - Update task
taskRouter.put('/:username/:taskId', TaskMiddleware.updateTask);

// DELETE /api/tasks/:username/:taskId - Delete task
taskRouter.delete('/:username/:taskId', TaskMiddleware.deleteTask);

export default taskRouter;
