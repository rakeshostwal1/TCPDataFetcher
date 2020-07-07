// const mongoose = require('mongoose');

const tlcModel = {
    Header:'',
    IMEI: '',
    DeviceModel: '',
    PCBVersion: '',
    ICCID: '',
    FirmwareVersion: '',
    FirmwareVersionExtended: '',
    MSensorThreshold: '',
    MSensorTimeout: '',
    SleepModeConfiguration: '',
    Reserved: '',
    GPRSContextActivation: '',
    APNNameConfiguration: '',
    ServerPortConfiguration: '',
    ServerDomain: '',
    RegisteredMobileNumber1: '',
    RegisteredMobileNumber2: '',
    RegisteredMobileNumber3: '',
    IgnitionOnDataInterval: '',
    IgnitionOffDataInterval: '',
    IgnitionOffMinRecords: '',
    BatteryModeDataInterval: '',
    BatteryModeMinRecords: '',
    AngleBasedAcqActiveStatus: '',
    OverspeedDetectionUnit: '',
    DigitalInput1: '',
    EnabledOrDisabledDigitalIOrP1: '',
    ActiveHighOrLowDigitalIOrP1: '',
    MonitoringOrAlertDigitalIOrP1: '',
    DigitalInput2: '',
    EnabledOrDisabledDigitalIOrP2: '',
    PanicOrDigitalInputConfiguration: '',
    MonitoringOrAlertDigitalIOrP2: '',
    DigitalOutput: '',
    EnableOrDisable: '',
    IndependantOrScenario: '',
    Pattern: '',
    AnalogInput: '',
    ADCPinConfiguration: '',
    AnalogInputRange: '',
    OverspeedSmsAlert: '',
    PanicSmsAlert: '',
    TwoAlwaySmsAlert: '',
    TamperSmsAlert: '',
    StaticNavigationConfiguration: '',
    MaxPacketCountPerConnection: '',
    ServerAckConfiguration: '',
    ServerResponseTimeout: '',
    OdomerterConfiguration: '',
    AccelerometerConfiguration: '',
    AccelerometerGValue: ''
}

const TLCModel = module.exports = tlcModel;