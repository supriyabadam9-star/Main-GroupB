from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.schemas.business_recommendation import BusinessRecommendationInput
from src.policies_recommendations_profile_preferences.services.business_scoring import recommend_business_policies

router = APIRouter(
   prefix="/api/recommendations", tags=["Business Recommendations"]
)

@router.post("/business")
def get_business_recommendations(
    user_input: BusinessRecommendationInput,
    db: Session = Depends(get_db)
):
    recommendations = recommend_business_policies(db, user_input)

    return [
        {
            "policy_name": r["policy"].policy_name,
            "insurer": r["policy"].insurer,
            "premium": float(r["policy"].base_premium),
            "score": r["score"]
        }
        for r in recommendations
    ]
