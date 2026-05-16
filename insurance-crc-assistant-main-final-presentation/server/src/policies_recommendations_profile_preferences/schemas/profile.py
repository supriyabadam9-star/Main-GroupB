from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import date

class ProfileBase(BaseModel):
    name: Optional[str]
    dob: Optional[date]
    address: Optional[str]
    familySize: int = 1
    monthlyBudget: int = 15000
    goal: str = "Family Protection"
    riskLevel: str = "Medium"
    categories: List[str] = []

class ProfileCreate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: int
    avatar: Optional[str]

    model_config = ConfigDict(from_attributes=True)
