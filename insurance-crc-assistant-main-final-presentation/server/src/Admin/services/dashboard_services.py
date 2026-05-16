from sqlalchemy.orm import Session
from sqlalchemy import func, case
from datetime import date, timedelta

from src.claims.models import Claim
from src.Admin.models.fraud_event import FraudEvent
from src.Admin.models.rule_trigger import RuleTrigger


def get_dashboard_metrics(db: Session):
    today = date.today()

    total_claims = db.query(Claim).count()

    flagged_claims = db.query(FraudEvent).filter(
        FraudEvent.flagged == True
    ).count()

    avg_fraud_score = db.query(
        func.avg(FraudEvent.fraud_score)
    ).scalar() or 0

    risk_exposure = db.query(
        func.sum(Claim.amount_claimed)
    ).join(
        FraudEvent, FraudEvent.claim_id == Claim.id
    ).filter(
        FraudEvent.flagged == True
    ).scalar() or 0

    return {
        "total_claims": total_claims,
        "flagged_claims": flagged_claims,
        "avg_fraud_score": round(avg_fraud_score, 2),
        "risk_exposure": float(risk_exposure),
    }


def get_top_triggered_rules(db: Session, limit: int = 5):
    results = (
        db.query(
            RuleTrigger.rule_name,
            func.count(RuleTrigger.id).label("count"),
        )
        .group_by(RuleTrigger.rule_name)
        .order_by(func.count(RuleTrigger.id).desc())
        .limit(limit)
        .all()
    )

    return [
        {"rule": r.rule_name, "count": r.count}
        for r in results
    ]
