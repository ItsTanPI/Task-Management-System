# API Reference

## Base URL
`http://localhost:3000/api`

## Endpoints Index

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create new user account |
| POST | `/auth/login` | User login with credentials |
| GET | `/auth/:username` | Get user details |
| POST | `/tasks` | Create new task |
| GET | `/tasks/:username` | Get all tasks for user |
| GET | `/tasks/:username/:taskId` | Get specific task |
| GET | `/tasks/:username/status/:status` | Get tasks by status |
| PUT | `/tasks/:username/:taskId` | Update task |
| DELETE | `/tasks/:username/:taskId` | Delete task |
| GET | `/health` | Server health check |

## Authentication Endpoints

### Register User
```
POST /auth/register
```
**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 1
}
```

### Login User
```
POST /auth/login
```
**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "string"
  }
}
```

### Get User Details
```
GET /auth/:username
```
**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "string",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

## Task Endpoints

### Create Task
```
POST /tasks
```
**Body:**
```json
{
  "username": "string",
  "title": "string",
  "description": "string",
  "status": "pending"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "taskId": 1
}
```

### Get All Tasks
```
GET /tasks/:username
```
**Response (200):**
```json
{
  "success": true,
  "tasks": [
    {
      "id": 1,
      "username": "string",
      "title": "string",
      "description": "string",
      "status": "pending",
      "created_at": "2024-01-01T12:00:00Z"
    }
  ],
  "count": 1
}
```

### Get Task by ID
```
GET /tasks/:username/:taskId
```
**Response (200):**
```json
{
  "success": true,
  "task": {
    "id": 1,
    "username": "string",
    "title": "string",
    "description": "string",
    "status": "pending",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

### Get Tasks by Status
```
GET /tasks/:username/status/:status
```
**Status values:** `pending`, `in-progress`, `completed`

**Response (200):**
```json
{
  "success": true,
  "tasks": [...],
  "count": 1,
  "status": "pending"
}
```

### Update Task
```
PUT /tasks/:username/:taskId
```
**Body:**
```json
{
  "title": "string",
  "description": "string",
  "status": "in-progress"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully"
}
```

### Delete Task
```
DELETE /tasks/:username/:taskId
```
**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Health Check
```
GET /health
```
**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00Z"
}
```
