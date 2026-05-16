from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.motor_policy import MotorPolicy
from src.policies_recommendations_profile_preferences.schemas.motor_recommendation import MotorRecommendationInput
from src.policies_recommendations_profile_preferences.services.motor_scoring import calculate_motor_score

router = APIRouter(
    prefix="/api/recommendations",tags=["Motor Recommendation"]
)

@router.post("/motor")
def recommend_motor_policies(input: MotorRecommendationInput, db: Session = Depends(get_db)):
    policies = db.query(MotorPolicy).filter(
        MotorPolicy.status == "active",
        MotorPolicy.vehicle_type == input.vehicle_type,
        MotorPolicy.fuel_type == input.fuel_type,
        MotorPolicy.min_vehicle_age <= input.vehicle_age,
        MotorPolicy.max_vehicle_age >= input.vehicle_age,
        MotorPolicy.coverage_type == input.preferred_coverage_type
    ).all()

    results = []
    for policy in policies:
        score = calculate_motor_score(policy, input)
        results.append({
            "policy_id": policy.id,
            "policy_name": policy.policy_name,
            "insurer_name": policy.insurer_name,
            "coverage_type": policy.coverage_type,
            "monthly_premium": float(policy.min_annual_premium) / 12,
            "annual_premium": float(policy.min_annual_premium),
            "score": score
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results
