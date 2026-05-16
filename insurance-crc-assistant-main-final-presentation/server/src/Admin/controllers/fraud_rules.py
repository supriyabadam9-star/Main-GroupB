from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import SessionLocal
from src.Admin.models.fraud_rule import FraudRule

router = APIRouter(prefix="/admin/fraud-rules", tags=["Fraud Rules"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 List all fraud rules
@router.get("")
def get_fraud_rules(db: Session = Depends(get_db)):
    return db.query(FraudRule).order_by(FraudRule.created_at.desc()).all()


# 🔹 Create new fraud rule
@router.post("")
def create_fraud_rule(payload: dict, db: Session = Depends(get_db)):
    rule = FraudRule(
        rule_name=payload.get("rule_name"),
        category=payload.get("category"),
        severity=payload.get("severity"),
        threshold=payload.get("threshold"),
        active=payload.get("active", False),
    )

    db.add(rule)
    db.commit()
    db.refresh(rule)
    return rule


# 🔹 Get single fraud rule (FOR EDIT PAGE)
@router.get("/{rule_id}")
def get_fraud_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = db.query(FraudRule).filter(FraudRule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    return rule


# 🔹 Update fraud rule (SAVE EDIT)
@router.put("/{rule_id}")
def update_fraud_rule(rule_id: int, payload: dict, db: Session = Depends(get_db)):
    rule = db.query(FraudRule).filter(FraudRule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")

    rule.rule_name = payload.get("rule_name")
    rule.category = payload.get("category")
    rule.severity = payload.get("severity")
    rule.threshold = payload.get("threshold")
    rule.active = payload.get("active")

    db.commit()
    db.refresh(rule)
    return rule

# 🔹 Delete fraud rule
@router.delete("/{rule_id}")
def delete_fraud_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = db.query(FraudRule).filter(FraudRule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")

    db.delete(rule)
    db.commit()

    return {"message": "Rule deleted successfully"}

# 🔹 Toggle enable / disable
@router.post("/{rule_id}/toggle")
def toggle_fraud_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = db.query(FraudRule).filter(FraudRule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")

    rule.active = not rule.active
    db.commit()

    return {
        "message": "Rule status updated",
        "rule_id": rule_id,
        "active": rule.active
    }
