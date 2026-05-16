from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from src.database.core import Base

class PremiumAnalysis(Base):
    __tablename__ = "premium_analysis"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    category = Column(String(50), nullable=False)       # Auto, Home, Health, Life
    market_cost = Column(Numeric(10, 2), nullable=False)
    user_cost = Column(Numeric(10, 2), nullable=False)
    frequency = Column(String(20), nullable=False)    
      