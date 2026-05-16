from sqlalchemy import Column, Integer, String, Float, ForeignKey
from src.database.core import Base

class PremiumAnalysis(Base):
    __tablename__ = "premium_analysis"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String, nullable=False)
    market_cost = Column(Float, nullable=False)
    user_cost = Column(Float, nullable=False)
    frequency = Column(String, nullable=False)
