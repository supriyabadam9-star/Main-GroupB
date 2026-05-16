from sqlalchemy import Column, Integer, String, Boolean, DateTime
from src.database.core import Base

class PasswordOTP(Base):
    __tablename__ = "password_otps"

    id = Column(Integer, primary_key=True)
    email = Column(String, index=True)
    otp = Column(String)
    expires_at = Column(DateTime)

