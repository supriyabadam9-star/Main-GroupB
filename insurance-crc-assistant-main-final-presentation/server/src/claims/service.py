from sqlalchemy.orm import Session
from .models import Claim, ClaimDocument

def create_claim(db: Session, data, user_id: int):
    claim = Claim(user_id=user_id, **data.dict())
    db.add(claim)
    db.commit()
    db.refresh(claim)
    return claim

def get_all_claims(db: Session, user_id: int):
    return db.query(Claim).filter(Claim.user_id == user_id).all()

def get_claim(db: Session, claim_id: int, user_id: int):
    return (
        db.query(Claim)
        .filter(Claim.id == claim_id, Claim.user_id == user_id)
        .first()
    )

def save_document(db: Session, claim_id, filename, path):
    doc = ClaimDocument(
        claim_id=claim_id,
        file_name=filename,
        file_path=path
    )
    db.add(doc)
    db.commit()
