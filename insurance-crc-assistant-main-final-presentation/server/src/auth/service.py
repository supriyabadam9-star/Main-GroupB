from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

# ======================
# JWT CONFIG
# ======================
SECRET_KEY = "super-secret-key"   # move to env later
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ======================
# PASSWORD CONFIG
# ======================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
BCRYPT_MAX_LENGTH = 72  # bcrypt hard limit

# ======================
# PASSWORD HELPERS
# ======================
def hash_password(password: str) -> str:
    """
    Hash a raw password safely for bcrypt.
    """
    if not password:
        raise ValueError("Password cannot be empty")

    # ✅ Enforce bcrypt limit
    safe_password = password[:BCRYPT_MAX_LENGTH]
    return pwd_context.hash(safe_password)


def verify_password(password: str, hashed_password: str) -> bool:
    """
    Verify raw password against stored bcrypt hash.
    """
    if not password or not hashed_password:
        return False

    # ✅ Enforce bcrypt limit
    safe_password = password[:BCRYPT_MAX_LENGTH]
    return pwd_context.verify(safe_password, hashed_password)


# ======================
# JWT HELPERS
# ======================
def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    """
    Create JWT access token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
