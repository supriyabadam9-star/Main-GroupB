# test_db.py
from sqlalchemy import text
from server.app.database import engine_recommendations, engine_dashboard

def test_connection(engine, name):
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public';"))
            tables = result.fetchall()
            print(f"{name} DB tables:", tables)
    except Exception as e:
        print(f"{name} DB connection failed:", e)

if __name__ == "__main__":
    test_connection(engine_recommendations, "Recommendations")
    test_connection(engine_dashboard, "Dashboard")
