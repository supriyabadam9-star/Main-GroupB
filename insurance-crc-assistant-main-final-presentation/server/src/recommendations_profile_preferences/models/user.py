from sqlalchemy import Column, Integer, String
from src.database.core import Base

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, index=True)
    role = Column(String, default="customer")
    photo = Column(String, nullable=True) 
    hashed_password = Column(String, nullable=False)
