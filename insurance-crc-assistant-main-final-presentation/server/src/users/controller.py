from fastapi import APIRouter, Depends, HTTPException
from src.auth.jwt import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/user")
def user_dashboard(current_user=Depends(get_current_user)):
    if current_user["role"] != "USER":
        raise HTTPException(status_code=403, detail="Users only")
    return {"message": "Welcome User"}

@router.get("/admin")
def admin_dashboard(current_user=Depends(get_current_user)):
    if current_user["role"] != "ADMIN":
        raise HTTPException(status_code=403, detail="Admins only")
    return {"message": "Welcome Admin"}