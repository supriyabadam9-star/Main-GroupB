from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.motor_policy import MotorPolicy

router = APIRouter(prefix="/policies/motor", tags=["Motor Policies"])

@router.get("/{policy_id}")
def get_motor_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.query(MotorPolicy).filter(MotorPolicy.id == policy_id).first()
    if not p:
        raise HTTPException(404, "Motor policy not found")

    return {
        "id": p.id,
        "policy_name": p.policy_name,
        "insurer_name": p.insurer_name,
        "vehicle_type": p.vehicle_type,
        "fuel_type": p.fuel_type,
        "min_vehicle_age": p.min_vehicle_age,
        "max_vehicle_age": p.max_vehicle_age,
        "coverage_type": p.coverage_type,
        "supports_low_idv": p.supports_low_idv,
        "supports_recommended_idv": p.supports_recommended_idv,
        "supports_high_idv": p.supports_high_idv,
        "allows_claim_history": p.allows_claim_history,
        "min_annual_premium": float(p.min_annual_premium),
        "max_annual_premium": float(p.max_annual_premium),
        "status": p.status,
    }
