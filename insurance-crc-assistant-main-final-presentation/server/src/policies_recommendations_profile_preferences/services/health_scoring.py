def calculate_health_score(policy, user):
    score = 0

    # Premium
    if policy.monthly_premium <= user.max_monthly_premium:
        score += 30

    # Cover amount
    if policy.min_cover_amount <= user.cover_amount <= policy.max_cover_amount:
        score += 20

    # Pre-existing diseases
    if not user.has_pre_existing_conditions:
        score += 15
    elif policy.pre_existing_waiting_months <= 24:
        score += 10

    # Maternity
    if not user.maternity_required:
        score += 15
    elif policy.maternity_supported:
        score += 15

    # Room preference
    if policy.room_rent_limit is None:
        score += 10
    elif user.room_preference == "shared":
        score += 5
    elif user.room_preference == "private" and policy.room_rent_limit >= 10000:
        score += 10
    elif user.room_preference == "suite" and policy.room_rent_limit >= 20000:
        score += 10

    # Deductible
    if user.deductible_preference == policy.deductible_type:
        score += 10

    # Co-pay
    if user.co_pay_acceptable or policy.co_pay_percentage == 0:
        score += 10

    return score

from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.health_policy import HealthPolicy


def recommend_health_policies(db: Session, user_input):
    """
    Wrapper function.
    Uses existing calculate_health_score WITHOUT changing logic.
    """

    policies = db.query(HealthPolicy).filter(
        HealthPolicy.status == "active"
    ).all()

    scored_policies = []

    for policy in policies:
        score = calculate_health_score(policy, user_input)
        if score > 0:
            scored_policies.append({
                "policy": policy,
                "score": score
            })

    scored_policies.sort(key=lambda x: x["score"], reverse=True)
    return scored_policies[:8]

