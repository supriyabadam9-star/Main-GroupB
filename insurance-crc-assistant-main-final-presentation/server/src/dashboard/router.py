from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db

# Models
from src.recommendations_profile_preferences.models.user import User
from src.recommendations_profile_preferences.models.policy import Policy
from src.recommendations_profile_preferences.models.claim import Claim
from src.recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.recommendations_profile_preferences.models.recommendation import Recommendation

router = APIRouter()

@router.get("/user/{user_id}")
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    try:
        # -----------------------
        # Fetch user safely
        # -----------------------
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # -----------------------
        # Fetch other tables safely
        # -----------------------
        policies = db.query(Policy).filter(Policy.user_id == user_id).all() or []
        claims = db.query(Claim).filter(Claim.user_id == user_id).all() or []
        premium_analysis = db.query(PremiumAnalysis).filter(PremiumAnalysis.user_id == user_id).all() or []
        recommendations = db.query(Recommendation).filter(Recommendation.user_id == user_id).all() or []

        # -----------------------
        # Safe serialization for any ORM object
        # -----------------------
        def safe_serialize(obj):
            try:
                return {c.name: getattr(obj, c.name, None) for c in obj.__table__.columns}
            except Exception as e:
                print(f"Serialization error for {obj}: {e}")
                return {}

        # -----------------------
        # Return JSON
        # -----------------------
        return {
            "user": safe_serialize(user),
            "policies": [safe_serialize(p) for p in policies],
            "claims": [safe_serialize(c) for c in claims],
            "premiumAnalysis": [safe_serialize(pa) for pa in premium_analysis],
            "recommendations": [safe_serialize(r) for r in recommendations],
        }

    except Exception as e:
        # Prints the full error in backend terminal for debugging
        print("Dashboard route error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
