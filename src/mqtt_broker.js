'use strict'
const mosca = require('mosca');
const SysLog = require('./logger');

const MODULE_NAME = '[BROKER]';

class MQTT_Broker{
    constructor(port = 1883){
        this.brokerSettings = {
            port:port
        };
        this.server = null;
    }

    start(){
        this.server = new mosca.Server(this.brokerSettings);

        this.server.on('clientConnected', (client) => {
            SysLog.info(`${client.id} CONNECTED.`, MODULE_NAME);
        });

        // this.server.on('clientDisconnected', (client) => {
        //     SysLog.info(`${client.id} DISCONNECTED.`, MODULE_NAME);
        // });

        this.server.on('subscribed', (topic, client) => {
            SysLog.info(`${client.id} SUBSCRIBED ${topic}.`, MODULE_NAME);
        });

        // this.server.on('unsubscribed', (topic, client) => {
        //     SysLog.info(`${client.id} UNSUBSCRIBED ${topic}.`, MODULE_NAME);
        // });

        // this.server.on('published', (msg, client) => {
        //     SysLog.info(`${client || 'NULL'} PUBLISH payload ${msg.payload}.`, MODULE_NAME);
        // });

        this.server.on('ready', () => {
            SysLog.info(`Started at port ${this.brokerSettings.port}.`, MODULE_NAME);
        });
    }

}

function getObject(port){
    return new MQTT_Broker(port);
}

module.exports = getObject;
