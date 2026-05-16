from sqlalchemy import Column, Integer, String, Boolean, Float
from src.database.core import Base

class FirePolicy(Base):
    __tablename__ = "fire_policies"

    id = Column(Integer, primary_key=True, index=True)

    policy_name = Column(String, nullable=False)
    insurer = Column(String, nullable=False)

    property_type = Column(String, nullable=False)          # residential / commercial / industrial
    occupancy_type = Column(String, nullable=False)         # residential / shop / office / factory

    construction_type = Column(String, nullable=False)      # rcc / mixed / wooden

    min_property_age = Column(Integer)
    max_property_age = Column(Integer)

    covers_fire = Column(Boolean, default=True)
    covers_explosion = Column(Boolean, default=False)
    covers_lightning = Column(Boolean, default=False)
    covers_natural_disaster = Column(Boolean, default=False)
    covers_burglary = Column(Boolean, default=False)
    covers_electronic_equipment = Column(Boolean, default=False)

    min_stock_value = Column(Float)
    max_stock_value = Column(Float)

    min_machinery_value = Column(Float)
    max_machinery_value = Column(Float)

    min_sum_insured = Column(Float)
    max_sum_insured = Column(Float)

    base_premium = Column(Float)
    status = Column(String, default="active")
