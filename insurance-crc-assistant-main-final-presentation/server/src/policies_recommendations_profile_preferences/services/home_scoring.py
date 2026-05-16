def calculate_required_home_cover(user):
    cover = 0

    # Structure cover (only for owned homes)
    if user.ownership_type == "owned" and user.need_structure:
        cover += user.builtup_area * 2500  # reconstruction cost per sq ft

    if user.need_contents:
        cover += 300000

    if user.need_valuables:
        cover += 500000

    if user.need_electronics:
        cover += 200000

    return cover


def calculate_home_score(policy, user):
    score = 0

    required_cover = calculate_required_home_cover(user)

    # Required sum insured fit
    if policy.min_sum_insured <= required_cover <= policy.max_sum_insured:
        score += 40

    # Coverage matching
    if user.need_structure and policy.covers_structure:
        score += 10
    if user.need_contents and policy.covers_contents:
        score += 10
    if user.need_valuables and policy.covers_valuables:
        score += 10
    if user.need_electronics and policy.covers_electronics:
        score += 10
    if user.need_rent_loss and policy.covers_rent_loss:
        score += 5

    # Property age fit
    if policy.min_property_age <= user.property_age <= policy.max_property_age:
        score += 10

    # Built-up area fit
    if policy.min_builtup_area <= user.builtup_area <= policy.max_builtup_area:
        score += 10

    # Security bonus
    if user.has_security and policy.supports_security_discount:
        score += 5

    return score

from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.home_policy import HomePolicy


def recommend_home_policies(db: Session, user_input):
    policies = db.query(HomePolicy).filter(
        HomePolicy.status == "active"
    ).all()

    scored = []
    for policy in policies:
        score = calculate_home_score(policy, user_input)
        if score > 0:
            scored.append({
                "policy": policy,
                "score": score
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:8]
