# School Management System (SchoolLink)

https://scontent.flhe13-1.fna.fbcdn.net/v/t39.30808-6/480783982_122111503196747621_7224930966526580307_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGbqnFhQ-6XpbKdomz7Fv6b9SMnBFHIIub1IycEUcgi5uT6QiF7JJU0XGDKhtlMB9fNLEupaaScDOe5bZmIRQeN&_nc_ohc=yBzO6vhBtrQQ7kNvwE5XD4i&_nc_oc=AdlzPLHVxaDDJJF7MK2W_OezJ6p9pKIgmu-bQmFO3QqH4tcsCLqaNnS5fK1nmZQ2f7s&_nc_zt=23&_nc_ht=scontent.flhe13-1.fna&_nc_gid=TuXyqWS3f5vQFnPCbuhQdQ&oh=00_AYHWBV_yAUgwZlEBVKyrP5NyGF6WdqTmliqSYSSt3-mUOQ&oe=67F4973C 

A comprehensive web application to manage school operations and enhance communication between administrators, teachers, students, and parents.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Functionality](#functionality)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview
SchoolLink is a full-stack school management system designed to streamline administrative tasks, facilitate teaching and learning, and keep parents informed about their children's progress. With role-based access, it provides tailored dashboards for Admins, Teachers, Students, and Parents, ensuring each user has the tools they need. The system is built with modern web technologies and focuses on usability, security, and scalability.

## Features
- **Authentication:** Secure signup, login, and forgot password functionality with email-based password reset.
- **Admin Panel:** Manage users (teachers, students, parents) and view system-wide statistics and notifications.
- **Teacher Panel:** Create and manage assignments, notifications, and student results; communicate with parents.
- **Student Panel:** Submit assignments, mark attendance (8-9 AM window), and view results/notifications.
- **Parent Panel:** Monitor student attendance, assignments, and results in real-time.
- **Responsive UI:** Clean, animated interface using Framer Motion.
- **Role-Based Access Control (RBAC):** Users access only the features relevant to their role.
- **Security:** JWT-based authentication, password hashing with Bcrypt, and secure API communication.

## Tech Stack
- **Frontend:** React.js, Axios, Framer Motion, CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt
- **Email Service:** EmailJS (for password reset emails)
- **Tools:** npm, Git

## Installation
Follow these steps to set up SchoolLink locally:

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Steps
#### 1. Clone the Repository:
```sh
git clone https://github.com/RanaSameerWaqar/School-Managment-System-.git
cd schoollink
```

#### 2. Set Up Backend:
```sh
cd backend
npm install
```

#### 3. Set Up Frontend:
```sh
cd ../frontend
npm install
```

#### 4. Run the Application:
- **Backend:** `cd backend && npm start` (runs on `http://localhost:5000` by default)
- **Frontend:** `cd frontend && npm start` (runs on `http://localhost:3000` by default)

## Configuration
Create environment variable files for both frontend and backend based on the provided `.env.example` files.

### Backend (`.env` in `/backend`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/schoollink # or your MongoDB Atlas URI
JWT_SECRET=your-secret-key-here
```

## Usage
### Start the Backend:
```sh
cd backend
npm start
```

### Start the Frontend:
```sh
cd frontend
npm start
```

Open your browser and navigate to `http://localhost:3000`.

Sign up as an Admin, Teacher, Student, or Parent to explore role-specific features.

## Functionality
### **Authentication**
- **Signup:** Register as Admin, Teacher, Student, or Parent.
- **Login:** Authenticate with email and password.
- **Forgot Password:** Request a password reset link via email.

### **Admin Panel**
- **Dashboard:** View total users, statistics, and notifications.
- **Teacher Management:** Add, edit, or remove teachers.
- **Student-Parent Management:** View and manage student-parent connections.

### **Teacher Panel**
- **Assignments:** Create, edit, and manage assignments.
- **Notifications:** Send important notifications to students and parents.
- **Results:** Assign grades to students.
- **Teacher-Parent Interaction:** Send messages to parents.

### **Student Panel**
- **Assignments:** Submit assignments.
- **Attendance:** Mark attendance between 8 AM and 9 AM.
- **Notifications:** View important updates from teachers and admins.

### **Parent Panel**
- **Dashboard:** Monitor student progress.
- **Assignments:** Track completed and pending assignments.
- **Attendance Records:** View attendance reports.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Add your message"
   ```
4. Push to your branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

Please adhere to the coding style and include comments for clarity.

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it.
Developed By SAM DEV WORKS

## Author
**[Your Name]**  
GitHub: [RanaSameerWaqar](https://github.com/RanaSameerWaqar)  
Email: your-email@example.com (optional)

---
