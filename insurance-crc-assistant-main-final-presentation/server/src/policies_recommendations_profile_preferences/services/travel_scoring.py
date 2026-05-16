def calculate_travel_score(policy, user):
    score = 0

    # Coverage matching
    if user.medical_cover_required and policy.medical_cover:
        score += 25
    if user.trip_cancellation_required and policy.trip_cancellation_cover:
        score += 15
    if user.baggage_cover_required and policy.baggage_cover:
        score += 10

    # Adventure sports
    if user.adventure_sports and policy.adventure_sports_allowed:
        score += 20

    # Coverage amount preference
    if user.coverage_amount_preference == "low" and policy.supports_low_cover:
        score += 10
    elif user.coverage_amount_preference == "medium" and policy.supports_medium_cover:
        score += 10
    elif user.coverage_amount_preference == "high" and policy.supports_high_cover:
        score += 10

    # Senior friendliness
    if user.oldest_traveler_age >= 60 and policy.senior_citizen_allowed:
        score += 10

    return score

from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.travel_policy import TravelPolicy


def recommend_travel_policies(db: Session, user_input):
    policies = db.query(TravelPolicy).filter(
        TravelPolicy.status == "active"
    ).all()

    scored = []
    for policy in policies:
        score = calculate_travel_score(policy, user_input)
        if score > 0:
            scored.append({
                "policy": policy,
                "score": score
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:8]
