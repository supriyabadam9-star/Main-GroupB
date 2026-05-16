from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.fire_policy import FirePolicy

router = APIRouter(prefix="/policies/fire", tags=["Fire Policies"])

@router.get("/{policy_id}")
def get_fire_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.query(FirePolicy).filter(FirePolicy.id == policy_id).first()
    if not p:
        raise HTTPException(404, "Fire policy not found")

    return {
        "id": p.id,
        "policy_name": p.policy_name,
        "insurer": p.insurer,
        "property_type": p.property_type,
        "occupancy_type": p.occupancy_type,
        "construction_type": p.construction_type,
        "min_property_age": p.min_property_age,
        "max_property_age": p.max_property_age,
        "covers_fire": p.covers_fire,
        "covers_explosion": p.covers_explosion,
        "covers_lightning": p.covers_lightning,
        "covers_natural_disaster": p.covers_natural_disaster,
        "covers_burglary": p.covers_burglary,
        "covers_electronic_equipment": p.covers_electronic_equipment,
        "min_stock_value": p.min_stock_value,
        "max_stock_value": p.max_stock_value,
        "min_machinery_value": p.min_machinery_value,
        "max_machinery_value": p.max_machinery_value,
        "min_sum_insured": p.min_sum_insured,
        "max_sum_insured": p.max_sum_insured,
        "base_premium": p.base_premium,
        "status": p.status,
    }
