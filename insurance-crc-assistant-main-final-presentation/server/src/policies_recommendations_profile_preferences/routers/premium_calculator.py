from fastapi import APIRouter
from pydantic import BaseModel, Field
from enum import Enum

router = APIRouter(
    prefix="/premium-calculator",
    tags=["Premium Calculator"]
)

# ===================== ENUMS =====================

class VehicleType(str, Enum):
    car = "car"
    bike = "bike"


class CoverageType(str, Enum):
    comprehensive = "comprehensive"
    third_party = "third_party"


class OwnershipType(str, Enum):
    owned = "owned"
    rented = "rented"


class DestinationType(str, Enum):
    domestic = "domestic"
    international = "international"


class ConstructionType(str, Enum):
    rcc = "rcc"
    mixed = "mixed"
    wooden = "wooden"


class RiskLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


# ===================== INPUT SCHEMAS =====================

class HealthPremiumIn(BaseModel):
    age: int = Field(..., gt=0)
    cover_amount: float = Field(..., gt=0)
    family_size: int = Field(..., gt=0)


class MotorPremiumIn(BaseModel):
    vehicle_type: VehicleType
    vehicle_age: int = Field(..., ge=0)
    coverage_type: CoverageType


class LifePremiumIn(BaseModel):
    age: int = Field(..., gt=0)
    sum_assured: int = Field(..., gt=0)
    smoker: bool


class HomePremiumIn(BaseModel):
    property_value: int = Field(..., gt=0)
    property_age: int = Field(..., ge=0)
    ownership: OwnershipType


class TravelPremiumIn(BaseModel):
    trip_days: int = Field(..., gt=0)
    travelers: int = Field(..., gt=0)
    destination_type: DestinationType


class FirePremiumIn(BaseModel):
    property_value: int = Field(..., gt=0)
    construction_type: ConstructionType


class BusinessPremiumIn(BaseModel):
    annual_revenue: int = Field(..., gt=0)
    risk_level: RiskLevel


class PremiumOut(BaseModel):
    premium: float


# ===================== CALCULATORS =====================

@router.post("/health", response_model=PremiumOut)
def calculate_health_premium(data: HealthPremiumIn):
    base = 3000
    age_factor = data.age * 20
    cover_factor = data.cover_amount / 10000
    family_factor = data.family_size * 500

    premium = base + age_factor + cover_factor + family_factor
    return {"premium": round(premium, 2)}


@router.post("/motor", response_model=PremiumOut)
def calculate_motor_premium(data: MotorPremiumIn):
    base = 2000 if data.vehicle_type == VehicleType.bike else 4000
    age_factor = data.vehicle_age * 300
    coverage_factor = 1.5 if data.coverage_type == CoverageType.comprehensive else 1.0

    premium = (base + age_factor) * coverage_factor
    return {"premium": round(premium, 2)}


@router.post("/life", response_model=PremiumOut)
def calculate_life_premium(data: LifePremiumIn):
    base = data.sum_assured / 1000
    age_factor = data.age * 15
    smoker_factor = 1.5 if data.smoker else 1.0

    premium = (base + age_factor) * smoker_factor
    return {"premium": round(premium, 2)}


@router.post("/home", response_model=PremiumOut)
def calculate_home_premium(data: HomePremiumIn):
    base = data.property_value * 0.001
    age_factor = data.property_age * 100
    ownership_factor = 0.9 if data.ownership == OwnershipType.owned else 1.2

    premium = (base + age_factor) * ownership_factor
    return {"premium": round(premium, 2)}


@router.post("/travel", response_model=PremiumOut)
def calculate_travel_premium(data: TravelPremiumIn):
    base = data.trip_days * 200
    traveler_factor = data.travelers * 300
    destination_factor = 2 if data.destination_type == DestinationType.international else 1

    premium = (base + traveler_factor) * destination_factor
    return {"premium": round(premium, 2)}


@router.post("/fire", response_model=PremiumOut)
def calculate_fire_premium(data: FirePremiumIn):
    base = data.property_value * 0.002
    construction_factor = 1.5 if data.construction_type == ConstructionType.wooden else 1.0

    premium = base * construction_factor
    return {"premium": round(premium, 2)}


@router.post("/business", response_model=PremiumOut)
def calculate_business_premium(data: BusinessPremiumIn):
    base = data.annual_revenue * 0.003
    risk_factor = {
        RiskLevel.low: 1.0,
        RiskLevel.medium: 1.3,
        RiskLevel.high: 1.7
    }[data.risk_level]

    premium = base * risk_factor
    return {"premium": round(premium, 2)}
