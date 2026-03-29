# Architecture

## Project Structure

```
Task Management System/
├── database/
│   ├── db.js              - Database initialization
│   ├── AuthModel.js       - User operations
│   ├── TaskModel.js       - Task operations
│   └── errorHandler.js    - Error logging
├── middleware/
│   ├── authMiddleware.js  - Auth handlers
│   └── taskMiddleware.js  - Task handlers
├── routes/
│   ├── authRoutes.js      - Auth endpoints
│   └── taskRoutes.js      - Task endpoints
├── util/
│   └── hash.js            - Password hashing
├── public/
│   ├── index.html         - Main page
│   ├── style.css          - Styling
│   └── app.js             - Frontend logic
├── index.js               - Express server
└── package.json           - Dependencies
```

## Layers

### 1. Database Layer
- **db.js** - SQLite connection and table creation
- **AuthModel.js** - User register and login queries
- **TaskModel.js** - Task CRUD operations
- **errorHandler.js** - Centralized error logging

### 2. Middleware Layer
- **authMiddleware.js** - Request validation and database calls
- **taskMiddleware.js** - Request validation and database calls

### 3. Routes Layer
- **authRoutes.js** - Express route handlers
- **taskRoutes.js** - Express route handlers

### 4. Frontend Layer
- **index.html** - UI structure
- **style.css** - Styling
- **app.js** - DOM manipulation and API calls

## Data Flow

```
Request → Route → Middleware → Database Layer → Response
    ↓
Frontend App.js
    ↓
DOM Update
```
