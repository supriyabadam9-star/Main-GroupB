from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date, timedelta

from src.database.core import get_db
from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.policies_recommendations_profile_preferences.models.profile import Profile
from src.policies_recommendations_profile_preferences.models.health_policy import HealthPolicy
from src.policies_recommendations_profile_preferences.models.life_policy import LifePolicy
from src.policies_recommendations_profile_preferences.models.motor_policy import MotorPolicy
from src.claims.models import Claim

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


class DashboardResponse(BaseModel):
    profile: Optional[dict]
    policies: List[dict]
    claims: List[dict]
    premium_analysis: List[dict]


@router.get("/{user_id}", response_model=DashboardResponse)
def get_dashboard(user_id: int, db: Session = Depends(get_db)):

    # ---------- PROFILE ----------
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    profile_data = None

    if profile:
        profile_data = {
            "id": profile.id,
            "username": profile.name,
            "photo": profile.avatar,
            "risk": profile.risk_level,
            "role": "Policyholder",
            "tenure": "3 Years",
        }

    # ---------- POLICIES ----------
    policies = []

    today = date.today()
    renewal_date = today + timedelta(days=365)  # ✅ REAL renewal date

    health = db.query(HealthPolicy).limit(1).all()
    life = db.query(LifePolicy).limit(1).all()
    motor = db.query(MotorPolicy).limit(1).all()

    for p in health:
        policies.append({
            "id": p.id,
            "policy_type": "Health Insurance",
            "policy_name": p.policy_name,
            "policy_number": f"H-{p.id}",
            "premium": float(p.monthly_premium),
            "status": "active",
            "renewal_date": renewal_date,  # ✅ DATE OBJECT
        })

    for p in life:
        policies.append({
            "id": p.id,
            "policy_type": "Life Insurance",
            "policy_name": p.policy_name,
            "policy_number": f"L-{p.id}",
            "premium": float(p.min_monthly_premium),
            "status": "active",
            "renewal_date": renewal_date,
        })

    for p in motor:
        policies.append({
            "id": p.id,
            "policy_type": "Motor Insurance",
            "policy_name": p.policy_name,
            "policy_number": f"M-{p.id}",
            "premium": float(p.min_annual_premium),
            "status": "active",
            "renewal_date": renewal_date,
        })

    # ---------- CLAIMS ----------
    claims_db = (
        db.query(Claim)
        .filter(Claim.user_id == user_id)
        .order_by(Claim.created_at.desc())
        .limit(3)
        .all()
    )

    claims = []
    for c in claims_db:
        claims.append({
            "id": c.id,
            "policy_number": c.policy,
            "claim_date": c.incident_date,
            "claim_amount": c.amount_claimed,
            "status": c.status,
        })

    # ---------- PREMIUM ANALYSIS ----------
    premium_rows = (
        db.query(PremiumAnalysis)
        .filter(PremiumAnalysis.user_id == user_id)
        .all()
    )

    premium_analysis = []
    for p in premium_rows:
        premium_analysis.append({
            "category": p.category,
            "user_cost": float(p.user_cost),
            "market_cost": float(p.market_cost),
            "frequency": p.frequency.lower(),
        })

    return {
        "profile": profile_data,
        "policies": policies,
        "claims": claims,
        "premium_analysis": premium_analysis,
    }
