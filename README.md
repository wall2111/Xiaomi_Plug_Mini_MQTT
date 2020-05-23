## Install

```
npm install
```

## MiIO Library
[MiIO Library](https://github.com/aholstenson/miio)
Use to communication with the Xiaomi devices.

## Get Xiaomi device token
[Preference](https://github.com/Maxmudjon/com.xiaomi-miio/blob/master/docs/obtain_token.md)

### Method 1 - Nodejs Command Line Tool from the miIO Device library

The author of the miIO Device Library which is used by this Homey app has also created a nodejs command line tool for retrieving device tokens. Please follow the steps in [these instructions](https://github.com/aholstenson/miio/blob/master/docs/management.md) to retrieve the token for the supported miio devices. Be aware that some devices hide their token after the device has been setup in the Mi Home app. Retrieving tokens for these devices will not work with this method but require method 3.

### Method 2 - Packet Sender Tool

During setup of Mi Home devices the device tokens an be retrieved by sending a ping command to the device. This method uses a tool called Packet Sender which you will need to download. Choose the portable version which does not require installation.

Download the portable version of Packet Sender.
Reset the device following the instructions from the device manual, this usually means holding one or two buttons for 10 seconds. This will reset all device settings including the Wi-Fi settings.
After reset the device will create a it's own Wi-Fi network. This network will have a name related to the device and is used for configuring the device but will also allow us to retrieve the token. Connect to this Wi-Fi network with your computer which has Packet Sender running.
Open Packet Sender and enter the following details.

```
HEX: 21310020ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
IP: 192.168.8.1
Port: 54321
Protocol dropdown: UDP
```

Click send and the device will respond with an answer which contains the unique device token. In the last 16 bytes (32 characters) of the devices response is the device token. Copy and save it somewhere.
Disconnect your computer from the devices network, you can now use the Mi Home app to setup the device and connect it to your Wi-Fi network.

### Method 3 - netcat and Wireshark / tcpdump

Like above you can also use this shell command to send the magic package:

```
echo -ne '\x21\x31\x00\x20\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff' | nc -u 192.168.8.1 54321
```

While running this you have to listen with Wireshark or tcpdump for UDP packages sent as anser by the robot. Extract the last 16 bytes of the answer and convert them to a (32 characters) hexadecimal string using xxd -p.
