#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Replace these before flashing. Use a private broker and credentials in production.
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASSWORD = "YOUR_PASSWORD";
const char* MQTT_HOST = "192.168.1.10";
const int MQTT_PORT = 1883;
const char* DEVICE_ID = "ESP32-CC-001";
const char* SHIPMENT_ID = "CC-2048";

#define DHT_PIN 4
#define DHT_TYPE DHT22
#define ONE_WIRE_PIN 5
DHT dht(DHT_PIN, DHT_TYPE);
OneWire oneWire(ONE_WIRE_PIN);
DallasTemperature ds18b20(&oneWire);
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);
unsigned long lastPublish = 0;
const unsigned long PUBLISH_INTERVAL_MS = 30000;

void connectWifi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}
void connectMqtt() {
  while (!mqtt.connected()) {
    String clientId = String("coldchain-") + DEVICE_ID;
    if (mqtt.connect(clientId.c_str())) break;
    delay(2000);
  }
}
void setup() {
  Serial.begin(115200);
  dht.begin();
  ds18b20.begin();
  connectWifi();
  mqtt.setServer(MQTT_HOST, MQTT_PORT);
}
void loop() {
  if (WiFi.status() != WL_CONNECTED) connectWifi();
  if (!mqtt.connected()) connectMqtt();
  mqtt.loop();

  if (millis() - lastPublish >= PUBLISH_INTERVAL_MS) {
    lastPublish = millis();
    float humidity = dht.readHumidity();
    ds18b20.requestTemperatures();
    float temperature = ds18b20.getTempCByIndex(0);
    if (isnan(humidity) || temperature == DEVICE_DISCONNECTED_C) {
      Serial.println("Sensor read failed; skipping publish.");
      return;
    }
    char payload[220];
    snprintf(payload, sizeof(payload),
      "{\"device_id\":\"%s\",\"shipment_id\":\"%s\",\"temperature_c\":%.2f,\"humidity_pct\":%.2f}",
      DEVICE_ID, SHIPMENT_ID, temperature, humidity);
    String topic = String("coldchain/") + SHIPMENT_ID + "/telemetry";
    mqtt.publish(topic.c_str(), payload);
    Serial.println(payload);
  }
}
