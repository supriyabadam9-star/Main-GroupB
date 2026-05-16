from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from datetime import datetime, timedelta

from src.database.core import get_db
from src.recommendations_profile_preferences.models.claim import Claim
from src.recommendations_profile_preferences.models.fraud_events import FraudEvent
from src.recommendations_profile_preferences.models.rule_triggers import RuleTrigger

router = APIRouter(
    prefix="/admin/dashboard",
    tags=["Admin Dashboard"]
)

# =========================
# DASHBOARD SUMMARY
# =========================
@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    total_claims = db.query(Claim).count()
    pending_claims = db.query(Claim).filter(Claim.status == "Pending").count()

    risk_exposure = (
        db.query(func.sum(Claim.claim_amount)).scalar() or 0
    )

    # Average fraud score from FraudEvent table
    avg_fraud_score = db.query(func.avg(FraudEvent.fraud_score)).scalar() or 0

    return {
        "total_claims": total_claims,
        "pending_claims": pending_claims,
        "risk_exposure": risk_exposure,
        "avg_fraud_score": round(avg_fraud_score, 2),
    }


# =========================
# FRAUD TRENDS (LINE CHART)
# =========================
@router.get("/fraud-trends")
def fraud_trends(db: Session = Depends(get_db)):
    today = datetime.utcnow().date()
    start_date = today - timedelta(days=6)

    results = (
        db.query(
            FraudEvent.event_date.label("day"),
            func.count(FraudEvent.id).label("total"),
            func.sum(
                case([(FraudEvent.flagged == True, 1)], else_=0)
            ).label("flagged"),
        )
        .filter(FraudEvent.event_date >= start_date)
        .group_by(FraudEvent.event_date)
        .order_by(FraudEvent.event_date)
        .all()
    )

    labels = []
    total_claims = []
    flagged_claims = []

    for row in results:
        labels.append(row.day.strftime("%a") if row.day else "Unknown")
        total_claims.append(row.total or 0)
        flagged_claims.append(row.flagged or 0)

    # FraudRateAnalysis.jsx expects {labels, total_claims, flagged_claims}
    return {
        "labels": labels,
        "total_claims": total_claims,
        "flagged_claims": flagged_claims,
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
    results = (
        db.query(RuleTrigger.rule_name, func.count(RuleTrigger.id).label("count"))
        .group_by(RuleTrigger.rule_name)
        .order_by(func.count(RuleTrigger.id).desc())
        .all()
    )

    # TopTriggeredRules.jsx expects an array of objects [{rule, count}, ...]
    rules = [{"rule": row.rule_name, "count": row.count} for row in results]

    return rules