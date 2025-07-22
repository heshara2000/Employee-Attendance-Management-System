from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app import models, database, auth

router = APIRouter(
    prefix="/attendance",
    tags=["attendance"]
)

# ✅ Check-in endpoint
@router.post("/check-in")
def check_in(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    if current_user.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees can check in.")

    today_log = db.query(models.Attendance).filter(
        models.Attendance.employee_id == current_user.id,
        models.Attendance.check_in >= datetime.utcnow().date()
    ).first()

    if today_log:
        raise HTTPException(status_code=400, detail="Already checked in today.")

    new_log = models.Attendance(employee_id=current_user.id)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return {"msg": "Check-in successful", "check_in": new_log.check_in}

# ✅ Check-out endpoint
@router.post("/check-out")
def check_out(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    if current_user.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees can check out.")

    log = db.query(models.Attendance).filter(
        models.Attendance.employee_id == current_user.id,
    ).order_by(models.Attendance.id.desc()).first()

    if not log or log.check_out is not None:
        raise HTTPException(status_code=400, detail="No active check-in found.")

    log.check_out = datetime.utcnow()
    db.commit()
    return {"msg": "Check-out successful", "check_out": log.check_out}

# ✅ View own attendance logs
@router.get("/my-logs")
def get_my_logs(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    if current_user.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees can view their logs.")

    logs = db.query(models.Attendance).filter(
        models.Attendance.employee_id == current_user.id
    ).all()
    return logs
