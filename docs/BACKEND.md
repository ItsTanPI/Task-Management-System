# Backend Files

## database/db.js
Initialize SQLite database and create tables on startup.

**Functions:**
- `openDB()` - Opens/creates database, creates tables if missing

**Usage:**
```javascript
const db = await openDB();
```

## database/AuthModel.js
Handle user authentication operations.

**Functions:**
- `register(username, hashedPassword)` - Create new user
- `findByUsername(username)` - Get user by username

**Returns:** Object with `success` and `data/error`

## database/TaskModel.js
Handle all task operations.

**Functions:**
- `createTask(username, title, description, status)` - Create task
- `getTasksByUser(username)` - Get all user tasks
- `getTaskById(username, taskId)` - Get specific task
- `updateTask(username, taskId, title, description, status)` - Update task
- `deleteTask(username, taskId)` - Delete task
- `getTasksByStatus(username, status)` - Filter by status

**Returns:** Object with `success` and `data/error`

## database/errorHandler.js
Centralized error logging and handling.

**Methods:**
- `handle(error, context)` - Log error with context
- `warn(message, context)` - Log warning
- `info(message, context)` - Log info

## middleware/authMiddleware.js
HTTP handlers for authentication.

**Functions:**
- `register(req, res)` - Handle registration
- `login(req, res)` - Handle login
- `getUser(req, res)` - Get user details

## middleware/taskMiddleware.js
HTTP handlers for task operations.

**Functions:**
- `createTask(req, res)` - Create task
- `getTasksByUser(req, res)` - Get all tasks
- `getTaskById(req, res)` - Get single task
- `updateTask(req, res)` - Update task
- `deleteTask(req, res)` - Delete task
- `getTasksByStatus(req, res)` - Filter tasks

## util/hash.js
Password hashing utility.

**Functions:**
- `hashString(input)` - SHA-256 hash

## index.js
Express server setup and routing.

**Setup:**
- Port: 3000
- CORS: Enabled
- Static files: /public
- Routes: /api/auth, /api/tasks
- Health check: /api/health
