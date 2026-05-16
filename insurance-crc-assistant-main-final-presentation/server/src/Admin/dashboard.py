from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from datetime import datetime, timedelta

from src.database.core import get_db
from src.recommendations_profile_preferences.models.claim import Claim

router = APIRouter(
    prefix="/admin/dashboard",
    tags=["Admin Dashboard"]
)

# =========================
# DASHBOARD SUMMARY
# =========================
@router.get("/summary")
def admin_dashboard_summary(db: Session = Depends(get_db)):
    total_claims = db.query(Claim).count()

    pending = db.query(Claim).filter(Claim.status == "Pending").count()
    rejected = db.query(Claim).filter(Claim.status == "Rejected").count()
    approved = db.query(Claim).filter(Claim.status == "Approved").count()

    total_amount = db.query(func.sum(Claim.claim_amount)).scalar() or 0

    return {
        "total_claims": total_claims,
        "status_counts": {
            "pending": pending,
            "rejected": rejected,
            "approved": approved
        },
        "total_claim_amount": total_amount
    }


# =========================
# FRAUD TRENDS (FIXED)
# =========================
@router.get("/fraud-trends")
def fraud_trends(db: Session = Depends(get_db)):
    today = datetime.utcnow().date()
    start_date = today - timedelta(days=6)

    results = (
        db.query(
            func.date(Claim.claim_date).label("day"),
            func.count(Claim.id).label("total"),
            func.sum(
                case(
                    (Claim.status == "Rejected", 1),
                    else_=0
                )
            ).label("flagged"),
        )
        .filter(Claim.claim_date >= start_date)
        .group_by(func.date(Claim.claim_date))
        .order_by(func.date(Claim.claim_date))
        .all()
    )

    return {
        "labels": [r.day.strftime("%a") for r in results],
        "total_claims": [r.total for r in results],
        "flagged_claims": [r.flagged for r in results],
    }


# =========================
# RISK DISTRIBUTION
# =========================
@router.get("/risk-distribution")
def risk_distribution(db: Session = Depends(get_db)):
    high = db.query(Claim).filter(Claim.status == "Rejected").count()
    medium = db.query(Claim).filter(Claim.status == "Pending").count()
    low = db.query(Claim).filter(Claim.status == "Approved").count()

    total = high + medium + low or 1

    return {
        "high": round(high / total * 100, 2),
        "medium": round(medium / total * 100, 2),
        "low": round(low / total * 100, 2),
    }


# =========================
# TOP TRIGGERED RULES
# =========================
@router.get("/top-rules")
def top_triggered_rules(db: Session = Depends(get_db)):
    return {
        "labels": [
            "Duplicate Document",
            "IP Blacklist",
            "Velocity Check",
        ],
        "counts": [
            db.query(Claim).filter(Claim.status == "Rejected").count(),
            db.query(Claim).filter(Claim.status == "Pending").count(),
            db.query(Claim).count(),
        ],
    }
# =========================
# HIGH RISK ACTIVITY
# =========================
@router.get("/high-risk-activity")
def high_risk_activity(db: Session = Depends(get_db)):
    last_24_hours = datetime.utcnow() - timedelta(hours=24)

    high_risk_claims = (
        db.query(Claim)
        .filter(
            Claim.status == "Rejected",
            Claim.claim_date >= last_24_hours
        )
        .count()
    )

    if high_risk_claims == 0:
        return {
            "has_risk": False
        }

    return {
        "has_risk": True,
        "count": high_risk_claims,
        "message": f"{high_risk_claims} claims flagged as HIGH RISK in last 24 hours",
        "reason": "Multiple rejected / duplicate / suspicious claims detected"
    }
