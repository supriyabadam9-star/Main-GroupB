from pydantic import BaseModel
from typing import Literal

class HomeRecommendationInput(BaseModel):
    property_type: Literal["apartment", "villa_house", "penthouse"]
    ownership_type: Literal["owned", "rented"]

    property_age: int
    builtup_area: int

    need_structure: bool
    need_contents: bool
    need_valuables: bool
    need_electronics: bool
    need_rent_loss: bool

    preferred_sum_insured: int

    has_security: bool
