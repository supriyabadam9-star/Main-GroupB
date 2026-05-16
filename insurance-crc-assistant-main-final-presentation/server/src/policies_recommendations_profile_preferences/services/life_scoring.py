def calculate_required_cover(user):
    base_cover = user.annual_income * 10
    dependent_buffer = user.number_of_dependents * (user.annual_income * 2)
    return base_cover + dependent_buffer + user.total_liabilities


def calculate_life_score(policy, user):
    score = 0

    required_cover = calculate_required_cover(user)

    # Coverage fit
    if policy.min_sum_assured <= required_cover <= policy.max_sum_assured:
        score += 40

    # Premium fit
    if policy.min_monthly_premium <= user.monthly_premium_budget:
        score += 25

    # Policy term match
    if policy.min_policy_term <= user.preferred_policy_term <= policy.max_policy_term:
        score += 15

    # Riders
    if user.critical_illness and policy.critical_illness_rider:
        score += 10

    # Better affordability
    if policy.min_monthly_premium < user.monthly_premium_budget:
        score += 10

    return score

from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.life_policy import LifePolicy


def recommend_life_policies(db: Session, user_input):
    """
    Wrapper function.
    Uses existing calculate_life_score WITHOUT changing logic.
    """

    policies = db.query(LifePolicy).filter(
        LifePolicy.status == "active"
    ).all()

    scored_policies = []

    for policy in policies:
        score = calculate_life_score(policy, user_input)
        if score > 0:
            scored_policies.append({
                "policy": policy,
                "score": score
            })

    scored_policies.sort(key=lambda x: x["score"], reverse=True)
    return scored_policies[:8]

