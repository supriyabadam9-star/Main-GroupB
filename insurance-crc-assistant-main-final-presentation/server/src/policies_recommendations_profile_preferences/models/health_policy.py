from sqlalchemy import Column, Integer, String, Numeric, Boolean
from sqlalchemy.dialects.postgresql import ARRAY
from src.database.core import Base

class HealthPolicy(Base):
    __tablename__ = "health_policies"

    id = Column(Integer, primary_key=True)

    policy_name = Column(String, nullable=False)
    insurer_name = Column(String, nullable=False)

    supported_coverage_types = Column(ARRAY(String), nullable=False)

    max_adults = Column(Integer, nullable=False)
    max_children = Column(Integer, nullable=False)
    max_parents = Column(Integer, nullable=False)

    min_cover_amount = Column(Numeric(12,2), nullable=False)
    max_cover_amount = Column(Numeric(12,2), nullable=False)

    monthly_premium = Column(Numeric(10,2), nullable=False)
    deductible_type = Column(String)
    co_pay_percentage = Column(Numeric(5,2), default=0)

    pre_existing_waiting_months = Column(Integer, default=0)
    maternity_supported = Column(Boolean, default=False)
    maternity_waiting_months = Column(Integer)

    room_rent_limit = Column(Numeric(10,2))
    status = Column(String, default="active")
