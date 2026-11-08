from collections import defaultdict, deque
from threading import Lock

_lock = Lock()
_readings = defaultdict(lambda: deque(maxlen=1000))

def add_reading(reading: dict):
    with _lock:
        _readings[reading["shipment_id"]].append(reading)

def get_readings(shipment_id: str):
    with _lock:
        return list(_readings[shipment_id])
