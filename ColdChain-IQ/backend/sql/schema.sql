CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE IF NOT EXISTS sensor_readings (
    recorded_at TIMESTAMPTZ NOT NULL,
    device_id TEXT NOT NULL,
    shipment_id TEXT NOT NULL,
    temperature_c DOUBLE PRECISION NOT NULL,
    humidity_pct DOUBLE PRECISION NOT NULL,
    risk_score SMALLINT NOT NULL,
    risk_level TEXT NOT NULL,
    PRIMARY KEY (recorded_at, device_id)
);

SELECT create_hypertable('sensor_readings', 'recorded_at', if_not_exists => TRUE);

CREATE INDEX IF NOT EXISTS idx_sensor_shipment_time
ON sensor_readings (shipment_id, recorded_at DESC);
