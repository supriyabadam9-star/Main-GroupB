def calculate_motor_score(policy, user):
    score = 0

    # Coverage match
    if policy.coverage_type == user.preferred_coverage_type:
        score += 40

    # IDV preference
    if user.idv_preference == "low" and policy.supports_low_idv:
        score += 15
    elif user.idv_preference == "recommended" and policy.supports_recommended_idv:
        score += 15
    elif user.idv_preference == "high" and policy.supports_high_idv:
        score += 15

    # Claim history
    if not user.claim_last_year or policy.allows_claim_history:
        score += 20

    # Lower premium advantage
    score += 25

    return score

from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.motor_policy import MotorPolicy


def recommend_motor_policies(db: Session, user_input):
    policies = db.query(MotorPolicy).filter(
        MotorPolicy.status == "active"
    ).all()

    scored = []
    for policy in policies:
        score = calculate_motor_score(policy, user_input)
        if score > 0:
            scored.append({
                "policy": policy,
                "score": score
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:8]

