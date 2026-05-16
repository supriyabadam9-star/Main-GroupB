from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Dict

# ===== CREATE =====
class AdminPolicyCreate(BaseModel):
    policy_name: Optional[str] = None
    policy_type: str
    company: Optional[str] = None
    coverage_amount: Optional[float] = None
    premium: Optional[float] = None
    status: str
    coverage_details: Dict = Field(default_factory=dict)

# ===== RESPONSE (VIEW / LIST / EDIT) =====
class AdminPolicyOut(BaseModel):
    id: int
    policy_number: str
    policy_type: str
    premium: float
    status: str
    renewal_date: datetime
    created_at: datetime

    policy_name: Optional[str] = None
    company: Optional[str] = None
    coverage_amount: Optional[float] = None
    coverage_details: Optional[Dict] = None  # ✅ CRITICAL FIX

    class Config:
        from_attributes = True

# ===== UPDATE =====
class AdminPolicyUpdate(BaseModel):
    policy_name: Optional[str] = None
    policy_type: Optional[str] = None
    company: Optional[str] = None
    coverage_amount: Optional[float] = None
    premium: Optional[float] = None
    status: Optional[str] = None
    coverage_details: Optional[Dict] = None
