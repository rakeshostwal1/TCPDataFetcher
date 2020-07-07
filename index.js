
/**
 * Required External Modules
 */

 const express = require("express");
const path = require("path");
const net = require('net');
const TLCModel = require("./tlcModel");
const fs = require('fs');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
});
  
/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

app.use('/files', require('./files'));

var server = net.createServer();    
server.on('connection', handleConnection);

server.listen(9000, function() {    
    console.log('server listening to %j', server.address());  
});


function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
    console.log('new client connection from %s', remoteAddress);
    conn.on('data', onConnData);  
    conn.once('close', onConnClose);  
    conn.on('error', onConnError);
    conn.setEncoding('utf8');

    function onConnData(d) {  
      console.log('connection data from %s: %j', remoteAddress, d);
      var inputStr = d.toString().trim().substring(1);
      console.log("inputStr: ", inputStr);
      inputStr = inputStr.substring(0, inputStr.length - 2);
      console.log("inputStr: ", inputStr);
      const inputArray = inputStr.split(',');
      if(inputArray != null && inputArray.length && inputArray[0] == 'TLC') {
        let resultSet = [];
        const path = './list.csv'
          try {
              if (!fs.existsSync(path)) {
                  const headerArray = getTLCModelHeaderArray();
                  resultSet.push(headerArray);
              }
          } catch(err) {
              console.error(err)
          }

          const tlcModel = convertTLCInputToModel(inputArray);
          resultSet.push(tlcModel);
        //   console.log('converted Array into model: ', resultSet);
          const ObjectsToCsv = require('objects-to-csv')
          const csv = new ObjectsToCsv(resultSet);
          csv.toDisk('./list.csv', { append: true });
      }

      console.log("inputArray: ", inputArray);
      conn.write("Received the data\n");
    }

    function onConnClose() {  
        console.log('connection from %s closed', remoteAddress);  
      }
      
      function onConnError(err) {  
        console.log('Connection %s error: %s', remoteAddress, err.message);  
      }
    }

function convertTLCInputToModel(inputArray) {
    if(inputArray != null && inputArray.length) {
        const tlcModel = TLCModel({
            Header: inputArray[0],
            IMEI: inputArray[1],
            DeviceModel: inputArray[2],
            PCBVersion: inputArray[3],
            ICCID: inputArray[4],
            FirmwareVersion: inputArray[5],
            FirmwareVersionExtended: inputArray[6],
            MSensorThreshold: inputArray[7],
            MSensorTimeout: inputArray[8],
            SleepModeConfiguration: inputArray[9],
            Reserved: inputArray[10],
            GPRSContextActivation: inputArray[11],
            APNNameConfiguration: inputArray[12],
            ServerPortConfiguration: inputArray[13],
            ServerDomain: inputArray[14],
            RegisteredMobileNumber1: inputArray[15],
            RegisteredMobileNumber2: inputArray[16],
            RegisteredMobileNumber3: inputArray[17],
            IgnitionOnDataInterval: inputArray[18],
            IgnitionOffDataInterval: inputArray[19],
            IgnitionOffMinRecords: inputArray[20],
            BatteryModeDataInterval: inputArray[21],
            BatteryModeMinRecords: inputArray[22],
            AngleBasedAcqActiveStatus: inputArray[23],
            OverspeedDetectionUnit: inputArray[24],
            DigitalInput1: inputArray[25],
            EnabledOrDisabledDigitalIOrP1: inputArray[26],
            ActiveHighOrLowDigitalIOrP1: inputArray[27],
            MonitoringOrAlertDigitalIOrP1: inputArray[28],
            DigitalInput2: inputArray[29],
            EnabledOrDisabledDigitalIOrP2: inputArray[30],
            PanicOrDigitalInputConfiguration: inputArray[31],
            MonitoringOrAlertDigitalIOrP2: inputArray[32],
            DigitalOutput: inputArray[33],
            EnableOrDisable: inputArray[34],
            IndependantOrScenario: inputArray[35],
            Pattern: inputArray[36],
            AnalogInput: inputArray[37],
            ADCPinConfiguration: inputArray[38],
            AnalogInputRange: inputArray[39],
            OverspeedSmsAlert: inputArray[40],
            PanicSmsAlert: inputArray[41],
            TwoAlwaySmsAlert: inputArray[42],
            TamperSmsAlert: inputArray[43],
            StaticNavigationConfiguration: inputArray[44],
            MaxPacketCountPerConnection: inputArray[45],
            ServerAckConfiguration: inputArray[46],
            ServerResponseTimeout: inputArray[47],
            OdomerterConfiguration: inputArray[48],
            AccelerometerConfiguration: inputArray[49],
            AccelerometerGValue: inputArray[50]
        })

        return tlcModel;
    }
}

function getTLCModelHeaderArray() {
    let headerArray= [];
    headerArray.push('Header');
    headerArray.push('IMEI');
    headerArray.push('Device Model');
    headerArray.push('PCB Version');
    headerArray.push('ICCID');
    headerArray.push('Firmware Version');
    headerArray.push('Firmware Version extended');
    headerArray.push('M-Sensor Threshold');
    headerArray.push('M-Sensor Timeout');
    headerArray.push('Sleep Mode Configuration');
    headerArray.push('Reserved');
    headerArray.push('GPRS Context Activation Configuration');
    headerArray.push('APN Name Configuration');
    headerArray.push('Server Port Configuration');
    headerArray.push('Server Domain /IP Configuration');
    headerArray.push('Registered Mobile Number 1');
    headerArray.push('Registered Mobile Number 2');
    headerArray.push('Registered Mobile Number 3');
    headerArray.push('Ignition  On Data Interval');
    headerArray.push('Ignition On Min Records');
    headerArray.push('Ignition Off Data Interval');
    headerArray.push('Ignition Off Min Records');
    headerArray.push('Battery Mode Data Interval');
    headerArray.push('Battery Mode Min Records');
    headerArray.push('Angle Based Acq Active Status');
    headerArray.push('Overspeed Detection limit');
    headerArray.push('Digital Input 1');
    headerArray.push('Enable / Disable (Digital I/P 1)');
    headerArray.push('Active High / Low (Digital I/P 1)');
    headerArray.push('Monitoring / Alert ( Digital I/P 1)');
    headerArray.push('Digital Input 2');
    headerArray.push('Enable / Disable (Digital I/P 2)');
    headerArray.push('Panic/Digital Input (Active  Low )configuration');
    headerArray.push('Monitoring / Alert ( Digital I/P 2)');
    headerArray.push('Digital O/P ');
    headerArray.push('Enable / Disable');
    headerArray.push('Independent / Scenario');
    headerArray.push('Analog Input');
    headerArray.push('ADC Pin Configuration');
    headerArray.push('Analog Input Range');
    headerArray.push('Overspeed SMS Alert');
    headerArray.push('Panic SMS Alert (Press & Panic Tamper)');
    headerArray.push('Tow Away SMS alert');
    headerArray.push('Tamper SMS alert (Casing Tamper, Reconnect, Device on Backup)');
    headerArray.push('Static Navigation Configuration');
    headerArray.push('Max Packet count per connection(Packet limit)');
    headerArray.push('Server Ack Configuration');
    headerArray.push('Server Response Timeout ');
    headerArray.push('Odometer Configuration');
    headerArray.push('Accelerometer G Value');

    return headerArray;
}