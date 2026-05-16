from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from src.database.core import Base


class RuleTrigger(Base):
    __tablename__ = "rule_triggers"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), index=True)
    rule_name = Column(String, nullable=False)

    triggered_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True,
        nullable=False,
    )
