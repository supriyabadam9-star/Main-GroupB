from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import SessionLocal
from src.Admin.models.investigation import Investigation
from src.claims.models import Claim
from src.Admin.models.fraud_event import FraudEvent
from src.users.models import User

router = APIRouter(prefix="/admin/investigations", tags=["Investigations"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/start")
def start_investigation(payload: dict, db: Session = Depends(get_db)):
    claim_id = payload.get("claim_id")
    priority = payload.get("priority", "Medium")
    notes = payload.get("notes", "")

    if not claim_id:
        raise HTTPException(status_code=400, detail="claim_id required")

    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    fraud_event = (
        db.query(FraudEvent)
        .filter(FraudEvent.claim_id == claim_id)
        .first()
    )

    investigation = Investigation(
        claim_id=claim_id,
        investigator="Admin",
        investigator_id=1,  # admin id
        priority=priority,
        status="PENDING",
        notes=notes,
    )

    db.add(investigation)

    if fraud_event:
        fraud_event.flagged = False

    claim.status = "Under Investigation"

    db.commit()

    return {
        "message": "Investigation started successfully",
        "investigation_id": investigation.id,
    }


# ================= LIST INVESTIGATIONS =================
@router.get("/")
def get_investigations(db: Session = Depends(get_db)):
    rows = (
        db.query(
            Investigation.id,
            Investigation.claim_id,
            Investigation.priority,
            Investigation.status,
            Investigation.notes,
            Investigation.created_at,

            Claim.policy,
            Claim.amount_claimed,
            FraudEvent.fraud_score,

            User.email.label("policyholder_email"),
        )
        .join(Claim, Claim.id == Investigation.claim_id)
        .outerjoin(FraudEvent, FraudEvent.claim_id == Claim.id)
        .join(User, User.id == Claim.user_id)
        .order_by(Investigation.created_at.desc())
        .all()
    )

    return [
        {
            "id": r.id,
            "claim_id": r.claim_id,
            "policy": r.policy,
            "amount": r.amount_claimed,
            "fraud_score": r.fraud_score,
            "policyholder": r.policyholder_email,
            "priority": r.priority,
            "status": r.status,
            "notes": r.notes,
            "created_at": r.created_at,
        }
        for r in rows
    ]


# ================= UPDATE INVESTIGATION =================
@router.put("/{investigation_id}")
def update_investigation(
    investigation_id: int,
    payload: dict,
    db: Session = Depends(get_db),
):
    inv = db.query(Investigation).filter_by(id=investigation_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found")

    inv.priority = payload.get("priority", inv.priority)
    inv.notes = payload.get("notes", inv.notes)

    db.commit()
    return {"message": "Investigation updated successfully"}


# ================= DELETE INVESTIGATION =================
@router.delete("/{investigation_id}")
def delete_investigation(investigation_id: int, db: Session = Depends(get_db)):
    inv = db.query(Investigation).filter_by(id=investigation_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found")

    claim = db.query(Claim).filter_by(id=inv.claim_id).first()
    if claim:
        claim.status = "Rejected"

    db.delete(inv)
    db.commit()

    return {"message": "Investigation deleted and claim rejected"}
