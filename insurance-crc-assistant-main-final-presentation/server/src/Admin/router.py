from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from datetime import datetime
import io
import csv

from openpyxl import Workbook
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from src.database import get_db
from src.admin.service import (
    get_dashboard_cards,
    get_risk_distribution,
    get_fraud_trend
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin Dashboard"]
)

# =========================
# DASHBOARD DATA
# =========================

@router.get("/cards")
def dashboard_cards(db: Session = Depends(get_db)):
    return get_dashboard_cards(db)


@router.get("/risk-distribution")
def risk_distribution(db: Session = Depends(get_db)):
    return get_risk_distribution(db)


@router.get("/fraud-trend")
def fraud_trend(db: Session = Depends(get_db)):
    return get_fraud_trend(db)


# =========================
# EXPORT — CSV
# =========================

@router.get("/export/csv")
def export_dashboard_csv(db: Session = Depends(get_db)):
    data = get_dashboard_cards(db)

    status_counts = data.get("status_counts", {})

    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(["Metric", "Value"])
    writer.writerow(["Total Claims", data.get("total_claims", 0)])
    writer.writerow(["Pending Claims", status_counts.get("pending", 0)])
    writer.writerow(["Rejected Claims", data.get("rejected_claims", 0)])
    writer.writerow(["Risk Exposure", data.get("risk_exposure", 0)])
    writer.writerow(["Average Fraud Score", data.get("avg_fraud_score", 0)])
    writer.writerow(["Generated At", datetime.utcnow()])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=admin_dashboard.csv"}
    )


# =========================
# EXPORT — EXCEL
# =========================

@router.get("/export/excel")
def export_dashboard_excel(db: Session = Depends(get_db)):
    data = get_dashboard_cards(db)
    status_counts = data.get("status_counts", {})

    wb = Workbook()
    ws = wb.active
    ws.title = "Admin Dashboard"

    ws.append(["Metric", "Value"])
    ws.append(["Total Claims", data.get("total_claims", 0)])
    ws.append(["Pending Claims", status_counts.get("pending", 0)])
    ws.append(["Rejected Claims", data.get("rejected_claims", 0)])
    ws.append(["Risk Exposure", data.get("risk_exposure", 0)])
    ws.append(["Average Fraud Score", data.get("avg_fraud_score", 0)])
    ws.append(["Generated At", datetime.utcnow().isoformat()])

    stream = io.BytesIO()
    wb.save(stream)
    stream.seek(0)

    return StreamingResponse(
        stream,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=admin_dashboard.xlsx"}
    )


# =========================
# EXPORT — PDF
# =========================

@router.get("/export/pdf")
def export_dashboard_pdf(db: Session = Depends(get_db)):
    data = get_dashboard_cards(db)
    status_counts = data.get("status_counts", {})

    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    y = height - 50
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "Admin Dashboard Report")

    pdf.setFont("Helvetica", 11)
    y -= 40

    rows = [
        ("Total Claims", data.get("total_claims", 0)),
        ("Pending Claims", status_counts.get("pending", 0)),
        ("Rejected Claims", data.get("rejected_claims", 0)),
        ("Risk Exposure", data.get("risk_exposure", 0)),
        ("Average Fraud Score", data.get("avg_fraud_score", 0)),
        ("Generated At", datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")),
    ]

    for label, value in rows:
        pdf.drawString(50, y, f"{label}: {value}")
        y -= 20

    pdf.showPage()
    pdf.save()
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=admin_dashboard.pdf"}
    )
