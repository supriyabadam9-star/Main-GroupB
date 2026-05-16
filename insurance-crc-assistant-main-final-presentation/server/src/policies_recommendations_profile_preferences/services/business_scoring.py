from src.policies_recommendations_profile_preferences.models.business_policy import BusinessPolicy

def calculate_business_score(policy: BusinessPolicy, user):
    score = 0

    # Business profile match
    if policy.business_type == user.business_type:
        score += 20

    if policy.business_size == user.business_size:
        score += 10

    if policy.ownership_type == user.ownership_type:
        score += 5

    if policy.risk_intensity == user.risk_intensity:
        score += 10

    # Financial eligibility
    if policy.min_annual_revenue <= user.annual_revenue <= policy.max_annual_revenue:
        score += 15

    if policy.min_asset_value <= user.total_asset_value <= policy.max_asset_value:
        score += 15

    # Coverage matching
    if user.property_damage_required and policy.covers_property_damage:
        score += 5
    if user.fire_cover_required and policy.covers_fire:
        score += 5
    if user.machinery_breakdown_required and policy.covers_machinery_breakdown:
        score += 5
    if user.theft_burglary_required and policy.covers_theft:
        score += 5
    if user.liability_cover_required and policy.covers_liability:
        score += 5
    if user.employee_safety_required and policy.covers_employee_safety:
        score += 5
    if user.cyber_insurance_required and policy.covers_cyber:
        score += 5
    if user.business_interruption_required and policy.covers_business_interruption:
        score += 5

    # Existing insurance logic (top-up bias)
    if user.existing_insurance:
        score += 5

    return score


def recommend_business_policies(db, user_input):
    policies = db.query(BusinessPolicy).filter(BusinessPolicy.status == "active").all()

    scored = []
    for policy in policies:
        score = calculate_business_score(policy, user_input)
        if score > 0:
            scored.append({"policy": policy, "score": score})

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:8]

from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.business_policy import BusinessPolicy


def recommend_business_policies(db: Session, user_input):
    policies = db.query(BusinessPolicy).filter(
        BusinessPolicy.status == "active"
    ).all()

    scored = []
    for policy in policies:
        score = calculate_business_score(policy, user_input)
        if score > 0:
            scored.append({
                "policy": policy,
                "score": score
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:8]

