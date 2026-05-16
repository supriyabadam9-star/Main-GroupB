from sqlalchemy import Column, Integer, String, Numeric, JSON, DateTime, text
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)

    policy_name = Column(String, nullable=True)        # ✅ ADD
    policy_type = Column(String, nullable=False)
    company = Column(String, nullable=True)            # ✅ ADD
    coverage_amount = Column(Numeric, nullable=True)   # ✅ ADD

    premium = Column(Numeric, nullable=False)
    status = Column(String, nullable=False)

    coverage_details = Column(JSON, nullable=True)

    renewal_date = Column(
        DateTime,
        nullable=False,
        server_default=text("(CURRENT_TIMESTAMP + INTERVAL '365 days')")
    )

    policy_number = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
