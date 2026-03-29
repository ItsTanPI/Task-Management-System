# Task Management System

A lightweight, minimal task management application with zero bloat. Built with Node.js, Express, and SQLite. Perfect for application with minimal dependencies.

**Lightweight Features:**
- Zero frontend frameworks - Vanilla JS
- SQLite for embedded database
- Minimal npm dependencies (3 production packages)
- Single-page application (SPA)
- User authentication and task CRUD
- File-based database

## Quick Start

### Local

```bash
npm install
npm start
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t task-management-system .
docker run -p 3000:3000 task-management-system
```

Open `http://localhost:3000`

## Tech Stack

- **Node.js** + **Express** - Lightweight backend
- **SQLite3** - Zero-setup embedded database
- **Vanilla JS** - No frameworks
- **HTML5 + CSS3** - Minimal frontend

## Documentation

- [API Reference](docs/API.md)
- [Database Schema](docs/SCHEMA.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Backend Files](docs/BACKEND.md)
- [Frontend Files](docs/FRONTEND.md)

## Dependencies (3 only)

- `express` - Web framework
- `sqlite3` - Database driver
- `sqlite` - Query builder
