from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from src.database import get_db
from .models import Policy
from .schema import (
    AdminPolicyCreate,
    AdminPolicyUpdate,
    AdminPolicyOut,
)
import random
import string

router = APIRouter(prefix="/admin/policies", tags=["Admin Policies"])


def generate_policy_number(length=8):
    return "POL-" + "".join(random.choices(string.digits, k=length))


# ===== CREATE POLICY =====
@router.post("", response_model=AdminPolicyOut)
def create_policy(payload: AdminPolicyCreate, db: Session = Depends(get_db)):
    renewal_date = datetime.utcnow() + timedelta(days=365)

    policy = Policy(
        user_id=1,
        policy_name=payload.policy_name,
        policy_type=payload.policy_type,
        company=payload.company,
        coverage_amount=payload.coverage_amount,
        premium=payload.premium if payload.premium is not None else 0,
        status=payload.status,   # ✅ IMPORTANT FIX
        coverage_details=payload.coverage_details or {},
        policy_number=generate_policy_number(),
        renewal_date=renewal_date,
    )

    db.add(policy)
    db.commit()
    db.refresh(policy)

    return policy


# ===== GET ALL POLICIES =====
@router.get("", response_model=list[AdminPolicyOut])
def get_all_policies(db: Session = Depends(get_db)):
    return db.query(Policy).order_by(Policy.created_at.desc()).all()


# ===== GET POLICY BY ID (VIEW PAGE) =====
@router.get("/{policy_id}", response_model=AdminPolicyOut)
def get_policy_by_id(policy_id: int, db: Session = Depends(get_db)):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()

    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    return policy


# ===== UPDATE POLICY (EDIT PAGE) =====
@router.put("/{policy_id}", response_model=AdminPolicyOut)
def update_policy(
    policy_id: int,
    payload: AdminPolicyUpdate,
    db: Session = Depends(get_db),
):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()

    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    if payload.policy_name is not None:
        policy.policy_name = payload.policy_name

    if payload.policy_type is not None:
        policy.policy_type = payload.policy_type

    if payload.company is not None:
        policy.company = payload.company

    if payload.coverage_amount is not None:
        policy.coverage_amount = payload.coverage_amount

    if payload.premium is not None:
        policy.premium = payload.premium

    if payload.status is not None:
        policy.status = payload.status

    if payload.coverage_details is not None:
        policy.coverage_details = payload.coverage_details

    db.commit()
    db.refresh(policy)

    return policy

#=============POLICY PUBLISH===================

@router.put("/{policy_id}/publish")
def publish_policy(policy_id: int, db: Session = Depends(get_db)):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()

    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    policy.status = "active"
    db.commit()
    db.refresh(policy)

    return {"message": "Policy published successfully"}
