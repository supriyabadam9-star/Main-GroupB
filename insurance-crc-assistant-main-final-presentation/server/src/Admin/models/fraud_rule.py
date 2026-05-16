from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.database.core import Base

class FraudRule(Base):
    __tablename__ = "fraud_rules"

    id = Column(Integer, primary_key=True)
    rule_name = Column(String(100))
    category = Column(String(50))
    severity = Column(String(10))
    threshold = Column(Integer)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
