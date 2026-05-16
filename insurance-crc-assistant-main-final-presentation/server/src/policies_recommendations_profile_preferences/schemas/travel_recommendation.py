from pydantic import BaseModel
from typing import Literal

class TravelRecommendationInput(BaseModel):
    trip_type: Literal["single", "multi", "student"]
    destination_type: Literal["domestic", "international", "schengen", "usa_canada"]

    trip_duration_days: int
    number_of_travelers: int

    oldest_traveler_age: int
    pre_existing_condition: bool

    medical_cover_required: bool
    trip_cancellation_required: bool
    baggage_cover_required: bool
    adventure_sports: bool

    coverage_amount_preference: Literal["low", "medium", "high"]
