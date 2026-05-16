from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.life_policy import LifePolicy

router = APIRouter(prefix="/policies/life", tags=["Life Policies"])

@router.get("/{policy_id}")
def get_life_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.query(LifePolicy).filter(LifePolicy.id == policy_id).first()
    if not p:
        raise HTTPException(404, "Life policy not found")

    return {
        "id": p.id,
        "policy_name": p.policy_name,
        "insurer_name": p.insurer_name,
        "policy_type": p.policy_type,
        "min_entry_age": p.min_entry_age,
        "max_entry_age": p.max_entry_age,
        "min_sum_assured": p.min_sum_assured,
        "max_sum_assured": p.max_sum_assured,
        "min_policy_term": p.min_policy_term,
        "max_policy_term": p.max_policy_term,
        "smoker_allowed": p.smoker_allowed,
        "critical_illness_allowed": p.critical_illness_allowed,
        "min_monthly_premium": float(p.min_monthly_premium),
        "max_monthly_premium": float(p.max_monthly_premium),
        "accidental_death_rider": p.accidental_death_rider,
        "critical_illness_rider": p.critical_illness_rider,
        "status": p.status,
    }
