

let port = null;
let reader = null;
let writer = null;
let symResponce = "";
let serialMatch = "";
let dateMatch = "";
let decimalMatch = "";
let currentSettingsMatch = "";
let levelRageMatch = "";
let currentLevel = "";
let screenMessage = "";
let settingsMessage = "";

const findButtonsContainer = document.getElementById("findButtonsContainer");
const findButtonsContainerDisplay = findButtonsContainer.style.display;

const seeEverythingId = document.getElementById("seeEverythingId");
const seeEverythingIdDisplay = seeEverythingId.style.display;

const FindSymsId = document.getElementById("FindSymsId");
const FindSymsIdDisplay = seeEverythingId.style.display;

const textAreaContainer = document.getElementById("textAreaContainer");
const textAreaContainerDisplay = textAreaContainer.style.display;

const textAreaId = document.getElementById("textAreaId");
const textAreaIdDisplay = textAreaId.style.display;

const mainButtonsContainer = document.getElementById("mainButtonsContainer");
const mainButtonsContainerDisplay = mainButtonsContainer.style.display;

const hhId = document.getElementById("hhId");
const hhIdDisplay = hhId.style.display;

const scId = document.getElementById("scId");
const scIdDisplay = scId.style.display;

const spId = document.getElementById("spId");
const spIdDisplay = spId.style.display;

const sdId = document.getElementById("sdId");
const sdIdDisplay = sdId.style.display;

const rebootId = document.getElementById("rebootId");
const rebootIdDisplay = rebootId.style.display;

const convertContainer = document.getElementById("convertContainer");
const convertContainerDisplay = convertContainer.style.display;

const convertToOlderId = document.getElementById("convertToOlderId");
const convertToOlderIdDisplay = convertToOlderId.style.display;

const calibateId = document.getElementById("calibateId");
const calibateIdDisplay = calibateId.style.display;

const ynContainer = document.getElementById("ynContainer");
const ynContainerDisplay = ynContainer.style.display;

const yId = document.getElementById("yId");
const yIdDisplay = yId.style.display;

const nId = document.getElementById("nId");
const nIdDisplay = nId.style.display;

const olderSymsModelContainer = document.getElementById("olderSymsModelContainer");
const olderSymsModelContainerDisplay = olderSymsModelContainer.style.display;

const zsSymId = document.getElementById("zsSymId");
const zsSymIdDisplay = zsSymId.style.display;

const zmSymId = document.getElementById("zmSymId");
const zmSymIdDisplay = zmSymId.style.display;

const zrSymId = document.getElementById("zrSymId");
const zrSymIdDisplay = zrSymId.style.display;

const sym23qsId = document.getElementById("sym23qsId");
const sym23qsIdDisplay = sym23qsId.style.display;

const sym23qrId = document.getElementById("sym23qrId");
const sym23qrIdDisplay = sym23qrId.style.display;

const uSymId = document.getElementById("uSymId");
const uSymIdDisplay = uSymId.style.display;

const calibrationSection = document.getElementById("calibrationSection");
const calibrationSectionDisplay = calibrationSection.style.display;

const calibrationContainer = document.getElementById("calibrationContainer");
const calibrationContainerDisplay = calibrationContainer.style.display;

const heigthNumberId = document.getElementById("heigthNumberId");
const heigthNumberIdDisplay = heigthNumberId.style.display;

const heigthRangeId = document.getElementById("heigthRangeId");
const heigthRangeIdDisplay = heigthRangeId.style.display;

const emptyNumberId = document.getElementById("emptyNumberId");
const emptyNumberIdDisplay = emptyNumberId.style.display;

const emptyRangeId = document.getElementById("emptyRangeId");
const emptyRangeIdDisplay = emptyRangeId.style.display;

const waterRadioId = document.getElementById("waterRadioId");
const waterRadioIdDisplay = waterRadioId.style.display;

const waterRadioLabel = document.getElementById("waterRadioLabel");
const waterRadioLabelDisplay = waterRadioLabel.style.display;

const fuelRadioId = document.getElementById("fuelRadioId");
const fuelRadioIdDisplay = fuelRadioId.style.display;

const fuelRadioLabel = document.getElementById("fuelRadioLabel");
const fuelRadioLabelDisplay = fuelRadioLabel.style.display;

