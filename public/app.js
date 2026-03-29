/**
 * Task Management System - Frontend Application
 * API and UI management
 */
const API_URL = 'http://localhost:3000/api';
let currentUser = null;
let allTasks = [];
let currentFilter = 'all';

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const taskForm = document.getElementById('taskForm');
const tasksList = document.getElementById('tasksList');
const authSection = document.getElementById('authSection');
const mainSection = document.getElementById('mainSection');
const currentUserEl = document.getElementById('currentUser');
const authMessageEl = document.getElementById('authMessage');
const taskMessageEl = document.getElementById('taskMessage');


/**
 * Register Form Submit
 */
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        showMessage(data.message || data.error, data.success ? 'success' : 'error', 'authMessage');

        if (data.success) {
            registerForm.reset();
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error', 'authMessage');
    }
});

/**
 * Login Form Submit
 */
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            currentUser = username;
            currentUserEl.textContent = currentUser;
            authSection.classList.remove('active');
            mainSection.classList.add('active');
            loginForm.reset();
            await loadTasks();
        } else {
            showMessage(data.error, 'error', 'authMessage');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error', 'authMessage');
    }
});

/**
 * Task Form Submit
 */
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser, title, description, status })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Task created successfully', 'success', 'taskMessage');
            taskForm.reset();
            await loadTasks();
        } else {
            showMessage(data.error, 'error', 'taskMessage');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error', 'taskMessage');
    }
});


/**
 * Load all tasks for current user
 */
async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks/${currentUser}`);
        const data = await response.json();

        if (data.success) {
            allTasks = data.tasks || [];
            displayTasks();
        } else {
            showMessage(data.error, 'error', 'taskMessage');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error', 'taskMessage');
    }
}

/**
 * Display tasks based on current filter
 */
function displayTasks() {
    let tasksToShow = allTasks;
    
    if (currentFilter !== 'all') {
        tasksToShow = allTasks.filter(task => task.status === currentFilter);
    }

    if (tasksToShow.length === 0) {
        tasksList.innerHTML = '<div class="no-tasks"><p>No tasks found</p></div>';
        return;
    }

    tasksList.innerHTML = tasksToShow.map(task => `
        <div class="task-item ${task.status === 'completed' ? 'completed' : ''}">
            <div class="task-title">${escapeHtml(task.title)}</div>
            <div class="task-description">${escapeHtml(task.description || 'No description')}</div>
            <span class="task-status ${task.status}">${task.status}</span>
            <div class="task-actions">
                <select id="status-${task.id}" onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
                <button class="danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

/**
 * Update task status
 * @param {number} taskId - Task ID
 * @param {string} status - New status
 */
async function updateTaskStatus(taskId, status) {
    const task = allTasks.find(t => t.id === taskId);
    
    try {
        const response = await fetch(`${API_URL}/tasks/${currentUser}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                status: status
            })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Task updated successfully', 'success', 'taskMessage');
            await loadTasks();
        } else {
            showMessage(data.error, 'error', 'taskMessage');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error', 'taskMessage');
    }
}

/**
 * Delete task
 * @param {number} taskId - Task ID to delete
 */
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks/${currentUser}/${taskId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Task deleted successfully', 'success', 'taskMessage');
            await loadTasks();
        } else {
            showMessage(data.error, 'error', 'taskMessage');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error', 'taskMessage');
    }
}

/**
 * Filter tasks by status
 * @param {string} filter - Filter type (all, pending, in-progress, completed)
 */
function filterTasks(filter) {
    currentFilter = filter;
    displayTasks();

    // Update active button
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

/**
 * Switch between login and signup tabs
 * @param {string} tab - Tab name (login or signup)
 */
function switchAuthTab(tab) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected form
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.querySelectorAll('.auth-tab-btn')[0].classList.add('active');
    } else if (tab === 'signup') {
        document.getElementById('registerForm').classList.add('active');
        document.querySelectorAll('.auth-tab-btn')[1].classList.add('active');
    }

    // Clear any error messages
    authMessageEl.className = 'message';
}

/**
 * Logout current user
 */
function logout() {
    currentUser = null;
    allTasks = [];
    authSection.classList.add('active');
    mainSection.classList.remove('active');
    registerForm.reset();
    loginForm.reset();
    switchAuthTab('login');
}


/**
 * Display message to user
 * @param {string} message - Message text
 * @param {string} type - Message type (success, error, info)
 * @param {string} elementId - ID of message element
 */
function showMessage(message, type, elementId) {
    const messageEl = document.getElementById(elementId);
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    
    setTimeout(() => {
        messageEl.className = 'message';
    }, 5000);
}

/**
 * Escape HTML special characters for security
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
