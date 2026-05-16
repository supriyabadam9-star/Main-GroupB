import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from src.database.core import Base, engine
from src.users.models import User
from src.auth.service import hash_password

# ================= LOAD ENV =================
load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# ================= APP INIT =================
app = FastAPI(
    title="Insurance CRC Assistant"
)

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= STATIC FILES =================
app.mount(
    "/media",
    StaticFiles(
        directory="src/policies_recommendations_profile_preferences/static/media"
    ),
    name="media",
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)







# =====================================================
# 🔴 IMPORT ALL MODELS FIRST (CRITICAL)
# =====================================================
from src.claims.models import Claim, ClaimDocument
from src.policies_recommendations_profile_preferences.models.profile import Profile
from src.policies_recommendations_profile_preferences.models.health_policy import HealthPolicy
from src.policies_recommendations_profile_preferences.models.motor_policy import MotorPolicy
from src.policies_recommendations_profile_preferences.models.life_policy import LifePolicy
from src.policies_recommendations_profile_preferences.models.home_policy import HomePolicy
from src.policies_recommendations_profile_preferences.models.travel_policy import TravelPolicy
from src.policies_recommendations_profile_preferences.models.fire_policy import FirePolicy
from src.policies_recommendations_profile_preferences.models.business_policy import BusinessPolicy
from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.policies_recommendations_profile_preferences.models.recommendation import Recommendation
from src.Admin.models.fraud_event import FraudEvent
from src.Admin.models.rule_trigger import RuleTrigger

# ================= DATABASE =================
Base.metadata.create_all(bind=engine)

# ================= AUTH / USERS =================
from src.auth.controller import router as auth_router
from src.users.controller import router as users_router

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(users_router, prefix="/users", tags=["Users"])

# ================= CLAIMS =================
from src.claims.controller import router as claims_router
app.include_router(claims_router, prefix="/claims", tags=["Claims"])

# ================= POLICY CATALOG =================
from src.policies_recommendations_profile_preferences.routers.policy_catalog import (
    router as policy_catalog_router,
)
app.include_router(policy_catalog_router, prefix="/catalog", tags=["Catalog"])

# ================= POLICY ROUTERS =================
from src.policies_recommendations_profile_preferences.routers.health_policy import router as health_policy_router
from src.policies_recommendations_profile_preferences.routers.motor_policy import router as motor_policy_router
from src.policies_recommendations_profile_preferences.routers.life_policy import router as life_policy_router
from src.policies_recommendations_profile_preferences.routers.home_policy import router as home_policy_router
from src.policies_recommendations_profile_preferences.routers.travel_policy import router as travel_policy_router
from src.policies_recommendations_profile_preferences.routers.fire_policy import router as fire_policy_router
from src.policies_recommendations_profile_preferences.routers.business_policy import router as business_policy_router

app.include_router(health_policy_router)
app.include_router(motor_policy_router)
app.include_router(life_policy_router)
app.include_router(home_policy_router)
app.include_router(travel_policy_router)
app.include_router(fire_policy_router)
app.include_router(business_policy_router)

# ================= PROFILE =================
from src.policies_recommendations_profile_preferences.routers.profile import router as profile_router
app.include_router(profile_router, prefix="/profile", tags=["Profile"])

# ================= PREMIUM CALCULATOR =================
from src.policies_recommendations_profile_preferences.routers.premium_calculator import (
    router as premium_calculator_router,
)
app.include_router(premium_calculator_router)

# ================= RECOMMENDATIONS =================
from src.policies_recommendations_profile_preferences.routers.recommendations import (
    router as recommendations_router,
)
app.include_router(recommendations_router, prefix="/recommendations", tags=["Recommendations"])

from src.policies_recommendations_profile_preferences.routers.health_recommendation import router as health_recommendations_router
from src.policies_recommendations_profile_preferences.routers.motor_recommendation import router as motor_recommendations_router
from src.policies_recommendations_profile_preferences.routers.life_recommendation import router as life_recommendations_router
from src.policies_recommendations_profile_preferences.routers.home_recommendation import router as home_recommendations_router
from src.policies_recommendations_profile_preferences.routers.travel_recommendation import router as travel_recommendations_router
from src.policies_recommendations_profile_preferences.routers.fire_recommendation import router as fire_recommendations_router
from src.policies_recommendations_profile_preferences.routers.business_recommendation import router as business_recommendations_router

app.include_router(health_recommendations_router)
app.include_router(motor_recommendations_router)
app.include_router(life_recommendations_router)
app.include_router(home_recommendations_router)
app.include_router(travel_recommendations_router)
app.include_router(fire_recommendations_router)
app.include_router(business_recommendations_router)

# ================= DASHBOARD =================
from src.policies_recommendations_profile_preferences.dashboard.dashboard import (
    router as dashboard_router,
)
app.include_router(dashboard_router)

# ================= ADMIN =================
from src.Admin.controllers.dashboard import router as admin_dashboard_router
from src.Admin.controllers import flagged_claims
from src.Admin.controllers.fraud_rules import router as fraud_rules_router
from src.Admin.controllers import investigations

app.include_router(admin_dashboard_router)
app.include_router(flagged_claims.router)
app.include_router(fraud_rules_router)
app.include_router(investigations.router)

# ================= ADMIN AUTO CREATE =================



@app.on_event("startup")
def create_admin():
    db = Session(bind=engine)
    admin_email = "admin@insurance.com"

    admin = db.query(User).filter(User.email == admin_email).first()
    if admin is None:
        admin = User(
            name="Admin",  # <-- Provide name
            email=admin_email,
            hashed_password=hash_password("admin123"),
            role="ADMIN",
        )
        db.add(admin)
        db.commit()
        print("✅ Admin user created")

    db.close()



# @app.on_event("startup")
# def create_admin():
#     db = Session(bind=engine)

#     admin_email = "admin@insurance.com"

#     admin = db.query(User).filter(User.email == admin_email).first()

#     if admin is None:
#         admin = User(
#             email=admin_email,
#             hashed_password=hash_password("admin123"),
#             role="ADMIN",
#         )
#         db.add(admin)
#         db.commit()

#     db.close()
from src.Admin.controllers.dashboard import router as admin_dashboard_router
app.include_router(admin_dashboard_router)
from src.Admin.controllers import flagged_claims
app.include_router(flagged_claims.router)
from src.Admin.controllers.fraud_rules import router as fraud_rules_router
app.include_router(fraud_rules_router)
from src.Admin.controllers import investigations
app.include_router(investigations.router)


# ================= ROOT =================
@app.get("/")
def root():
    return {"status": "Insurance CRC Assistant API running"}
