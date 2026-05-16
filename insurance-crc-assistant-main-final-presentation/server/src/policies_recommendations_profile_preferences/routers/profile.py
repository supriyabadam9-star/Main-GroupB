from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.schemas.profile import ProfileCreate
from src.policies_recommendations_profile_preferences.services.profile_services import (
    save_profile,
    get_profile,
)
import json
import os
import uuid

router = APIRouter(prefix="/api/profile", tags=["Profile"])

# ✅ CORRECT MEDIA DIRECTORY
MEDIA_DIR = "src/policies_recommendations_profile_preferences/static/media"


@router.get("/{user_id}")
def load_profile(user_id: int, db: Session = Depends(get_db)):
    return get_profile(db, user_id)


@router.post("/{user_id}")
def update_profile(
    user_id: int,
    name: str = Form(None),
    dob: str = Form(None),
    address: str = Form(None),
    family_size: int = Form(1),
    preferences: str = Form(...),
    avatar: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    pref = json.loads(preferences)

    data = ProfileCreate(
        name=name,
        dob=dob,
        address=address,
        familySize=family_size,
        monthlyBudget=pref.get("monthly_budget"),
        goal=pref.get("goal"),
        categories=pref.get("categories", []),
    )

    avatar_path = None
    if avatar:
        # ensure folder exists
        os.makedirs(MEDIA_DIR, exist_ok=True)

        # unique filename
        ext = os.path.splitext(avatar.filename)[1]
        filename = f"{uuid.uuid4()}{ext}"

        file_path = os.path.join(MEDIA_DIR, filename)

        with open(file_path, "wb") as f:
            f.write(avatar.file.read())

        # path stored in DB
        avatar_path = f"/media/{filename}"

    return save_profile(db, user_id, data, avatar_path)
