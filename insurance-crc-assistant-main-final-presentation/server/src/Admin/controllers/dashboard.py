from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from datetime import date, timedelta
import csv
from io import StringIO
from fastapi.responses import StreamingResponse

from src.database.core import SessionLocal
from src.Admin.dependencies import get_current_admin
from src.claims.models import Claim
from src.Admin.models.fraud_event import FraudEvent
from src.Admin.models.rule_trigger import RuleTrigger

router = APIRouter(
    prefix="/admin/dashboard",
    tags=["Admin Dashboard"],
)


# ---------------- DB ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =================================================
# DASHBOARD SUMMARY (SMART TIME WINDOW)
# =================================================
@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    # 🔹 Use most recent event date as anchor
    latest_event_date = (
        db.query(func.max(FraudEvent.event_date))
        .scalar()
    )

    if latest_event_date:
        anchor_date = latest_event_date.date()
    else:
        anchor_date = date.today()

    start_date = anchor_date - timedelta(days=6)
    end_date = anchor_date

    # ---------- TOTAL CLAIMS ----------
    total_claims = db.query(Claim).count()

    # ---------- FLAGGED CLAIMS ----------
    flagged_claims = (
        db.query(FraudEvent)
        .filter(
            FraudEvent.flagged.is_(True),
            FraudEvent.event_date >= start_date,
            FraudEvent.event_date <= end_date,
        )
        .count()
    )

    # ---------- AVG FRAUD SCORE ----------
    avg_fraud_score = (
        db.query(func.avg(FraudEvent.fraud_score))
        .filter(
            FraudEvent.event_date >= start_date,
            FraudEvent.event_date <= end_date,
        )
        .scalar()
    ) or 0

    # ---------- RISK DISTRIBUTION ----------
    high = db.query(FraudEvent).filter(
        FraudEvent.event_date >= start_date,
        FraudEvent.event_date <= end_date,
        FraudEvent.fraud_score >= 70,
    ).count()

    medium = db.query(FraudEvent).filter(
        FraudEvent.event_date >= start_date,
        FraudEvent.event_date <= end_date,
        FraudEvent.fraud_score.between(40, 69),
    ).count()

    low = db.query(FraudEvent).filter(
        FraudEvent.event_date >= start_date,
        FraudEvent.event_date <= end_date,
        FraudEvent.fraud_score < 40,
    ).count()

    # ---------- RISK EXPOSURE ----------
    risk_exposure = (
        db.query(func.sum(FraudEvent.fraud_score))
        .filter(
            FraudEvent.event_date >= start_date,
            FraudEvent.event_date <= end_date,
        )
        .scalar()
    ) or 0

    # ---------- FRAUD TREND ----------
    trend_rows = (
        db.query(
            func.date(FraudEvent.event_date).label("day"),
            func.count(FraudEvent.id).label("total"),
            func.sum(
                case(
                    (FraudEvent.flagged.is_(True), 1),
                    else_=0,
                )
            ).label("flagged"),
        )
        .filter(
            FraudEvent.event_date >= start_date,
            FraudEvent.event_date <= end_date,
        )
        .group_by(func.date(FraudEvent.event_date))
        .all()
    )

    trend_map = {
        row.day: {
            "total": int(row.total),
            "flagged": int(row.flagged or 0),
        }
        for row in trend_rows
    }

    trend = []
    for i in range(6, -1, -1):
        day = anchor_date - timedelta(days=i)
        stats = trend_map.get(day, {"total": 0, "flagged": 0})

        trend.append({
            "date": day.isoformat(),
            "day": day.strftime("%a"),
            "total": stats["total"],
            "flagged": stats["flagged"],
        })

    # ---------- TOP RULES ----------
    latest_rule_trigger = (
    db.query(func.max(RuleTrigger.triggered_at))
    .scalar()
    )

    if latest_rule_trigger:
        rules_end = latest_rule_trigger
        rules_start = rules_end - timedelta(days=6)
    else:
        rules_start = start_date
        rules_end = end_date

    top_rules = (
        db.query(
            RuleTrigger.rule_name,
            func.count(RuleTrigger.id).label("count"),
        )
        .filter(
            RuleTrigger.triggered_at >= rules_start,
            RuleTrigger.triggered_at <= rules_end,
        )
        .group_by(RuleTrigger.rule_name)
        .order_by(func.count(RuleTrigger.id).desc())
        .limit(5)
        .all()
    )


    return {
        "total_claims": total_claims,
        "flagged_claims": flagged_claims,
        "avg_fraud_score": round(avg_fraud_score),
        "risk_exposure": risk_exposure,
        "risk_distribution": {
            "high": high,
            "medium": medium,
            "low": low,
        },
        "top_rules": [
            {"rule": r.rule_name, "count": r.count}
            for r in top_rules
        ],
        "trend": trend,
    }


# =================================================
# CSV EXPORT
# =================================================
@router.get("/export")
def export_dashboard_csv(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    output = StringIO()
    writer = csv.writer(output)

    writer.writerow(["Metric", "Value"])
    writer.writerow(["Total Claims", db.query(Claim).count()])
    writer.writerow([
        "Flagged Claims",
        db.query(FraudEvent).filter(FraudEvent.flagged.is_(True)).count(),
    ])
    writer.writerow([
        "Average Fraud Score",
        round(db.query(func.avg(FraudEvent.fraud_score)).scalar() or 0),
    ])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=fraud_dashboard.csv"
        },
    )
