from sqlalchemy import Column, Date, Integer, String
from src.database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)             # add user_id column
    policy_type = Column(String)
    premium = Column(Integer)               # match DB type
    status = Column(String)
    renewal_date = Column(Date)
    policy_number = Column(String)
