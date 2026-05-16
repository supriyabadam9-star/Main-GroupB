from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import shutil, os

from src.database.core import get_db
from .schemas import ClaimCreate
from .service import create_claim, get_all_claims, get_claim, save_document

router = APIRouter()

UPLOAD_DIR = "uploaded_docs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# TEMP USER (replace with JWT later)
def get_current_user():
    return 1


# =========================
# 🔹 NEW: POLICY OPTIONS API
# =========================
@router.get("/policies")
def get_policy_options():
    """
    Return available policy options for claim creation.
    Backend-driven (no frontend hardcoding).
    """
    return [
        "Health Insurance",
        "Travel Insurance",
        "Motor Insurance",
        "Home Insurance",
        "Life Insurance"
    ]
@router.get("/claim-types")
def get_claim_types():
    return [
        "Hospitalization",
        "Accident",
        "Theft"
    ]


# =========================
# STEP 1 – Create Claim
# =========================
@router.post("/")
def file_claim(
    data: ClaimCreate,
    db: Session = Depends(get_db)
):
    user_id = get_current_user()
    return create_claim(db, data, user_id)


# =========================
# STEP 2 – Upload Documents
# =========================
@router.post("/{claim_id}/upload")
def upload_document(
    claim_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    path = f"{UPLOAD_DIR}/{claim_id}_{file.filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    save_document(db, claim_id, file.filename, path)
    return {"message": "File uploaded successfully"}


# =========================
# CLAIM STATUS PAGE
# =========================
@router.get("/")
def list_claims(db: Session = Depends(get_db)):
    return get_all_claims(db, get_current_user())


# =========================
# TRACK CLAIM PAGE
# =========================
@router.get("/{claim_id}")
def track_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = get_claim(db, claim_id, get_current_user())
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim
