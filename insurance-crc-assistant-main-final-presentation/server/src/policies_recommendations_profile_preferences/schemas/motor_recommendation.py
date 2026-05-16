from pydantic import BaseModel
from typing import Literal

class MotorRecommendationInput(BaseModel):
    vehicle_type: Literal["car", "bike"]
    fuel_type: Literal["petrol", "diesel", "electric", "hybrid"]
    vehicle_age: int

    daily_usage_km: int
    claim_last_year: bool

    preferred_coverage_type: Literal[
        "third_party",
        "comprehensive",
        "own_damage"
    ]

    idv_preference: Literal["low", "recommended", "high"]
