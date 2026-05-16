from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.home_policy import HomePolicy

router = APIRouter(prefix="/policies/home", tags=["Home Policies"])

@router.get("/{policy_id}")
def get_home_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.query(HomePolicy).filter(HomePolicy.id == policy_id).first()
    if not p:
        raise HTTPException(404, "Home policy not found")

    return {
        "id": p.id,
        "policy_name": p.policy_name,
        "insurer_name": p.insurer_name,
        "property_type": p.property_type,
        "ownership_type": p.ownership_type,
        "min_property_age": p.min_property_age,
        "max_property_age": p.max_property_age,
        "min_builtup_area": p.min_builtup_area,
        "max_builtup_area": p.max_builtup_area,
        "covers_structure": p.covers_structure,
        "covers_contents": p.covers_contents,
        "covers_valuables": p.covers_valuables,
        "covers_electronics": p.covers_electronics,
        "covers_rent_loss": p.covers_rent_loss,
        "min_sum_insured": p.min_sum_insured,
        "max_sum_insured": p.max_sum_insured,
        "supports_security_discount": p.supports_security_discount,
        "min_annual_premium": float(p.min_annual_premium),
        "max_annual_premium": float(p.max_annual_premium),
        "status": p.status,
    }
