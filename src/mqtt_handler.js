'use strict'
const mqtt = require('mqtt');
const SysLog = require('./logger');

const MODULE_NAME = '[MQ CLI]';

class MQTTHandler{
    constructor(host, clientId){
        this.mqttClient = null;
        this.brokerAddr = host;
        this.clientID = clientId + '.' + Math.random().toString(16).substr(2, 8);
        this.msgCallbacks = [];
    }

    connect(){
        this.mqttClient = mqtt.connect(this.brokerAddr, {clientId: this.clientID});

        this.mqttClient.on('error', (err) => {
            SysLog.error(`${this.clientID} error. Stop client services.`, MODULE_NAME)
            this.mqttClient.end();
        });

        this.mqttClient.on('connect', () => {
            SysLog.info(`${this.clientID} connected to broker (${this.brokerAddr}).`, MODULE_NAME);
        });

        this.mqttClient.on('close', () => {
            SysLog.info(`${this.clientID} disconnected.`, MODULE_NAME);
        });

        this.mqttClient.on('reconnect', () => {
            SysLog.info(`${this.clientID} reconnect...`, MODULE_NAME);
        })

        this.mqttClient.on('message', (topic, msg) =>{
            this.msgCallbacks.forEach(element => {
                if(this.match(element.topic, topic)){
                    element.callback(msg);
                }
            });
        });
    }

    registerChannel(topic, qos, callback){
        if(this.mqttClient){
            SysLog.info(`${this.clientID} subscribe on [${topic} - QOS ${qos}]`, MODULE_NAME);
            this.mqttClient.subscribe(topic, {qos: qos});
            this.msgCallbacks.push({
                topic:topic,
                qos:qos,
                callback: callback || function() {}
            });
        }
        else{
            SysLog.error('Register channel error. MQTT client instance does not created.', MODULE_NAME);
        }
    }

    sendMsg(topic, msg){
        if(this.mqttClient){
            this.mqttClient.publish(topic, msg);
        }
        else{
            SysLog.error('Publish msg error. Client instance does not created.', MODULE_NAME);
        }
    }

    // Multilevel wildcard matching
    // https://github.com/ralphtheninja/mqtt-match
    match(filter, topic) {
        const filterArray = filter.split('/');
        const length = filterArray.length;
        const topicArray = topic.split('/');
      
        for (var i = 0; i < length; ++i) {
          var left = filterArray[i];
          var right = topicArray[i];
          if (left === '#') return topicArray.length >= length - 1;
          if (left !== '+' && left !== right) return false;
        }
      
        return length === topicArray.length;
      }
}

let client = null;

function init(host, clientId){
    SysLog.info(`Init MQTT client.`, MODULE_NAME);
    client = new MQTTHandler(host, clientId);
    return client;
}

function getInstance(){
    if(!client){
        SysLog.error(`Client instance needs to init first.`, MODULE_NAME);
        return null;
    }

    return client;
}

module.exports = {
    init,
    getInstance
};
