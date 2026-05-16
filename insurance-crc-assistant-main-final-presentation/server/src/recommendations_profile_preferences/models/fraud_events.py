from sqlalchemy import Column, Integer, Float, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from src.database.core import Base

class FraudEvent(Base):
    __tablename__ = "fraud_events"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False)
    event_date = Column(Date, nullable=False)
    fraud_score = Column(Float, nullable=False)
    flagged = Column(Boolean, default=False)

    # optional relationship back to Claim
    claim = relationship("Claim", back_populates="fraud_events")