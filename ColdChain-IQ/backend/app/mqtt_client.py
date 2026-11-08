import json, os
import paho.mqtt.client as mqtt
from .ingest import process_telemetry

def start_mqtt():
    host = os.getenv("MQTT_HOST")
    if not host:
        return None
    port = int(os.getenv("MQTT_PORT", "1883"))
    topic = os.getenv("MQTT_TOPIC", "coldchain/+/telemetry")
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id="coldchain-api")
    def on_connect(client, userdata, flags, reason_code, properties):
        if reason_code == 0:
            client.subscribe(topic)
    def on_message(client, userdata, message):
        try:
            process_telemetry(json.loads(message.payload.decode()))
        except Exception as exc:
            print(f"Rejected MQTT message: {exc}")
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect_async(host, port, keepalive=60)
    client.loop_start()
    return client
