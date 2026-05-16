from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.schemas.fire_recommendation import FireRecommendationInput
from src.policies_recommendations_profile_preferences.services.fire_scoring import recommend_fire_policies

router = APIRouter( prefix="/api/recommendations",tags=["Fire Recommendations"])

@router.post("/fire")
def get_fire_recommendations(
    user_input: FireRecommendationInput,
    db: Session = Depends(get_db)
):
    recommendations = recommend_fire_policies(db, user_input)

    return [
        {
            "policy_name": r["policy"].policy_name,
            "insurer": r["policy"].insurer,
            "premium": r["policy"].base_premium,
            "score": r["score"]
        }
        for r in recommendations
    ]
