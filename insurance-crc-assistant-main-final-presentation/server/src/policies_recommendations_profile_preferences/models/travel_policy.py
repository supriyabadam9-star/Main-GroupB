from sqlalchemy import Column, Integer, String, Boolean, Numeric
from src.database.core import Base

class TravelPolicy(Base):
    __tablename__ = "travel_policies"

    id = Column(Integer, primary_key=True)

    policy_name = Column(String(150), nullable=False)
    insurer_name = Column(String(100), nullable=False)

    trip_type = Column(String(30), nullable=False)
    destination_type = Column(String(30), nullable=False)

    min_trip_days = Column(Integer, nullable=False)
    max_trip_days = Column(Integer, nullable=False)

    min_entry_age = Column(Integer, nullable=False)
    max_entry_age = Column(Integer, nullable=False)

    max_travelers = Column(Integer, nullable=False)

    pre_existing_allowed = Column(Boolean, nullable=False)
    senior_citizen_allowed = Column(Boolean, nullable=False)
    adventure_sports_allowed = Column(Boolean, nullable=False)

    medical_cover = Column(Boolean, nullable=False)
    trip_cancellation_cover = Column(Boolean, nullable=False)
    baggage_cover = Column(Boolean, nullable=False)

    supports_low_cover = Column(Boolean, default=True)
    supports_medium_cover = Column(Boolean, default=True)
    supports_high_cover = Column(Boolean, default=True)

    min_premium = Column(Numeric(10,2), nullable=False)
    max_premium = Column(Numeric(10,2), nullable=False)

    status = Column(String(20), default="active")
