const Config = require('./config');
const SysLog = require('./logger');
const mqttBroker = require('./mqtt_broker')(Config.brokerPort);
const mqttClient = require('./mqtt_handler').init(Config.mqttBrokerAddr, Config.mqttClientID);

const miPlug = require('./mi_plug_handler');

/********************************/

// Logging service
if(!Config.debugEnabled){
    SysLog.setLogLevel(SysLog.Level.OFF);
}

// Broker service
if(Config.brokerEnable){
    mqttBroker.start();
}

setTimeout(function () {
    // MQTT client service
    mqttClient.connect();

    mqttClient.registerChannel('mi_plug', 0, (msg) => {
        miPlug.ProcessMsg(msg, (result) => {
            mqttClient.sendMsg('mi_plug_ret', JSON.stringify({
                result: result
            }));
        });
    });
}, 5000);
