from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from src.database.core import Base

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, nullable=False)
    investigator = Column(String, nullable=False)
    priority = Column(String, default="Medium")
    notes = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
