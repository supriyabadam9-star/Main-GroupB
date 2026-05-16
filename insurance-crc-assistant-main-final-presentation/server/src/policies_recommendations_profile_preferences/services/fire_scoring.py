from src.policies_recommendations_profile_preferences.models.fire_policy import FirePolicy

def calculate_fire_score(policy: FirePolicy, user):
    score = 0

    # Property type match
    if policy.property_type == user.property_type:
        score += 20

    # Occupancy match
    if policy.occupancy_type == user.occupancy_type:
        score += 15

    # Construction type match
    if policy.construction_type == user.construction_type:
        score += 15

    # Property age eligibility
    if policy.min_property_age <= user.property_age <= policy.max_property_age:
        score += 10

    # Coverage requirements
    if user.fire and policy.covers_fire:
        score += 10
    if user.explosion and policy.covers_explosion:
        score += 5
    if user.lightning and policy.covers_lightning:
        score += 5
    if user.natural_disaster and policy.covers_natural_disaster:
        score += 5
    if user.burglary and policy.covers_burglary:
        score += 5
    if user.electronic_equipment and policy.covers_electronic_equipment:
        score += 5

    # Asset value fit
    if policy.min_stock_value <= user.stock_value <= policy.max_stock_value:
        score += 10

    if policy.min_machinery_value <= user.machinery_value <= policy.max_machinery_value:
        score += 10

    # Sum insured fit
    if policy.min_sum_insured <= user.total_sum_insured <= policy.max_sum_insured:
        score += 15

    return score


def recommend_fire_policies(db, user_input):
    policies = db.query(FirePolicy).filter(FirePolicy.status == "active").all()

    scored_policies = []
    for policy in policies:
        score = calculate_fire_score(policy, user_input)
        if score > 0:
            scored_policies.append({
                "policy": policy,
                "score": score
            })

    scored_policies.sort(key=lambda x: x["score"], reverse=True)
    return scored_policies[:8]

from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.fire_policy import FirePolicy


def recommend_fire_policies(db: Session, user_input):
    policies = db.query(FirePolicy).filter(
        FirePolicy.status == "active"
    ).all()

    scored = []
    for policy in policies:
        score = calculate_fire_score(policy, user_input)
        if score > 0:
            scored.append({
                "policy": policy,
                "score": score
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:8]

