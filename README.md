# User Management Dashboard

A modern, responsive **User Management Dashboard** built with **React**, **Vite**, and **Axios**. The application allows users to view, search, filter, sort, paginate, add, edit, and delete user records using the JSONPlaceholder API with client-side state management.

---

## 📌 Features

### User Management

- View all users
- Add a new user
- Edit existing users
- Delete users with confirmation
- Client-side CRUD support

### Search

- Search users by:
  - First Name
  - Last Name
  - Email
  - Department

### Filtering

Filter users using:

- First Name
- Last Name
- Email
- Department

### Sorting

Sortable columns:

- ID
- First Name
- Last Name
- Email
- Department

Supports:

- Ascending
- Descending

### Pagination

- Previous / Next
- Page numbers
- Page size selection
- Dynamic page updates

### Validation

Client-side validation for:

- First Name
- Last Name
- Email
- Department

### Notifications

Displays success and error notifications for:

- User Creation
- User Update
- User Deletion

### UI

- Modern responsive dashboard
- Mobile-friendly layout
- Premium card design
- Responsive modals
- Loading state
- Error state
- Confirmation dialogs

---

# Tech Stack

- React 18
- Vite
- Axios
- JavaScript (ES6+)
- CSS3

---

# Project Structure

```text
user-management-dashboard/

├── public/

├── src/
│
├── api/
│   └── userService.js
│
├── components/
│   ├── ConfirmDelete.jsx
│   ├── ErrorMessage.jsx
│   ├── FilterPopup.jsx
│   ├── Header.jsx
│   ├── Loader.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── UserForm.jsx
│   ├── UserRow.jsx
│   └── UserTable.jsx
│
├── hooks/
│   └── useUsers.js
│
├── styles/
│   └── global.css
│
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
│
├── App.jsx
├── main.jsx
│
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd user-management-dashboard
```

Install dependencies

```bash
npm install
```

---

# Running the Project

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# Production Build

Create a production build

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

# API

This project uses:

```
https://jsonplaceholder.typicode.com/users
```

Axios is used for:

- GET Users
- POST User
- PUT User
- DELETE User

---

# Application Flow

1. Fetch users from JSONPlaceholder.
2. Convert API response into application format.
3. Display users in a responsive table.
4. Allow searching, filtering, sorting, and pagination.
5. Perform CRUD operations.
6. Update UI using local React state.

---

# Validation Rules

| Field | Validation |
|--------|------------|
| First Name | Required |
| Last Name | Required |
| Email | Required + Valid Email |
| Department | Required |

---

# Responsive Design

The application is responsive for:

- Desktop
- Laptop
- Tablet
- Mobile

---

# Assumptions

JSONPlaceholder is a mock API.

- POST requests simulate successful user creation.
- PUT requests work for existing users.
- DELETE requests simulate successful deletion.

Newly created users are managed in local application state during the current session.

---

# Key Concepts Used

- Functional Components
- React Hooks
- Custom Hooks
- State Management
- Event Handling
- Controlled Forms
- Client-side Validation
- Conditional Rendering
- Reusable Components
- Utility Functions
- API Integration
- Responsive Design
- Component-Based Architecture

---

# Future Improvements

- Authentication
- Dark Mode
- Export Users (CSV/PDF)
- Server-side Pagination
- Role-based Access Control
- Unit Testing
- Docker Deployment

---

# Author

Developed as a React User Management Dashboard project using React, Vite, Axios, and modern frontend development practices.