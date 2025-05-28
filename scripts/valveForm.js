const valvePopupWrapper = document.querySelector('.valve-popup-wrapper');
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

    let numSections = pvgAssem.numSections;

    for(i = 0; i < numSections; i++){

        const descriptionHtml = `<input type="text" id="description${i}" placeholder="Description">`;

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
                                <option value="DA-motor">DA - Motor</option>
                                <option value="SA-motor">SA - Motor</option>
                                <option value="DA-cylinder">DA - Cylinder</option>
                                <option value="SA-cylinder">SA - Cylinder</option>
                            </select>`;

        const gpmHtml = `<input type="number" id="gpm${i}" name="gpm" placeholder="gpm">`;

        const portRelAHtml = `<input type="number" id="portRelA${i}" name="portRelA" placeholder="Port Relief A">`;

        const portRelBHtml = `<input type="number" id="portRelB${i}" name="portRelB" placeholder="Port Relief B">`;

        const html = `<div id="station${i}">Station ${i + 1}: 
                    ${descriptionHtml}
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

function updatePvgAssemSections(){

    for(i = 0; i < pvgAssem.numSections; i++){
        const descriptionID = `description${i}`;
        const pvgSeriesID = `pvgSeries${i}`;
        const actuationMethodID = `actuationMethod${i}`;
        const spoolTypeID = `spoolType${i}`
        const gpmID = `gpm${i}`;
        const portRelAID = `portRelA${i}`;
        const portRelBID = `portRelB${i}`;

        const description = document.getElementById(descriptionID);
        const pvgSeries = document.getElementById(pvgSeriesID);
        const actuation = document.getElementById(actuationMethodID);
        const spoolType = document.getElementById(spoolTypeID);
        const gpm = document.getElementById(gpmID);
        const portRelA = document.getElementById(portRelAID);
        const portRelB = document.getElementById(portRelBID);

        pvgAssem.updateSection(i, 
            description.value, 
            pvgSeries.value, 
            actuation.value, 
            spoolType.value, 
            gpm.value, 
            portRelA.value, 
            portRelB.value)
    };
};

valvePopupForm.addEventListener('submit', e => {
    e.preventDefault();

    updatePvgAssemSections();

    buildPvgAssemDisplay();
    displayPartNumDiv();

    valvePopupWrapper.style.display = 'none';
});





