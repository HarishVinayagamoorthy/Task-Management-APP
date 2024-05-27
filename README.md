# Task Management App

## Overview

The Task Management App is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to facilitate task management within an organization, providing different functionalities for administrators and employees through separate panels.

### Password
 - Admin email: harishvinayagamoorthy123@gmail.com
 - Admin Password: @123456
 - Employee email: harishvinayagamoorthi@gmail.com
 - Employee password: 123456



## Features

### Admin Panel
- **Employee Management:**
  - Create, delete, edit, and read employee details.
- **Task Assignment:**
  - Assign tasks to employees and view the assigned tasks for each employee.
- **Task Status Tracking:**
  - Tasks can have three statuses: Pending, Progressing, and Submitted.
  - Initially, tasks are in the Pending status.
  - View the status of each task and the time when the task was started.

### Employee Panel
- **View Assigned Tasks:**
  - Employees can view the tasks assigned to them by the admin.
- **Task Management:**
  - Start a task by clicking the "Start Work" button, which records the start time and changes the task status to Progressing.
  - Once the task is started, a timer will run on the same field with a "Submit" button instead of the "Start Work" button.
  - Submit a task upon completion to change the task status to Submitted.

### Authentication and Authorization
- **Login and Signup:**
  - Role-based authentication with JWT token for secure access.
- **Forgot Password:**
  - Functionality implemented using the Node Mailer package to reset passwords.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Email Service:** Node Mailer

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HarishVinayagamoorthy/Task-Management-APP.git
   cd task-management-app
