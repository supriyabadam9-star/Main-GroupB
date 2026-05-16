from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from src.database.core import Base

class RuleTrigger(Base):
    __tablename__ = "rule_triggers"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False)
    rule_name = Column(String(100), nullable=False)
    triggered_at = Column(DateTime, default=datetime.utcnow)

    # optional relationship back to Claim
    claim = relationship("Claim", back_populates="rule_triggers")