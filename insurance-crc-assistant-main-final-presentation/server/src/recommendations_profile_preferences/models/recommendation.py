from sqlalchemy import Column, Integer, String, Text, ForeignKey
from src.database.core import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    link = Column(Text)         