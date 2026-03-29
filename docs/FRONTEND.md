# Frontend Files

## public/index.html
Main SPA structure with authentication and task management sections.

**Sections:**
- Auth section with Login/Sign Up tabs
- Task management with create form
- Task filter buttons (All, Pending, In Progress, Completed)
- Task list container

## public/style.css
Complete styling for the application.

**Features:**
- Purple gradient background
- Smooth animations and transitions
- Responsive design (mobile-friendly)
- Tab styling with active states
- Task item cards with status badges
- Message notifications

## public/app.js
All frontend JavaScript logic.

**Event Listeners:**
- Form submissions (register, login, create task)
- Button clicks (update, delete, filter)
- Tab switches (login/signup)

**Key Functions:**
- `loadTasks()` - Fetch tasks from API
- `displayTasks(tasks)` - Render task list
- `updateTaskStatus(username, taskId)` - Update task
- `deleteTask(username, taskId)` - Delete task
- `filterTasks(status)` - Filter by status
- `switchAuthTab(tab)` - Switch auth tab
- `logout()` - Clear session
- `showMessage(message, type)` - Display notification
- `escapeHtml(text)` - Prevent XSS

**State Management:**
- Stored in `currentUser` variable
- API base: `http://localhost:3000/api`
