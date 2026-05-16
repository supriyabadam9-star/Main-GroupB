from sqlalchemy import Column, Integer, String, Boolean, Numeric
from src.database.core import Base

class LifePolicy(Base):
    __tablename__ = "life_policies"

    id = Column(Integer, primary_key=True)

    policy_name = Column(String(150), nullable=False)
    insurer_name = Column(String(100), nullable=False)

    policy_type = Column(String(30), nullable=False)

    min_entry_age = Column(Integer, nullable=False)
    max_entry_age = Column(Integer, nullable=False)

    min_sum_assured = Column(Integer, nullable=False)
    max_sum_assured = Column(Integer, nullable=False)

    min_policy_term = Column(Integer, nullable=False)
    max_policy_term = Column(Integer, nullable=False)

    smoker_allowed = Column(Boolean, nullable=False)
    critical_illness_allowed = Column(Boolean, nullable=False)

    min_monthly_premium = Column(Numeric(10,2), nullable=False)
    max_monthly_premium = Column(Numeric(10,2), nullable=False)

    accidental_death_rider = Column(Boolean, default=False)
    critical_illness_rider = Column(Boolean, default=False)

    status = Column(String(20), default="active")
