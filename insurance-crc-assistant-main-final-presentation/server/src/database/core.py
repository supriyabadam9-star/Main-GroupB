import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus
from dotenv import load_dotenv

load_dotenv()

# Database configuration
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "db_insurance")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD")

DB_PASSWORD_ENCODED = quote_plus(DB_PASSWORD)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)
DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD_ENCODED}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Import models to register them with SQLAlchemy
from src.users.models import User
from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.policies_recommendations_profile_preferences.models.recommendation import Recommendation








# import os
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base
# from urllib.parse import quote_plus
# from dotenv import load_dotenv

# # 👉 Change ONLY this line when needed


# load_dotenv()

# # Database configuration
# DB_HOST = os.getenv("DB_HOST", "localhost")
# DB_PORT = os.getenv("DB_PORT", "5432")
# DB_NAME = os.getenv("DB_NAME", "insurance_db")
# DB_USER = os.getenv("DB_USER", "postgres")
# DB_PASSWORD = os.getenv("DB_PASSWORD")
# # URL-encode password to safely handle special characters
# DB_PASSWORD_ENCODED = quote_plus(DB_PASSWORD)

# DATABASE_URL = (
#     f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD_ENCODED}"
#     f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# )




# # #DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/insurance_db"
# # # Example for your friend:
# # DATABASE_URL = "postgresql://postgres:girish109%40@localhost:5432/insurance_crc"

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

# Base = declarative_base()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # 🔥 FORCE SQLAlchemy TO REGISTER THESE MODELS
# from src.users.models import User
# from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
# from src.policies_recommendations_profile_preferences.models.recommendation import Recommendation

