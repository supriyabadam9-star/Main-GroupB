from sqlalchemy import Column, Integer, String, Boolean, Numeric
from src.database.core import Base

class BusinessPolicy(Base):
    __tablename__ = "business_policies"

    id = Column(Integer, primary_key=True, index=True)

    policy_name = Column(String, nullable=False)
    insurer = Column(String, nullable=False)
    status = Column(String, default="active")

    business_type = Column(String, nullable=False)
    business_size = Column(String, nullable=False)
    ownership_type = Column(String, nullable=False)
    risk_intensity = Column(String, nullable=False)

    min_annual_revenue = Column(Integer)
    max_annual_revenue = Column(Integer)
    min_asset_value = Column(Integer)
    max_asset_value = Column(Integer)

    covers_property_damage = Column(Boolean, default=False)
    covers_fire = Column(Boolean, default=False)
    covers_machinery_breakdown = Column(Boolean, default=False)
    covers_theft = Column(Boolean, default=False)
    covers_liability = Column(Boolean, default=False)
    covers_employee_safety = Column(Boolean, default=False)
    covers_cyber = Column(Boolean, default=False)
    covers_business_interruption = Column(Boolean, default=False)

    base_premium = Column(Numeric(12, 2), nullable=False)
