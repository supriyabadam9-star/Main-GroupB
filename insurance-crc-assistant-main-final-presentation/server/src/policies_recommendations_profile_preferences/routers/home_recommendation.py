from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.home_policy import HomePolicy
from src.policies_recommendations_profile_preferences.schemas.home_recommendation import HomeRecommendationInput
from src.policies_recommendations_profile_preferences.services.home_scoring import calculate_home_score

router = APIRouter(
    prefix="/api/recommendations",tags=["Home Recommendation"]
)

@router.post("/home")
def recommend_home_policies(
    input: HomeRecommendationInput,
    db: Session = Depends(get_db)
):
    policies = db.query(HomePolicy).filter(
        HomePolicy.status == "active",
        HomePolicy.property_type == input.property_type,
        HomePolicy.ownership_type == input.ownership_type,
        HomePolicy.min_property_age <= input.property_age,
        HomePolicy.max_property_age >= input.property_age,
        HomePolicy.min_builtup_area <= input.builtup_area,
        HomePolicy.max_builtup_area >= input.builtup_area,
    ).all()

    results = []
    for policy in policies:
        score = calculate_home_score(policy, input)

        results.append({
            "policy_id": policy.id,
            "policy_name": policy.policy_name,
            "insurer_name": policy.insurer_name,
            "monthly_premium": float(policy.min_annual_premium) / 12,
            "annual_premium": float(policy.min_annual_premium),
            "score": score,
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:8]
