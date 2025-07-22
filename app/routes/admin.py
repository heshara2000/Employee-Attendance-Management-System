from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, database, auth

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

# ✅ Admin-only: View all attendance logs
@router.get("/attendance-records")
def view_all_attendance(
    db: Session = Depends(database.get_db),
    current_admin: models.User = Depends(auth.get_current_active_admin)
):
    records = db.query(models.Attendance).all()
    return records
