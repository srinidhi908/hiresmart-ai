from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base


class MatchHistory(Base):
    __tablename__ = "match_history"

    id = Column(Integer, primary_key=True, index=True)
    resume_filename = Column(String, nullable=False)
    resume_skills = Column(String)
    jd_skills = Column(String)
    match_score = Column(Float)
    classification = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
