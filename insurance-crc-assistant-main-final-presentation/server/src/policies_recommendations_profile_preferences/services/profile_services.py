from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.profile import Profile
from src.policies_recommendations_profile_preferences.models.profile_category import ProfileCategory


def save_profile(db: Session, user_id: int, data, avatar_path=None):
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    if not profile:
        profile = Profile(user_id=user_id)
        db.add(profile)
        db.flush()

    profile.name = data.name
    profile.dob = data.dob
    profile.address = data.address
    profile.family_size = data.familySize
    profile.monthly_budget = data.monthlyBudget
    profile.goal = data.goal
    profile.risk_level = data.riskLevel

    if avatar_path:
        profile.avatar = avatar_path

    # replace categories
    db.query(ProfileCategory).filter(
        ProfileCategory.profile_id == profile.id
    ).delete()

    for cat in data.categories:
        db.add(ProfileCategory(profile_id=profile.id, category=cat))

    db.commit()
    db.refresh(profile)
    return profile


def get_profile(db: Session, user_id: int):
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not profile:
        return None

    categories = db.query(ProfileCategory.category).filter(
        ProfileCategory.profile_id == profile.id
    ).all()

    return {
        "id": profile.id,
        "name": profile.name,
        "dob": profile.dob,
        "address": profile.address,
        "familySize": profile.family_size,
        "monthlyBudget": profile.monthly_budget,
        "goal": profile.goal,
        "riskLevel": profile.risk_level,
        "avatar": profile.avatar,
        "categories": [c[0] for c in categories],
    }
