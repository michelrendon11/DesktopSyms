

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

const shId = document.getElementById("shId");
const shIdDisplay = shId.style.display;

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

const heigthRangeId = document.getElementById("heigthRangeId");
const heigthRangeIdDisplay = heigthRangeId.style.display;

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
const styleDay = document.getElementById("styleDay");
const styleNight = document.getElementById("styleNight");

let simulation = false;
const simulatePage = document.getElementById("simulatePage");
const simulatingTitle = document.getElementById("simulatingTitle");
const simulatingTitleDisplay = simulatingTitle.style.display;

let data = false;

function daySheet(){
    style3D.disabled = true;
    styleDay.disabled = false;
    styleNight.disabled = true;
}

function style3DSheet(){
    style3D.disabled = false;
    styleDay.disabled = true;
    styleNight.disabled = true;
}

function nightSheet(){
    style3D.disabled = true;
    styleDay.disabled = true;
    styleNight.disabled = false;
}

function noneSheet(){
    style3D.disabled = true;
    styleDay.disabled = true;
    styleNight.disabled = true;
}

function simulate(){
    if(!simulation){
        initializeConnection();
        findButtonsContainer.style.display = "none";
        textAreaId.innerHTML += "SYM Paired..." + '\n';
        simulatePage.innerHTML = 'Stop Simulation';
        simulatePage.style.fontWeight = "bold";
        simulatePage.style.color = "#f99090";
        simulatingTitle.style.display = simulatingTitleDisplay;
    }
    if(simulation){
        initialize();
        simulatePage.innerHTML = 'Simulate';
        simulatePage.style.color = "white";
    }
    return simulation = !simulation;
}

function simulationInProgress(string){
    if(string.includes('<SD>')){
        data = true;
        textAreaId.innerHTML += respondToSimulation('<SD>');
        textAreaId.scrollTop = textAreaId.scrollHeight;
    }if(data){
        mainButtonsContainer.style.display = "none";
        convertContainer.style.display = "none";
        ynContainer.style.display = ynContainerDisplay;
        if(string == 'Y'){
            textAreaId.innerHTML += respondToSimulation('<SD>');
            textAreaId.scrollTop = textAreaId.scrollHeight;
        }
        if(string == 'N'){
            data = false;
            textAreaId.innerHTML += respondToSimulation('N');
            textAreaId.scrollTop = textAreaId.scrollHeight;
        }
    }else{
        textAreaId.innerHTML += respondToSimulation(string);
        textAreaId.scrollTop = textAreaId.scrollHeight;
        if(string.includes('<SC>') || string.includes('<SP>')){
            mainButtonsContainer.style.display = "none";
            convertContainer.style.display = "none";
            ynContainer.style.display = ynContainerDisplay;
        }else if(string == 'Y'){
            mainButtonsContainer.style.display = mainButtonsContainerDisplay;
            convertContainer.style.display = convertContainerDisplay;
            ynContainer.style.display = "none";
        }else if(string == 'N'){
            mainButtonsContainer.style.display = mainButtonsContainerDisplay;
            convertContainer.style.display = convertContainerDisplay;
            ynContainer.style.display = "none";
            textAreaId.innerHTML += respondToSimulation('<SR>');
            textAreaId.scrollTop = textAreaId.scrollHeight;
        }
    }
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
    shId.disabled = true;
    shId.classList.add("disable");
    rebootId.disabled = true;
    rebootId.classList.add("disable");
    convertToOlderId.disabled = true;
    convertToOlderId.classList.add("disable");
    calibateId.disabled = true;
    calibateId.classList.add("disable");
}

function initializeConnection(){
    textAreaContainer.style.display = textAreaContainerDisplay;
    mainButtonsContainer.style.display = mainButtonsContainerDisplay;
    convertContainer.style.display = convertContainerDisplay;
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
    shId.disabled = false;
    shId.classList.remove("disable");
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
        simulationInProgress(string);
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
function sh(){ 
    writeToSym('<SH>'); 
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
    const heigh = heigthRangeId.value;
    const empty = emptyRangeId.value;
    const liquidType = waterRadioId.checked ? 'W' : 'D';
    writeToSym('<' + heigh + ',' + empty + ',' + liquidType + '>');
    calibratedSym();
}

async function delay(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }

function respondToSimulation(string){
    let responce = "";
    switch(string.toUpperCase()){
        case 'HH': responce = `
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
SYM U Original  <ZU>
To finish . . . . . . . . . <SR>`;
        break;

        case '<SC>': responce = `
SYM ZS
P range:  (0 - 32) in H2O)
V output: (0.50 - 4.10) VDC)
Firmware Version: 3.10
Production Date: 06/01/2025 

DONE 

More inquires ? 

Send 'Y' or 'N'`;
        break;

        case "<SP>": responce = `
"PUMP RUNS/n FOR 5 seconds" 

DONE 

More inquires ? 

Send 'Y' or 'N'`;
        break;

        case '<SH>': responce = `
SYM ON HOLD
for 10 minutes

Send D to Exit HOLD 
If you want to exit
before the 10 minutes
expired`;
        break;

        case '<SD>': responce = `
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
001,0 In
ches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC point
er = 132
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
001,0 Inches of Water
Voltage Output = 0.7
 VDC

 
ADC pointer = 132
001,0 Inches of Water
Voltage Output = 0.7 VDC

 
ADC pointer = 132
More Data ? 

Send 'Y' or 'N'`;
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

        case "N": responce = `
DONE 

More inquires ? 

Send 'Y' or 'N'`;
        break;

        case '<SR>': responce = `

DONE... 

REBOOTING... 
Do not remove Power 
from the SYM `;
        break;

        default: responce = '';
    }
    return responce;
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

