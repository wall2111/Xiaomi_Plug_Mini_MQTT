const miio = require('miio');
const SysLog = require('./logger');
const Config = require('./config');

const MODULE_NAME = "[MIIO_HANDLER]";

let miDevice = Config.miDevice;

class MiIO_Handler {

    static async ProcessMsg(msg, callback) {
        callback = callback || function() {};

        var control;

        try {
            control = JSON.parse(msg);
        } catch (err) {
            SysLog.error(`Data control parser FAILED => REJECTED.\n\tErr: ${err}`, MODULE_NAME);
            return;
        }

        if(control.state === 1) {
            SysLog.info(`Set control ON`);

            miio.device(miDevice)
            .then(device => {
                device.setPower(true)
                .then(() => {
                    callback('Set ON OK');
                    device.destroy();
                });
            })
            .catch(err => callback('ERR:' + err))               
        }
        else if (control.state === 2){
            SysLog.info(`Set control OFF`);

            miio.device(miDevice)
            .then(device => {
                device.setPower(false)
                .then(() => {
                    callback('Set OFF OK');
                    device.destroy();
                });
            })
            .catch(err => callback('ERR:' + err))
        }
        else if (control.state === 3) {
            SysLog.info(`Check device state`);

            miio.device(miDevice)
            .then(device => {
                device.power().
                then(isOn => {
                    callback('Outlet power: ' + isOn);
                    device.destroy();
                });
            })
            .catch(err => callback('ERR:' + err))
        }
        else if (control.state === 4) {
            SysLog.info(`Check device info`);

            miio.device(miDevice)
            .then(device => {
                device.management.info()
                .then(callback)
                .then(() => {
                    device.destroy();
                });
            })
            .catch(err => callback('ERR:' + err))
        }
        else
        {
            callback('Command not support.');
        }
    }
}

module.exports = MiIO_Handler;
