from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from src.database.core import Base

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)

    claim_id = Column(Integer, nullable=False)

    investigator = Column(String, nullable=False)
    investigator_id = Column(Integer, nullable=False)

    priority = Column(String, nullable=False)   # High / Medium / Low
    status = Column(String, default="PENDING")  # PENDING / IN_PROGRESS / RESOLVED

    notes = Column(String)

    created_at = Column(DateTime, server_default=func.now())
