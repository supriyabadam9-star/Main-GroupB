from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.health_policy import HealthPolicy
from src.policies_recommendations_profile_preferences.schemas.health_recommendation import (
    HealthRecommendationInput,
)
from src.policies_recommendations_profile_preferences.services.health_scoring import (
    calculate_health_score,
)

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"],
)

@router.post("/health")
def recommend_health(
    input: HealthRecommendationInput,
    db: Session = Depends(get_db),
):
    # Guard condition
    if input.coverage_type == "parents" and input.maternity_required:
        return []

    policies = db.query(HealthPolicy).filter(
        HealthPolicy.status == "active",
        HealthPolicy.supported_coverage_types.any(input.coverage_type),
        HealthPolicy.max_adults >= input.adults_count,
        HealthPolicy.max_children >= input.children_count,
        HealthPolicy.max_parents >= input.parents_count,
        HealthPolicy.min_cover_amount <= input.cover_amount,
        HealthPolicy.max_cover_amount >= input.cover_amount,
    ).all()

    results = []
    for policy in policies:
        score = calculate_health_score(policy, input)
        results.append({
            "policy_id": policy.id,
            "policy_name": policy.policy_name,
            "insurer_name": policy.insurer_name,
            "monthly_premium": float(policy.monthly_premium),
            "score": score,
        })

    results.sort(key=lambda x: (-x["score"], x["monthly_premium"]))
    return results[:8]
