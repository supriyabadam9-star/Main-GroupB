from pydantic import BaseModel

class FireRecommendationInput(BaseModel):
    property_type: str
    occupancy_type: str
    construction_type: str
    property_age: int

    fire: bool
    explosion: bool
    lightning: bool
    natural_disaster: bool
    burglary: bool
    electronic_equipment: bool

    stock_value: float
    machinery_value: float
    total_sum_insured: float
