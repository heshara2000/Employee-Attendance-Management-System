# Employee-Attendance-Management-System
 Build a simplified RESTful API for managing employee attendance
# Employee Attendance Management System

This project is a simplified RESTful API system for managing employee attendance, with support for both Admin and Employee users.

---

## Features

- **User Authentication**: Supports Admin and Employee roles
- **Attendance Management**:
  - Mark attendance with **Check-In** and **Check-Out** endpoints
  - Employees can view their own attendance logs
  - Admins can view all attendance records
- **Basic Unit Tests** for backend API
- **Optional Frontend** interface providing a simple UI using React
- **Dockerized Setup** for easy local development and deployment

---

## Project Structure
Employee-Attendance-Management-System/
├── app/ # FastAPI backend source code
│ ├── main.py # FastAPI entry point
│ └── ... # models, routes, auth logic
├── frontend/ # React frontend code
│ ├── Dockerfile # Dockerfile for frontend
│ └── ... # components, pages, etc.
├── Dockerfile # Dockerfile for backend 
├── docker-compose.yml 
├── README.md 
└── requirements.txt # Python dependencies


---

## Getting Started

### Prerequisites

- Docker & Docker Compose installed on your machine
- (Optional) Node.js and npm if you want to run frontend separately without Docker

---

### Running the Project with Docker Compose

From the root directory, run:

```bash
docker-compose up --build

This will:

Start a PostgreSQL database container

Build and start the FastAPI backend container

Build and start the React frontend container

Accessing the Application
Frontend UI: http://localhost:3000

Backend API docs (Swagger UI): http://localhost:8000/docs

Start the PostgreSQL database

Usage
Login as an employee or admin

Employees can check in/out and view attendance logs

Admins can view all attendance records and manage data


Running Tests
Backend unit tests can be run inside the backend directory using:
pytest
