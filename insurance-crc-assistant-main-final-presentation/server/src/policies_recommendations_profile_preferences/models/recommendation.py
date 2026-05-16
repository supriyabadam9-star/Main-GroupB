from sqlalchemy import Column, Integer, String, Text, ForeignKey
from src.database.core import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    link = Column(String, nullable=True)
