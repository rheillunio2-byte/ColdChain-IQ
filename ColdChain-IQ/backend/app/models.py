from datetime import datetime, timezone
from pydantic import BaseModel, Field

class TelemetryIn(BaseModel):
    device_id: str = Field(min_length=2, max_length=80)
    shipment_id: str = Field(min_length=2, max_length=40)
    temperature_c: float = Field(ge=-40, le=80)
    humidity_pct: float = Field(ge=0, le=100)
    recorded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TelemetryOut(TelemetryIn):
    risk_score: int
    risk_level: str
