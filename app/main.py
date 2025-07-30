# #from fastapi.middleware.cors import CORSMiddleware
# from fastapi import FastAPI
# from app import models, database, auth
# from app.routes import auth, attendance, admin

# app = FastAPI()

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # Allows all origins
# #     allow_credentials=True,
# #     allow_methods=["*"],  # Allows all methods
# #     allow_headers=["*"],  # Allows all headers
# # )

# # Create tables
# models.Base.metadata.create_all(bind=database.engine)

# app = FastAPI(
#     title="Employee Attendance Management System",
#     version="1.0.0"
# )

# # Include routers
# app.include_router(auth.router)
# app.include_router(attendance.router)
# app.include_router(admin.router)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app import models, database, auth
from app.routes import auth, attendance, admin

# ✅ Initialize app first
app = FastAPI(
    title="Employee Attendance Management System",
    version="1.0.0"
)

# ✅ Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # safer than "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create DB tables
models.Base.metadata.create_all(bind=database.engine)

# ✅ Include route files
app.include_router(auth.router)
app.include_router(attendance.router)
app.include_router(admin.router)
