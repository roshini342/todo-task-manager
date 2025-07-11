
# Todo Task Manager

A full-stack task management web application where users can sign up, log in, and manage their personal todo tasks.

## 💡 Features

- User Authentication (Login/Signup)
- Task CRUD (Create, Read, Update, Delete)
- Filter by status: All, Active, Completed
- Edit tasks inline
- Task completion toggle with checkbox
- Personalized task list per user

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS3, Axios, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Render.com
- **Version Control:** Git & GitHub

## 🔗 Live Demo

Access the deployed app here: [https://todo-task-manager-shin.vercel.app/](https://todo-task-manager-shin.vercel.app/)

## 🚀 Installation (Local Setup)

### Prerequisites

- Node.js and npm
- MongoDB Atlas account

### Steps

1. Clone the repo
   ```bash
   git clone https://github.com/roshini342/todo-task-manager.git
   cd todo-task-manager
   ```

2. Setup backend
   ```bash
   cd backend
   npm install
   ```


3. Start backend server
   ```bash
   npm start
   ```

4. Setup frontend
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## 📁 Folder Structure

```
todo-task-manager/
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TodoWrapper.js
│   │   └── App.js
│   └── public/
│       └── index.html
└── README.md
```

## Architecture Diagram

- User's Browser
  
         ↓
- Frontend App (React / HTML)
  
         ↓
- Backend Server (Node.js / Express)
  
          ↓
- MongoDB Atlas Database Cluster
 
          ↓
- Backup & Monitoring Services (Atlas)




---

This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)

---

## 📌 Assumptions

- User authentication is simplified with only a localStorage-based login.
- Each user sees their own todo list using a `user` query param.
- No admin or role-based users implemented.

