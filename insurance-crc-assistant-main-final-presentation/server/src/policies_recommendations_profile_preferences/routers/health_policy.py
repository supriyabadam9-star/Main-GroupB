from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.health_policy import HealthPolicy

router = APIRouter(prefix="/policies/health", tags=["Health Policies"])

@router.get("/{policy_id}")
def get_health_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.query(HealthPolicy).filter(HealthPolicy.id == policy_id).first()
    if not p:
        raise HTTPException(404, "Health policy not found")

    return {
        "id": p.id,
        "policy_name": p.policy_name,
        "insurer_name": p.insurer_name,
        "supported_coverage_types": p.supported_coverage_types,
        "max_adults": p.max_adults,
        "max_children": p.max_children,
        "max_parents": p.max_parents,
        "min_cover_amount": float(p.min_cover_amount),
        "max_cover_amount": float(p.max_cover_amount),
        "monthly_premium": float(p.monthly_premium),
        "deductible_type": p.deductible_type,
        "co_pay_percentage": float(p.co_pay_percentage),
        "pre_existing_waiting_months": p.pre_existing_waiting_months,
        "maternity_supported": p.maternity_supported,
        "maternity_waiting_months": p.maternity_waiting_months,
        "room_rent_limit": float(p.room_rent_limit) if p.room_rent_limit else None,
        "status": p.status,
    }
