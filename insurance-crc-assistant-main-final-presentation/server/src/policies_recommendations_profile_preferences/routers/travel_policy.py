from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.travel_policy import TravelPolicy

router = APIRouter(prefix="/policies/travel", tags=["Travel Policies"])

@router.get("/{policy_id}")
def get_travel_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.query(TravelPolicy).filter(TravelPolicy.id == policy_id).first()
    if not p:
        raise HTTPException(404, "Travel policy not found")

    return {
        "id": p.id,
        "policy_name": p.policy_name,
        "insurer_name": p.insurer_name,
        "trip_type": p.trip_type,
        "destination_type": p.destination_type,
        "min_trip_days": p.min_trip_days,
        "max_trip_days": p.max_trip_days,
        "min_entry_age": p.min_entry_age,
        "max_entry_age": p.max_entry_age,
        "max_travelers": p.max_travelers,
        "pre_existing_allowed": p.pre_existing_allowed,
        "senior_citizen_allowed": p.senior_citizen_allowed,
        "adventure_sports_allowed": p.adventure_sports_allowed,
        "medical_cover": p.medical_cover,
        "trip_cancellation_cover": p.trip_cancellation_cover,
        "baggage_cover": p.baggage_cover,
        "supports_low_cover": p.supports_low_cover,
        "supports_medium_cover": p.supports_medium_cover,
        "supports_high_cover": p.supports_high_cover,
        "min_premium": float(p.min_premium),
        "max_premium": float(p.max_premium),
        "status": p.status,
    }
