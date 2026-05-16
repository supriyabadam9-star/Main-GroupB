from pydantic import BaseModel

class BusinessRecommendationInput(BaseModel):
    business_type: str
    business_size: str
    ownership_type: str
    risk_intensity: str

    annual_revenue: int
    total_asset_value: int

    property_damage_required: bool
    fire_cover_required: bool
    machinery_breakdown_required: bool
    theft_burglary_required: bool
    liability_cover_required: bool
    employee_safety_required: bool
    cyber_insurance_required: bool
    business_interruption_required: bool

    existing_insurance: bool
