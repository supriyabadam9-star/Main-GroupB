from pydantic import BaseModel
from typing import Literal

class LifeRecommendationInput(BaseModel):
    age: int
    gender: Literal["male", "female", "other"]

    number_of_dependents: int

    smoker: bool
    critical_illness: bool

    annual_income: int
    total_liabilities: int
    monthly_premium_budget: int

    preferred_policy_type: Literal["term", "whole_life", "endowment"]
    preferred_policy_term: int
