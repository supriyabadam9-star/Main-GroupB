from passlib.context import CryptContext

# Use sha256_crypt instead of bcrypt
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

# The password you want to hash
password = "user1"  # you can change this

# Hash the password
hashed_password = pwd_context.hash(password)

print("Your hashed password is:")
print(hashed_password)
