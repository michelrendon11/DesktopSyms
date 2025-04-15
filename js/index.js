

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

const style3D = document.getElementById("style3D");
const styleFlat = document.getElementById("styleFlat");
const nightStyle = document.getElementById("nightStyle");

let simulation = false;
const simulatePage = document.getElementById("simulatePage");
const simulatingTitle = document.getElementById("simulatingTitle");
const simulatingTitleDisplay = simulatingTitle.style.display;

function flatSyleSheet(){
    style3D.disabled = true;
    styleFlat.disabled = false;
    nightStyle.disabled = true;
}

function style3DSheet(){
    style3D.disabled = false;
    styleFlat.disabled = true;
    nightStyle.disabled = true;
}

function nightSheet(){
    style3D.disabled = true;
    styleFlat.disabled = true;
    nightStyle.disabled = false;
}

function simulate(){
    if(!simulation){
        initializeConnection();
        findButtonsContainer.style.display = "none";
        textAreaId.innerHTML += "SYM Paired..." + '\n';
        simulatePage.innerHTML = 'Stop Simulation';
        simulatePage.style.color = "#f99090";
        simulatePage.style.fontWeight = "bold";
        simulatingTitle.style.display = simulatingTitleDisplay;

    }
    if(simulation){
        initialize();
        simulatePage.innerHTML = 'Simulate';
        simulatePage.style.color = "#ffffff";
    }
    return simulation = !simulation;
}

window.onload = function(){
    initialize();
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

function showSearchButtons(){
    findButtonsContainer.style.display = findButtonsContainerDisplay;
}

function initialize(){
    textAreaContainer.style.display = "none";
    mainButtonsContainer.style.display = "none";
    convertContainer.style.display = "none";
    ynContainer.style.display = "none";
    olderSymsModelContainer.style.display = "none";
    calibrationSection.style.display = "none";
    simulatingTitle.style.display = "none";
    findButtonsContainer.style.display = findButtonsContainerDisplay;
    textAreaId.innerHTML = '';
    scId.disabled = true;
    scId.classList.add("disable");
    spId.disabled = true;
    spId.classList.add("disable");
    sdId.disabled = true;
    sdId.classList.add("disable");
    rebootId.disabled = true;
    rebootId.classList.add("disable");
    convertToOlderId.disabled = true;
    convertToOlderId.classList.add("disable");
    calibateId.disabled = true;
    calibateId.classList.add("disable");
    yId.disabled = true;
    yId.classList.add("disable");
    nId.disabled = true;
    nId.classList.add("disable");
}

function initializeConnection(){
    textAreaContainer.style.display = textAreaContainerDisplay;
    mainButtonsContainer.style.display = mainButtonsContainerDisplay;
    convertContainer.style.display = convertContainerDisplay;
    ynContainer.style.display = ynContainerDisplay;
    hhId.disabled = false;
    hhId.classList.remove("disable");
}

function enableButtons(){
    findButtonsContainer.style.display = "none";
    scId.disabled = false;
    scId.classList.remove("disable");
    spId.disabled = false;
    spId.classList.remove("disable");
    sdId.disabled = false;
    sdId.classList.remove("disable");
    rebootId.disabled = false;
    rebootId.classList.remove("disable");
    convertToOlderId.disabled = false;
    convertToOlderId.classList.remove("disable");
    calibateId.disabled = false;
    calibateId.classList.remove("disable");
    yId.disabled = false;
    yId.classList.remove("disable");
    nId.disabled = false;
    nId.classList.remove("disable");
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
        initializeConnection();
    } catch (error) { 
        console.log(error);
    }
    let conn = await port.connected;
    console.log(port);
    console.log(conn);
    if(await conn){
        textAreaId.innerHTML += "SYM Paired..." + '\n';
    }else{
        textAreaId.innerHTML += "Opss... Try againg..." + '\n';
    }
}

