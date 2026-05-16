from pydantic import BaseModel
from datetime import date
from typing import Optional

class ClaimCreate(BaseModel):
    policy: str
    claim_type: str
    incident_date: date
    description: Optional[str]
    amount_claimed: Optional[float]


class ClaimResponse(BaseModel):
    id: int
    policy: str
    claim_type: str
    incident_date: date
    status: str

    class Config:
        orm_mode = True
