from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import MatchHistory

router = APIRouter()


@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    records = db.query(MatchHistory).order_by(MatchHistory.id.desc()).all()

    return records
