from sqlalchemy import Column, Integer, Float, Date, ForeignKey, String
from src.database.core import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"))
    claim_date = Column(Date, nullable=False)
    claim_amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)
   