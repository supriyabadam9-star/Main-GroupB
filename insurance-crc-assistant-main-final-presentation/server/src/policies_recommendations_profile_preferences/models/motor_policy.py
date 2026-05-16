from sqlalchemy import Column, Integer, String, Boolean, Numeric
from src.database.core import Base

class MotorPolicy(Base):
    __tablename__ = "motor_policies"

    id = Column(Integer, primary_key=True)

    policy_name = Column(String(150), nullable=False)
    insurer_name = Column(String(100), nullable=False)

    vehicle_type = Column(String(20), nullable=False)  # car / bike
    fuel_type = Column(String(20), nullable=False)     # petrol / diesel / electric / hybrid

    min_vehicle_age = Column(Integer, nullable=False)
    max_vehicle_age = Column(Integer, nullable=False)

    coverage_type = Column(String(30), nullable=False) # third_party / comprehensive / own_damage

    supports_low_idv = Column(Boolean, default=True)
    supports_recommended_idv = Column(Boolean, default=True)
    supports_high_idv = Column(Boolean, default=True)

    allows_claim_history = Column(Boolean, nullable=False)

    min_annual_premium = Column(Numeric(10,2), nullable=False)
    max_annual_premium = Column(Numeric(10,2), nullable=False)

    status = Column(String(20), default="active")
