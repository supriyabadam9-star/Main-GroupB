from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.sql import func
from src.database.core import Base

class Claim(Base):
    __tablename__ = "claims"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)

    policy = Column(String, nullable=False)
    claim_type = Column(String, nullable=False)

    incident_date = Column(Date, nullable=False)
    description = Column(String)

    amount_claimed = Column(Float)
    status = Column(String, default="Under Review")

    created_at = Column(Date, server_default=func.current_date())


class ClaimDocument(Base):
    __tablename__ = "claim_documents"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id", ondelete="CASCADE"))

    file_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
