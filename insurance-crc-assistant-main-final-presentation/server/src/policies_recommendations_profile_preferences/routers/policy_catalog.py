from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.health_policy import HealthPolicy
from src.policies_recommendations_profile_preferences.models.motor_policy import MotorPolicy
from src.policies_recommendations_profile_preferences.models.life_policy import LifePolicy
from src.policies_recommendations_profile_preferences.models.home_policy import HomePolicy
from src.policies_recommendations_profile_preferences.models.travel_policy import TravelPolicy
from src.policies_recommendations_profile_preferences.models.business_policy import BusinessPolicy
from src.policies_recommendations_profile_preferences.models.fire_policy import FirePolicy

router = APIRouter(
    prefix="/policies/catalog",
    tags=["Policy Catalog"]
)


def monthly(premium):
    """Safe monthly conversion"""
    if premium is None:
        return 0
    return round(float(premium) / 12, 2)


@router.get("/")
def get_policy_catalog(db: Session = Depends(get_db)):
    results = []

    # ---------------- HEALTH ----------------
    for p in db.query(HealthPolicy).filter(HealthPolicy.status == "active").all():
        results.append({
            "id": p.id,
            "type": "health",
            "policy_name": p.policy_name,
            "insurer": p.insurer_name,
            "monthly_premium": float(p.monthly_premium),
        })

    # ---------------- MOTOR ----------------
    for p in db.query(MotorPolicy).filter(MotorPolicy.status == "active").all():
        results.append({
            "id": p.id,
            "type": "motor",
            "policy_name": p.policy_name,
            "insurer": p.insurer_name,
            "monthly_premium": monthly(p.min_annual_premium),
        })

    # ---------------- LIFE ----------------
    for p in db.query(LifePolicy).filter(LifePolicy.status == "active").all():
        results.append({
            "id": p.id,
            "type": "life",
            "policy_name": p.policy_name,
            "insurer": p.insurer_name,
            "monthly_premium": float(p.min_monthly_premium),
        })

    # ---------------- HOME ----------------
    for p in db.query(HomePolicy).filter(HomePolicy.status == "active").all():
        results.append({
            "id": p.id,
            "type": "home",
            "policy_name": p.policy_name,
            "insurer": p.insurer_name,
            "monthly_premium": monthly(p.min_annual_premium),
        })

    # ---------------- TRAVEL ----------------
    for p in db.query(TravelPolicy).filter(TravelPolicy.status == "active").all():
        results.append({
            "id": p.id,
            "type": "travel",
            "policy_name": p.policy_name,
            "insurer": p.insurer_name,
            "monthly_premium": float(p.min_premium),
        })

    # ---------------- BUSINESS ----------------
    for p in db.query(BusinessPolicy).filter(BusinessPolicy.status == "active").all():
        results.append({
            "id": p.id,
            "type": "business",
            "policy_name": p.policy_name,
            "insurer": p.insurer,
            "monthly_premium": monthly(p.base_premium),
        })

    # ---------------- FIRE ----------------
    for p in db.query(FirePolicy).filter(FirePolicy.status == "active").all():
        results.append({
            "id": p.id,
            "type": "fire",
            "policy_name": p.policy_name,
            "insurer": p.insurer,
            "monthly_premium": monthly(p.base_premium),
        })

    return results