async function writeToSym(string){
    textAreaId.innerHTML += '\n\n---- ' + string + ' ----' + '\n';
    textAreaId.scrollTop = textAreaId.scrollHeight;
    if(!simulation){
        try{
            await writer.write(sendMessages(string));
        }catch(error){
            console.log(error); 
        }
    }else{
        textAreaId.innerHTML += respondToSimulation(string);
        textAreaId.scrollTop = textAreaId.scrollHeight;
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

async function readFromSym(){
    try{
        while (true) {
            const { value, done } = await reader.read();
            if (value) {
                console.log(value + '\n');
                textAreaId.innerHTML += value + '\n';
                textAreaId.scrollTop = textAreaId.scrollHeight;
            }
            if(value.includes('REBOOTING')){
                delay(4000);
                initialize();
                break;
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

function hh() { 
    writeToSym('hh'); 
    enableButtons();
}
function sc(){ 
    writeToSym('<SC>'); 
}
function sp(){ 
    writeToSym('<SP>'); 
}
function sd(){ 
    writeToSym('<SD>'); 
}
function y(){ 
    writeToSym('Y'); 
}
function n(){
     writeToSym('N'); 
}
function zsSym(){ 
    writeToSym('<ZS>'); 
    convertedSym();
}
function zmSym(){ 
    writeToSym('<ZM>'); 
    convertedSym();
}
function zrSym(){ 
    writeToSym('<ZR>'); 
    convertedSym();
}
function sym23qs(){ 
    writeToSym('<23QS>'); 
    convertedSym();
}
function sym23qr(){ 
    writeToSym('<23QR>'); 
    convertedSym();
}
function uSym(){ 
    writeToSym('<ZU>'); 
    convertedSym();
}
function reboot(){ 
    writeToSym('<SR>'); 
    // initialize();
}

function convertSym(){
    mainButtonsContainer.style.display = "none";
    ynContainer.style.display = "none";
    convertContainer.style.display = "none";
    olderSymsModelContainer.style.display = olderSymsModelContainerDisplay;
}

function convertedSym(){
    mainButtonsContainer.style.display = mainButtonsContainerDisplay;
    ynContainer.style.display = ynContainerDisplay;
    convertContainer.style.display = convertContainerDisplay;
    olderSymsModelContainer.style.display = "none";
}

function calibrationSelectionSection(){
    calibrationSection.style.display = calibrationSectionDisplay;
    mainButtonsContainer.style.display = "none";
    ynContainer.style.display = "none";
    convertContainer.style.display = "none";
    writeToSym('<C,>');
}

function calibratedSym(){
    calibrationSection.style.display = "none";
    mainButtonsContainer.style.display = mainButtonsContainerDisplay;
    ynContainer.style.display = ynContainerDisplay;
    convertContainer.style.display = convertContainerDisplay;
}

function submitCalibration(){
    const heigh = heigthNumberId.value;
    const empty = emptyNumberId.value;
    const liquidType = waterRadioId.checked ? 'W' : 'D';
    writeToSym('<' + heigh + ',' + empty + ',' + liquidType + '>');
    calibratedSym();
}

async function delay(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }

function respondToSimulation(string){
    let responce = "";
    switch(string){
        case 'hh': responce = `
Connected...

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
To finish . . . . . . . . . <SR>`;
        break;
        case '<SC>': responce = `

SYM ZS
P range:  (0 - 32) in H2O)
V output: (0.50 - 4.10) VDC)
Firmware Version: 2.01
Production Date: 05/08/2024 

DONE 

More inquires ? 

Send 'Y' or 'N'`;
        break;
        case '<SD>': responce = `
000,9 Inches of Water
Voltage Ou
tput = 0.4 VDC

000,9 Inches of Water
Voltage Output = 0.4 VDC

000,9 Inches of Water
Voltage Output = 0.4 VDC

More Data ? 

Send 'Y' or 'N' `;
        break;
        case 'Y': responce = `
Please choose an inquire:
For SYM info: . . . . . <sc>
To purge SYM: . . . . <sp>
Put SYM on HOLD:  <sh>
For SYM readings: . <sd>
To calibrate: . . . . . . <C,>
To Replace old SYM:
<ZS>  <ZM>  <ZR>
<23QS>  <23QR> 
SYM U Original  <ZU>
To finish . . . . . . . . . <SR>`;
        break;
        case "<SP>": responce = `

"PUMP RUNS/n FOR 5 seconds" 

DONE 

More inquires ? 

Send 'Y' or 'N'`;
        break;
        case "<SR>": responce = `

DONE... 

REBOOTING... 
Do not remove Power 
from the SYM `;
        break;
        case "N": responce = `
DONE 

More inquires ? 

Send 'Y' or 'N'`;
        break;
        default: responce = '';
    }
    return responce;
}

function testDisplay(){
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

