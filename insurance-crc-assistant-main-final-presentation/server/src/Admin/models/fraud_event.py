from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from src.database.core import Base


class FraudEvent(Base):
    __tablename__ = "fraud_events"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), index=True)

    event_date = Column(
        DateTime(timezone=True),
        index=True,
        nullable=False,
    )

    fraud_score = Column(Integer, nullable=False)
    flagged = Column(Boolean, default=False, index=True)
