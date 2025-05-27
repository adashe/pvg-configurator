const valvePortSizeDiv = document.querySelector('#valve-port-size-div');
const valveSolVoltDiv = document.querySelector('#valve-sol-volt-div');
const solenoidVoltage = document.querySelector('#SolenoidVoltage');

const valvePopupWrapper = document.querySelector('.valve-popup-wrapper');
/* const valvePopupCloseButtonX = document.querySelector('.valve-popup-close-x'); */
const valvePopupContent = document.querySelector('.valve-popup-content');
const valvePopupForm = document.querySelector('#valve-popup-form');

const pvgSelectionsContent = document.querySelector('.pvg-selections-content');


// Display popup to edit valves, flow controls, and check valves
const displayValvePopup = () => {

    generatePvgSelections();

    valvePopupWrapper.style.display = 'block';
    valvePopupWrapper.scrollTop = 0;
};


// Initiate null values for valve inputs
let valveInputs = {
    numStat: null,
    portSize: null,
    solVolt: null,
};

// Reset valve inputs
const resetValveInputs = () => {
    valveInputs = {
        numStat: null,
        portSize: null,
        solVolt: null,
    };
};


// Generate pvg selection for each section
function generatePvgSelections(){

    pvgSelectionsContent.innerHTML = '';

    let numSections = 12;


    for(i = 0; i < numSections; i++){

        const functionHtml = `<input type="text" id="function${i}" placeholder="Function">`;

        const seriesHtml = `<select name="pvgSeries" id="pvgSeries${i}">
                                <option value="" disabled selected hidden>Select series...</option>
                                <option value="32">32</option>
                                <option value="48">48</option>
                            </select>`;

        const acutationHtml = `<select name="actuationMethod" id="actuationMethod${i}">
                                    <option value="" disabled selected hidden>Select actuation method...</option>
                                    <option value="electrical">Electrical (PVHC)</option>
                                    <option value="mechanical">Mechanical</option>
                                </select>`;

        const spoolHtml = `<select name="spoolType" id="spoolType${i}">
                                <option value="" disabled selected hidden>Select spool type...</option>
                                <option value="DAmotor">DA - Motor</option>
                                <option value="SAmotor">SA - Motor</option>
                                <option value="DAcylinder">DA - Cylinder</option>
                                <option value="SAcylinder">SA - Cylinder</option>
                            </select>`;

        const gpmHtml = `<input type="number" id="gpm${i}" name="gpm" placeholder="gpm">`;

        const portRelAHtml = `<input type="number" id="portRelA${i}" name="portRelA" placeholder="Port Relief A">`;

        const portRelBHtml = `<input type="number" id="portRelB${i}" name="portRelB" placeholder="Port Relief B">`;

        const html = `<div id="station${i}">Station ${i + 1}: 
                    ${functionHtml}
                    ${seriesHtml}
                    ${acutationHtml}
                    ${spoolHtml}
                    ${gpmHtml}
                    ${portRelAHtml}
                    ${portRelBHtml}
                </div>`;

        pvgSelectionsContent.innerHTML += html;
    };
};


valvePopupForm.addEventListener('submit', e => {
    e.preventDefault();

    /* updateValvesAndHPU(); */

    updateHpuDiv();

    valvePopupWrapper.style.display = 'none';
});

// Build valve assembly object from valve form inputs 
async function addValveInputsToValveAssembly(){

    let counter = []

    for(i = 0; i < valveInputs.numStat; i++){
        counter.push(i);
    };

    let promises = [];

    // create a stations object for each submitted set of values
    for await (i of counter){
        let stationName = `station${i}`;
        let valveID = `valve${i}`;
        let flowControlID = `flowControl${i}`;
        let checkValveID = `checkValve${i}`;

        let valve = document.getElementById(valveID);
        let flowControl = document.getElementById(flowControlID);
        let checkValve = document.getElementById(checkValveID);

        // Assign value of 0 to null (disabled) flow control and check valve options
        let flowControlValue = flowControl.value;
        
        if(!flowControl.value){
            flowControlValue = 0
        };

        let checkValveValue = checkValve.value;
        if(!checkValve.value){
            checkValveValue = 0
        };

        let promise = valveAssem.updateStation(stationName, valve.value, flowControlValue, checkValveValue);
    
        promises.push(promise);
    };

    await Promise.all(promises);

    // Update voltage attribute based on the solenoid voltage selection
    valveAssem.voltage = valveInputs.solVolt;

    // Update number of L valves (for hpu calc)
    valveAssem.countLValves();

    // Update number of flow controls (for hpu calc)
    valveAssem.countFlowControl();
};

// Update valve and HPU number display when edits are made from the display page, including updating the heat exchanger if necessary
async function updateValvesAndHPU(){

    await addValveInputsToValveAssembly();

    if(partNumDiv.style.display == 'block'){
        await updateHpuDiv();
    };
};