const submitCalibrationId = document.getElementById("submitCalibrationId");
const submitCalibrationIdDisplay = submitCalibrationId.style.display;

const footerSection = document.getElementById("footerSection");
const footerSectionDisplay = footerSection.style.display;

const deviceInfo = document.getElementById("deviceInfo");
const deviceInfoDisplay = deviceInfo.style.display;

window.onload = function(){
    console.log(navigator.platform);
    console.log(navigator.appVersion);
    console.log(window.navigator.userAgent);
    console.log(navigator.userAgentData.brands);
    const br = navigator.userAgentData.brands;
    let platformInfo = navigator.platform + "<br/>";
    for(let i = 0; i < br.length; i++){
        if((br[i].brand).includes("Not")){ continue; }
        console.log(br[i].brand + ": " + br[i].version);
        platformInfo += br[i].brand + ": " + br[i].version + "<br/>"
    }
    platformInfo += "<br/>" + navigator.appVersion;
    deviceInfo.innerHTML = platformInfo;
}

async function connectSym(){ 
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        const decoder = new TextDecoderStream();
        port.readable.pipeTo(decoder.writable);
        const inputStream = decoder.readable;
        reader = inputStream.getReader();
        writer = port.writable.getWriter();
        console.log(port);
        readFromSym();
    } catch (error) { 
        console.log(error);
    }
    let conn = await port.connected;
    console.log(port);
    console.log(conn);
    if(conn){
        textAreaId.innerHTML += "SYM Paired..." + '\n';
    }else{
        textAreaId.innerHTML += "Opss... Try againg..." + '\n';
    }
}

async function writeToSym(string){
    try{
        await writer.write(sendMessages(string));
    }catch(error){
        console.log(error); 
    }
}

async function readFromSym(){
    try{
        while (true) {
            const { value, done } = await reader.read();
            if (value) {
                console.log(value + '\n');
                textAreaId.innerHTML += value + '\n';
                textAreaId.scrollTop = textAreaId.scrollHeight;
            }
            if (done) {
                reader.releaseLock();
                break;
            }
        }
    }catch (error) {
        console.log(error);
    }
}

async function hh() {
    try{
        await writeToSym('hh');
        textAreaId.innerHTML += '-->> hh' + '\n';
    }catch(error){
        console.log(error);
    }
    // showAllButtons();
}

