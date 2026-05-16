from sqlalchemy import Column, Integer, String, Boolean, Numeric, BigInteger
from src.database.core import Base

class HomePolicy(Base):
    __tablename__ = "home_policies"

    id = Column(Integer, primary_key=True)

    policy_name = Column(String(150), nullable=False)
    insurer_name = Column(String(100), nullable=False)

    property_type = Column(String(30), nullable=False)   # apartment / villa_house / penthouse
    ownership_type = Column(String(20), nullable=False) # owned / rented

    min_property_age = Column(Integer, nullable=False)
    max_property_age = Column(Integer, nullable=False)

    min_builtup_area = Column(Integer, nullable=False)
    max_builtup_area = Column(Integer, nullable=False)

    covers_structure = Column(Boolean, nullable=False)
    covers_contents = Column(Boolean, nullable=False)
    covers_valuables = Column(Boolean, nullable=False)
    covers_electronics = Column(Boolean, nullable=False)
    covers_rent_loss = Column(Boolean, nullable=False)

    min_sum_insured = Column(BigInteger, nullable=False)
    max_sum_insured = Column(BigInteger, nullable=False)

    supports_security_discount = Column(Boolean, default=False)

    min_annual_premium = Column(Numeric(10,2), nullable=False)
    max_annual_premium = Column(Numeric(10,2), nullable=False)

    status = Column(String(20), default="active")
