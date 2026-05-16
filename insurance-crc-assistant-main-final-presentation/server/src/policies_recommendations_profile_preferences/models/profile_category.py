from sqlalchemy import Column, Integer, String, ForeignKey
from src.database.core import Base

class ProfileCategory(Base):
    __tablename__ = "profile_categories"

    id = Column(Integer, primary_key=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="CASCADE"))
    category = Column(String(50), nullable=False)
