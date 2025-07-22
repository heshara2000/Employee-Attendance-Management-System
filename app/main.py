from fastapi import FastAPI
from app import models, database, auth
from app.routes import auth, attendance
#from app.routes import auth 

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Employee Attendance Management API",
    version="1.0.0"
)

# Include routers
app.include_router(auth.router)
app.include_router(attendance.router)
#app.include_router(admin.router)
