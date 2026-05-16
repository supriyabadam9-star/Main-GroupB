from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.travel_policy import TravelPolicy
from src.policies_recommendations_profile_preferences.schemas.travel_recommendation import TravelRecommendationInput
from src.policies_recommendations_profile_preferences.services.travel_scoring import calculate_travel_score

router = APIRouter(
   prefix="/api/recommendations", tags=["Travel Recommendation"]
)

@router.post("/travel")
def recommend_travel_policies(
    input: TravelRecommendationInput,
    db: Session = Depends(get_db)
):
    policies = db.query(TravelPolicy).filter(
        TravelPolicy.status == "active",
        TravelPolicy.trip_type == input.trip_type,
        TravelPolicy.destination_type == input.destination_type,
        TravelPolicy.min_trip_days <= input.trip_duration_days,
        TravelPolicy.max_trip_days >= input.trip_duration_days,
        TravelPolicy.min_entry_age <= input.oldest_traveler_age,
        TravelPolicy.max_entry_age >= input.oldest_traveler_age,
        TravelPolicy.max_travelers >= input.number_of_travelers
    ).all()

    results = []
    for policy in policies:
        score = calculate_travel_score(policy, input)
        annual = float(policy.min_premium)
        results.append({
            "policy_id": policy.id,
            "policy_name": policy.policy_name,
            "insurer_name": policy.insurer_name,
            "monthly_premium": round(annual / 12, 2),
            "score": score
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:8]
