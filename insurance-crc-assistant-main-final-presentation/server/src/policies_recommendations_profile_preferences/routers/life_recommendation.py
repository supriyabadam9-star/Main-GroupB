from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.life_policy import LifePolicy
from src.policies_recommendations_profile_preferences.schemas.life_recommendation import LifeRecommendationInput
from src.policies_recommendations_profile_preferences.services.life_scoring import calculate_life_score

# ❌ DO NOT PUT PREFIX HERE
router = APIRouter(
   prefix="/api/recommendations", tags=["Life Recommendation"]
)

@router.post("/life")
def recommend_life_policies(
    input: LifeRecommendationInput,
    db: Session = Depends(get_db)
):
    policies = db.query(LifePolicy).filter(
        LifePolicy.status == "active",
        LifePolicy.policy_type == input.preferred_policy_type,
        LifePolicy.min_entry_age <= input.age,
        LifePolicy.max_entry_age >= input.age,
        LifePolicy.min_policy_term <= input.preferred_policy_term,
        LifePolicy.max_policy_term >= input.preferred_policy_term,
        (LifePolicy.smoker_allowed == True) if input.smoker else True
    ).all()

    results = []
    for policy in policies:
        score = calculate_life_score(policy, input)
        results.append({
            "policy_id": policy.id,
            "policy_name": policy.policy_name,
            "insurer_name": policy.insurer_name,
            "policy_type": policy.policy_type,
            "score": score,
            "monthly_premium": float(policy.min_monthly_premium)
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:8]
