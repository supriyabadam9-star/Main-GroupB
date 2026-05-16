from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.services.profile_services import get_profile
from src.policies_recommendations_profile_preferences.services.recommendation_service import (
    get_recommendations_for_profile,
)

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])

@router.get("/{user_id}")
def recommend_from_profile(user_id: int, db: Session = Depends(get_db)):
    profile = get_profile(db, user_id)
    if not profile:
        return {"recommendations": []}

    return {
        "recommendations": get_recommendations_for_profile(db, profile)
    }
