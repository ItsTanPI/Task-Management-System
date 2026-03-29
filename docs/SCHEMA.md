# Database Schema

## Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id` - Unique user identifier
- `username` - Unique username for login
- `password` - SHA-256 hashed password
- `created_at` - Account creation timestamp

## Tasks Table

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (username) REFERENCES users(username)
);
```

**Fields:**
- `id` - Unique task identifier
- `username` - Task owner username
- `title` - Task title
- `description` - Task description (optional)
- `status` - Task status (pending, in-progress, completed)
- `created_at` - Task creation timestamp

## Status Values

- `pending` - Not started
- `in-progress` - Currently being worked on
- `completed` - Finished
