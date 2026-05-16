from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from src.database.core import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True)

    name = Column(String(100))
    dob = Column(Date)
    address = Column(Text)

    avatar = Column(Text)

    family_size = Column(Integer, default=1)
    monthly_budget = Column(Integer, default=15000)

    goal = Column(String(50), default="Family Protection")
    risk_level = Column(String(20), default="Medium")

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
