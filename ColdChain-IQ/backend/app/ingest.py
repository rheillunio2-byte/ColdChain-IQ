from datetime import datetime, timezone
from .risk import assess_risk
from .store import add_reading

def process_telemetry(payload: dict):
    temperature = float(payload["temperature_c"])
    category = payload.get("product_category", "seafood")
    assessment = assess_risk(temperature, category)
    reading = {
        "device_id": str(payload["device_id"]),
        "shipment_id": str(payload["shipment_id"]),
        "temperature_c": temperature,
        "humidity_pct": float(payload["humidity_pct"]),
        "recorded_at": payload.get("recorded_at") or datetime.now(timezone.utc).isoformat(),
        **assessment,
    }
    add_reading(reading)
    return reading