async function sc(){
    try{
        await writeToSym('<SC>');
        textAreaId.innerHTML += '-->> <SC>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function sp(){
    try{
        await writeToSym('<SP>');
        textAreaId.innerHTML += '-->> <SP>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function sd(){
    try{
        await writeToSym('<SD>');
        textAreaId.innerHTML += '-->> <SD>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function y(){
    try{
        await writeToSym('Y');
        textAreaId.innerHTML += '-->> Y' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function n(){
    try{
        await writeToSym('N');
        textAreaId.innerHTML += '-->> N' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function zsSym(){
    try{
        await writeToSym('<ZS>');
        textAreaId.innerHTML += '-->> <ZS>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function zmSym(){
    try{
        await writeToSym('<ZM>');
        textAreaId.innerHTML += '-->> <ZM>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function zrSym(){
    try{
        await writeToSym('<ZR>');
        textAreaId.innerHTML += '-->> <ZR>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function sym23qs(){
    try{
        await writeToSym('<23QS>');
        textAreaId.innerHTML += '-->> <23QS>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function sym23qr(){
    try{
        await writeToSym('<23QR>');
        textAreaId.innerHTML += '-->> <23QR>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function uSym(){
    try{
        await writeToSym('<ZU>');
        textAreaId.innerHTML += '-->> <ZU>' + '\n';
    }catch(error){
        console.log(error);
    }
}

async function reboot(){
    try{
        await writeToSym('<SR>');
        textAreaId.innerHTML += '-->> <SR>' + '\n';
        hhId.disabled = true;
        hhId.classList.add("disable");
        textAreaId.value = '';
        showMainButtons();
        hideAllButtons();
    }catch(error){
        console.log(error);
    }
}

function sendMessages(string){
    try{
        const encoder = new TextEncoder();
        const encoded = encoder.encode(string);
        return new Int8Array(encoded)
    }catch(error){
        console.log(error);
    }
}

async function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ------------------>>>>>>>
// ------------------>>>>>>>
// ------------------>>>>>>>

async function symBluetooth(){
    document.getElementById("displayInfo").innerHTML = "";
    const symName = ' SYMU';
    const options = {
        filters: [
                {namePrefix: symName,},
                {services: ['00001800-0000-1000-8000-00805f9b34fb']},
                {services: ['0000180a-0000-1000-8000-00805f9b34fb']},
                {services: ['01234567-89ab-cdef-0123-456789abcdef']},
                {services: ['49535343-fe7d-4ae5-8fa9-9fafd205e455']}]};
    try{
        device = await navigator.bluetooth.requestDevice(options);
        console.log(device);
        connect(device);
    }catch(error){
        console.log(error);
    }
}

async function connect(device){
    server = await device.gatt.connect();
    displaySymName(device);
    if(server.connected){
        console.log("Is Connected");
        hideMainButtons();
        disconnectBluetoothId.style.display = disconnectBluetoothDisplay;
    }
    const service = await server.getPrimaryService('49535343-fe7d-4ae5-8fa9-9fafd205e455');
    getBluetoothService(service);
}

async function getBluetoothService(service){
    let str = "hh";
    const hh = new TextEncoder();
    const hhDecoder = new TextDecoder();
    const array = new Int16Array(hh.encode(str));
    const characteristic = await service.getCharacteristic('49535343-1e4d-4bd9-ba61-23c647249616');
    await characteristic.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    const descriptor = await characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
    console.log(await characteristic.readValue(new DataView(new ArrayBuffer(new Int8Array()))));
    console.log(await descriptor.readValue(new DataView(new ArrayBuffer(new Int8Array()))));
    console.log("Done");
}

function displaySymName(name){
    document.getElementById("displayInfo").innerHTML += "Name: " + name.name + '<br/>';
    document.getElementById("displayInfo").innerHTML += "ID: " + name.id + '<br/>'; 
    document.getElementById("displayInfo").innerHTML += "Server Connected: " + name.gatt + '<br/>';
}

function disconnectBluetooth(){
    device.gatt.disconnect();
    showMainButtons();
    disconnectBluetoothId.style.display = "none";
    document.getElementById("displayInfo").innerHTML = "";
    console.log(server); 
}

function testDisplay(){
    showAllButtons();
    hhId.disabled = false;
    hhId.classList.remove("disable");
    calibateId.disabled = false;
    calibateId.classList.remove("disable");
    tankHeigthId.disabled = false;
    tankHeigthId.classList.remove("disable");
    emptyPointId.disabled = false;
    emptyPointId.classList.remove("disable");
    waterId.disabled = false;
    waterId.classList.remove("disable");
    fuelId.disabled = false;
    fuelId.classList.remove("disable");
    submitId.disabled = false;
    submitId.classList.remove("disable");
    textAreaId.innerHTML =
`Connected...
-->> hh
HELLO
SYM U
Serial# 103780

Please choose an inquire:
For SYM info: . . . . . <sc>
To purge SYM: . . . . <sp>
Put SYM on HOLD:  <sh>
For SYM readings: . <sd>
To calibrate: . . . . . . <C,>
To Replace old SYM:
<ZS>  <ZM>  <ZR>
<23QS>  <23QR> 
SYM U Ori
ginal  <ZU>
To finish . . . . . . . . . <SR>

-->> <sc>
SYM ZS
P range:  (0 - 32) in H2O)
V output: (0.50 - 4.10) VDC)
Firmware Version: 2.01
Production Date: 05/08/2024 

DONE 

More inquires ? 

Send 'Y' or 'N'

-->> y
Please choose an inquire:
For SYM info: . . . .
. <sc>
To purge SYM: . . . . <sp>
Put SYM on HOLD:  <sh>
For SYM readings: . <sd>
To calibrate: . . . . . . <C,>
To Replace old SYM:
<ZS>  <ZM>  <ZR>
<23QS>  <23QR> 
SYM U Original  <ZU>
To finish . . . . . . . . . <SR>

-->> <sc>
000,9 Inches of Water
Voltage Ou
tput = 0.4 VDC

000,9 Inches of Water
Voltage Output = 0.4 VDC

000,9 Inches of Water
Voltage Output = 0.4 VDC

More Data ? 

Sen
d 'Y' or 'N' 


-->> n

DONE 

More inquires ? 

Send 'Y' or 'N'

-->> y
Please choose an inquire:
For SYM info: . . . . . <sc>
To purge SYM: . . . . <sp>
Put SYM on HOLD:  <sh>
For SYM readings: . <sd>
To calibrate: . . . . . . <C,>
To Replace old SYM:
<ZS>  <ZM>  <
ZR>
<23QS>  <23QR> 
SYM U Original  <ZU>
To finish . . . . 
. . . . . <SR>

-->> <sp>
PUMP RUNS/n FOR 5 seconds


DONE 

More inquires ? 

Send 'Y' or 'N'

-->> y
Please choose an inquire:
For SYM info: . . . . . <sc>
To purge SYM: . . . . <sp>
Put SYM on HOLD:  <sh>
For S
YM readings: . <sd>
To calibrate: . . . . . . <C,>
To Replace old SYM:
<ZS>  <ZM>  <ZR>
<23QS>  <23QR> 
SYM U Original  <ZU>
To finish . . . . . . . . . <SR>

-->> <zs>

DONE 

More inquires ? 

Send 'Y' or 'N'

-->> y
Please choose an inquire:
For SYM info: . . . . . <
sc>
To purge SYM: . . . . <sp>
Put SYM on HOLD:  <sh>
For SYM readings: . <sd>
To calibrate: . . . . . . <C,>
To Replace old SYM:
<ZS>  <ZM>  <ZR>
<23QS>  <23QR> 
SYM U Original  <ZU>
To finish . . . . . . . . . <SR>

-->> <sr>

DONE 

More inquires ? 

Send 'Y' 
or 'N'

DONE... 

REBOOTING... 
Do not remove Power 
from the SYM 

`;
    textAreaId.scrollTop = textAreaId.scrollHeight;
}

// ------------------>>>>>>>
// ------------------>>>>>>>
// ------------------>>>>>>>

async function seeEverything(){
    try{
        const allDevices = await navigator.bluetooth.requestDevice({acceptAllDevices: true});
    }catch(error){
        console.log(error);
    }
}

// navigator.serial.addEventListener("connect", (e) => {
//     // showButtons();
// });
// navigator.serial.addEventListener("disconnect", (e) => {
//     // hideButtons();
//     // document.getElementById("purgeAndDisconnect").innerHTML = "";
// });


// async function submitCalibration() {
//     let tankHeigth = tHeigth.value;
//     let emptyPoint = ePoint.value;
//     let waterFuel = water.checked ? water.value : fuel.value;
//     let text = '<' + tankHeigth + ',' + emptyPoint + ',' + waterFuel + '>';
//     console.log(text);
//     await writeToSym('<C,>');
//     await delay(1000);
//     await writeToSym(text);
//     await delay(1000);
//     await writeToSym('y');
// }

// function readHello(){
//     try{
//         serialMatch = symResponce.match(/[0-9]{6}/g );
//         screenMessage = "SYM U - Serial# " + serialMatch + "<br/>";
//         symResponce = "";
//     }catch(error){
//         console.log(error);
//     }
// }

// function readSymInfo(){
//     try{
//         dateMatch = symResponce.match(/\d{2}\/\d{2}\/\d{4}/g);
//         decimalMatch = symResponce.match(/\d{1}\.\d{2}/g);
//         levelRageMatch = symResponce.match(/0 -\ [0-9]{2,3}/g);
//         currentSettingsMatch = symResponce.slice(0, ((symResponce.search(/[0-9]/))-2));
//         screenMessage += "Firmware Version: " + decimalMatch[2] + "<br/>" + "Production Date: " + dateMatch + "<br/>" + currentSettingsMatch + " " + levelRageMatch + "<br/>" + "Output Voltage Range: " + decimalMatch[0] + " - " + decimalMatch[1] + "<br/>";
//         // document.getElementById("displayInfo").innerHTML = screenMessage;
//         symResponce = "";
//     }catch(error){
//         console.log(error);
//     }
// }

// function readSymReadings(){
//     try{
//         currentLevel = symResponce.slice(0, (symResponce.search(/vdc/i)));
//         screenMessage += "Current Level: <br/>" + currentLevel;
//         symResponce = "";
//     }catch(error){
//         console.log(error);
//     }
// }


// async function symData(){
//     try{
//         await writeToSym('<si>');
//         await delay(2000);
//         await writeToSym('n');
//         await delay(2000);
//         await writeToSym('y');
//     }catch(error){ console.log(error); }
// }