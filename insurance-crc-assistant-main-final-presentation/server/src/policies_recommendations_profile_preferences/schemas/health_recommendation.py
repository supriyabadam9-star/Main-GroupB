from pydantic import BaseModel
from typing import Literal

class HealthRecommendationInput(BaseModel):
    coverage_type: Literal["individual", "couple", "family", "parents"]

    adults_count: int
    children_count: int
    parents_count: int

    cover_amount: int

    has_pre_existing_conditions: bool
    maternity_required: bool

    room_preference: Literal["shared", "private", "suite"]

    max_monthly_premium: int
    deductible_preference: Literal["low", "high"]
    co_pay_acceptable: bool
