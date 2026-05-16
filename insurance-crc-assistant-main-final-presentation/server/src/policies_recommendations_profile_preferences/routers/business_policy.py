from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.business_policy import BusinessPolicy

router = APIRouter(prefix="/policies/business", tags=["Business Policies"])

@router.get("/{policy_id}")
def get_business_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.query(BusinessPolicy).filter(BusinessPolicy.id == policy_id).first()
    if not p:
        raise HTTPException(404, "Business policy not found")

    return {
        "id": p.id,
        "policy_name": p.policy_name,
        "insurer": p.insurer,
        "status": p.status,
        "business_type": p.business_type,
        "business_size": p.business_size,
        "ownership_type": p.ownership_type,
        "risk_intensity": p.risk_intensity,
        "min_annual_revenue": p.min_annual_revenue,
        "max_annual_revenue": p.max_annual_revenue,
        "min_asset_value": p.min_asset_value,
        "max_asset_value": p.max_asset_value,
        "covers_property_damage": p.covers_property_damage,
        "covers_fire": p.covers_fire,
        "covers_machinery_breakdown": p.covers_machinery_breakdown,
        "covers_theft": p.covers_theft,
        "covers_liability": p.covers_liability,
        "covers_employee_safety": p.covers_employee_safety,
        "covers_cyber": p.covers_cyber,
        "covers_business_interruption": p.covers_business_interruption,
        "base_premium": float(p.base_premium),
    }
