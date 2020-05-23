const Config = {
    debugEnabled: true,
    brokerEnable: true,
    brokerPort: 1883,
    mqttBrokerAddr: 'mqtt://127.0.0.1:1883',
    mqttClientID: 'MiIO_MQ_Client',
    
    miDevice: {
        address: 'x.x.x.x',
        token: '3d94c6eabxxxxxxxxxxxxxxxxxxxxxxx'
    }
}

module.exports = Config