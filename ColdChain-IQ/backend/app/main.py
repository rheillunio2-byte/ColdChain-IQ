from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import TelemetryIn
from .ingest import process_telemetry
from .store import get_readings
from .mqtt_client import start_mqtt

DEMO_SHIPMENTS = [
 {"id":"CC-2048","name":"Atlantic salmon","category":"Seafood","origin":"General Santos","destination":"Cebu City","temperature_c":3.8,"humidity_pct":82,"risk":"low","shelf_life_days":4.8,"status":"In transit"},
 {"id":"CC-2047","name":"Fresh milk","category":"Dairy","origin":"Bukidnon","destination":"Cagayan de Oro","temperature_c":6.7,"humidity_pct":76,"risk":"high","shelf_life_days":1.2,"status":"In transit"},
 {"id":"CC-2046","name":"Romaine lettuce","category":"Produce","origin":"Malaybalay","destination":"Iligan City","temperature_c":2.9,"humidity_pct":91,"risk":"low","shelf_life_days":7.4,"status":"In transit"},
 {"id":"CC-2045","name":"Pork cuts","category":"Meat","origin":"Davao City","destination":"Butuan City","temperature_c":5.2,"humidity_pct":69,"risk":"critical","shelf_life_days":0.6,"status":"Attention"},
]
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.mqtt = start_mqtt()
    yield
    if app.state.mqtt:
        app.state.mqtt.loop_stop()
        app.state.mqtt.disconnect()

app = FastAPI(title="ColdChain IQ API", version="1.0.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/api/health")
def health():
    return {"status":"ok","service":"ColdChain IQ API"}

@app.get("/api/shipments")
def shipments():
    return DEMO_SHIPMENTS

@app.get("/api/shipments/{shipment_id}")
def shipment(shipment_id: str):
    found = next((s for s in DEMO_SHIPMENTS if s["id"] == shipment_id), None)
    if not found:
        raise HTTPException(404, "Shipment not found")
    return found

@app.get("/api/shipments/{shipment_id}/readings")
def readings(shipment_id: str):
    return get_readings(shipment_id)

@app.post("/api/telemetry")
def telemetry(payload: TelemetryIn):
    return process_telemetry(payload.model_dump())

@app.get("/api/reports/compliance")
def compliance():
    return {"period":"last_30_days","compliance_rate_pct":98.4,"completed_shipments":128,"excursions":7,"note":"Demo summary; connect persisted readings for production reporting."}
