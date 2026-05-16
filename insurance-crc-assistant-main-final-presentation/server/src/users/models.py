# src/users/models.py
from sqlalchemy import Column, Integer, String
from src.database.core import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String)
    name = Column(String, nullable=False)           # <-- Add this
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)





# from sqlalchemy import Column, Integer, String
# from src.database.core import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     role = Column(String)
