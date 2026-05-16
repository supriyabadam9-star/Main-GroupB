from sqlalchemy.orm import Session
from sqlalchemy import func, case
from src.claims.models import Claim


def get_dashboard_cards(db: Session):
    total_claims = db.query(func.count(Claim.id)).scalar()

    flagged_claims = db.query(func.count(Claim.id)) \
        .filter(Claim.status == "Rejected").scalar()

    risk_exposure = db.query(
        func.coalesce(func.sum(Claim.claim_amount), 0)
    ).scalar()

    avg_score = db.query(
        func.avg(
            case(
                (Claim.claim_amount >= 10000, 80),
                (Claim.claim_amount >= 5000, 50),
                else_=20
            )
        )
    ).scalar()

    return {
        "total_claims": total_claims,
        "flagged_claims": flagged_claims,
        "risk_exposure": float(risk_exposure),
        "avg_fraud_score": round(avg_score or 0, 2)
    }


def get_risk_distribution(db: Session):
    return {
        "high": db.query(func.count(Claim.id))
            .filter(Claim.claim_amount >= 10000).scalar(),

        "medium": db.query(func.count(Claim.id))
            .filter(Claim.claim_amount.between(5000, 9999)).scalar(),

        "low": db.query(func.count(Claim.id))
            .filter(Claim.claim_amount < 5000).scalar()
    }


def get_fraud_trend(db: Session):
    rows = db.query(
        func.date(Claim.claim_date).label("date"),
        func.count(Claim.id).label("total"),
        func.sum(
            case((Claim.status == "Rejected", 1), else_=0)
        ).label("flagged")
    ).group_by(func.date(Claim.claim_date)) \
     .order_by(func.date(Claim.claim_date)) \
     .limit(7).all()

    return [
        {
            "date": str(r.date),
            "total": r.total,
            "flagged": r.flagged
        } for r in rows
    ]
