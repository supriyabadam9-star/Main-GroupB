from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from pydantic import BaseModel

from src.database.core import get_db
from src.recommendations_profile_preferences.models.investigation import Investigation

router = APIRouter(
    prefix="/admin/investigations",
    tags=["Investigations"]
)

# =========================
# SCHEMA
# =========================
class InvestigationCreate(BaseModel):
    claimId: int
    investigator: str
    priority: str = "Medium"
    notes: str | None = None


# =========================
# CREATE INVESTIGATION
# =========================
@router.post("/")
def create_investigation(
    data: InvestigationCreate,
    db: Session = Depends(get_db)
):
    investigation = Investigation(
        claim_id=data.claimId,
        investigator=data.investigator,
        priority=data.priority,
        notes=data.notes,
        created_at=datetime.utcnow()
    )

    db.add(investigation)
    db.commit()
    db.refresh(investigation)

    return {
        "message": "Investigation created successfully",
        "id": investigation.id
    }


# =========================
# GET ALL INVESTIGATIONS
# =========================
@router.get("/")
def get_investigations(db: Session = Depends(get_db)):
    investigations = (
        db.query(Investigation)
        .order_by(Investigation.created_at.desc())
        .all()
    )

    return [
        {
            "id": i.id,
            "claim_id": i.claim_id,
            "investigator": i.investigator,
            "priority": i.priority,
            "notes": i.notes,
            "created_at": i.created_at
        }
        for i in investigations
    ]
