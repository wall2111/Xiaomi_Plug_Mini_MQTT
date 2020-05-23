'use strict'
const path = require("path");
//const disk = require('diskusage');

const TimeZone = 7; // vi-vn

const MODULE_NAME = '[SYS_UTILS]';

class SysUtilities{
    static getTimeStamp(){
        return Math.floor(new Date().getTime() / 1000);
    }
    
    static getTimeStampMs(){
        return new Date().getTime();
    }

    static getTimeDbgStr(){
        // toISOString does not use local time zone, need to add time zone offset.
        return new Date(Date.now() + (TimeZone * 3600 * 1000)).toISOString().replace("Z", "").replace("T", " ");
    }
    
    static getCurrentYear(){
        // The getFullYear() method returns the year (four digits for dates between 
        // year 1000 and 9999) of the specified date. 
        return new Date(this.getTimeStampMs()).getFullYear();
    }
    
    static getCurrentMonth(){
        // The getMonth() method returns the month (from 0 to 11) for the specified  
        // date, according to local time.
        return new Date(this.getTimeStampMs()).getMonth() + 1;
    }
    
    static getCurrentDate(){
        // The getDate() method returns the day of the month (from 1 to 31) for the 
        // specified date.
        return new Date(this.getTimeStampMs()).getDate();
    }

    // static testCurrentTime(){
    //     SysLog.info(`Current time: ${this.getCurrentYear()}/${this.getCurrentMonth()}/${this.getCurrentDate()} ${new Date().getHours()}:${new Date().getMinutes()}`, MODULE_NAME);
    // }

    static parseNumInt(inputStr = '', defaultVal = 0){
        // Be sure the input is string
        inputStr = `${inputStr}`;
        return isNaN(inputStr) ? defaultVal : parseInt(inputStr);
    }

    static getLastItemInArray(array = null, n = null){
        if (array == null) 
            return void 0;
        if (n == null) 
            return array[array.length - 1];
        return array.slice(Math.max(array.length - n, 0));
    }

    static stringFormatFixed(input = '', size = 0, c){
        if ( Math.abs(size) <= input.length ) {
            return input;
        }

        var m = Math.max((Math.abs(size) - input.length) || 0, 0);
        var pad = Array(m + 1).join(String(c || ' ').charAt(0));

        return (size < 0) ? pad + input : input + pad;
    }

    static GetSafePath(user_path){
        return path.normalize(user_path || '').replace(/^(\.\.(\/|\\|$))+/, '');
    }

    // static checkDiskFree(){
    //     disk.check('/', (err, info)=>{
    //         SysLog.info(`System free space ${info.free}/${info.total}`, MODULE_NAME);
    //     });
    // }
}

module.exports = SysUtilities;
