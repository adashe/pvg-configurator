const valvePopupWrapper = document.querySelector(".valve-popup-wrapper");
const valvePopupContent = document.querySelector(".valve-popup-content");
const valvePopupForm = document.querySelector("#valve-popup-form");

const pvgSelectionsContent = document.querySelector(".pvg-selections-content");

// Display popup to edit valves, flow controls, and check valves
const displayValvePopup = () => {
    generatePvgSelections();

    valvePopupWrapper.style.display = "block";
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
function generatePvgSelections() {
    const headerHtml = `<div id="popupColumnHeaders">
                            <div id="placeholder"></div>
                            <div>Description</div>
                            <div>Actuation</div>
                            <div>GPM</div>
                            <div>Spool</div>
                            <div>Port A Type</div>
                            <div>Port B Type</div>
                            <div>LS Relief A</div>
                            <div>LS Relief B</div>
                        </div>`;

    pvgSelectionsContent.innerHTML = `${headerHtml}`;

    let numSections = pvgAssem.numSections;

    for (i = 0; i < numSections; i++) {
        const descriptionHtml = `<input type="text" id="description${i}" placeholder="..." required>`;

        const acutationHtml = `<select name="actuationMethod" id="actuationMethod${i}" required>
                                    <option value="" disabled selected hidden>...</option>
                                    <option value="12V">Electrical (PVHC) 12V</option>
                                    <option value="mechanical">Mechanical</option>
                                </select>`;

        // const gpmHtml = `<input type="number" id="gpm${i}" name="gpm" placeholder="gpm">`;

        const gpmHtml = `<select name="gpm" id="gpm${i}" required>
                            <option value="" disabled selected hidden>...</option>
                            <option value="2.6">2.6 gpm</option> 
                            <option value="6.6">6.6 gpm</option>
                            <option value="10.6">10.6 gpm</option>
                            <option value="17.2">17.2 gpm</option>
                            <option value="26.4">26.4 gpm</option>
                            <option value="34.3">34.3 gpm</option>
                        </select>`;

        const spoolHtml = `<select name="spoolType" id="spoolType${i}" required>
                                <option value="" disabled selected hidden>...</option>
                                <option value="DM">DA - Motor</option>
                                <option value="SM">SA - Motor</option>
                                <option value="DC">DA - Cylinder</option>
                                <option value="SC">SA - Cylinder</option>
                            </select>`;

        const portAHtml = `<select name="portA" id="portA${i}">
                                <option value="" disabled selected hidden>...</option>
                                <option value="anti-cav">Anti-Cav Facility</option>
                                <option value="plug">Plug</option>
                                <option value="464">464 PSI, +290/-0 PSI</option>
                                <option value="725">725 PSI, +290/-0 PSI</option>
                                <option value="913">913 PSI, +290/-0 PSI</option>
                                <option value="1160">1160 PSI, +290/-0 PSI</option>
                                <option value="1450">1450 PSI, +334/-0 PSI</option>
                                <option value="1813">1813 PSI, +334/-0 PSI</option>
                                <option value="2031">2031 PSI, +334/-0 PSI</option>
                                <option value="2176">2176 PSI, +334/-0 PSI</option>
                                <option value="2321">2321 PSI, +334/-0 PSI</option>
                                <option value="2538">2538 PSI, +334/-0 PSI</option>
                                <option value="2756">2756 PSI, +334/-0 PSI</option>
                                <option value="3045">3045 PSI, +334/-0 PSI</option>
                                <option value="3335">3335 PSI, +334/-0 PSI</option>
                                <option value="3480">3480 PSI, +348/-0 PSI</option>
                                <option value="3626">3626 PSI, +363/-0 PSI</option>
                            </select>`;

        const portBHtml = `<select name="portB" id="portB${i}">
                                <option value="" disabled selected hidden>...</option>
                                <option value="anti-cav">Anti-Cav Facility</option>
                                <option value="plug">Plug</option>
                                <option value="464">464 PSI, +290/-0 PSI</option>
                                <option value="725">725 PSI, +290/-0 PSI</option>
                                <option value="913">913 PSI, +290/-0 PSI</option>
                                <option value="1160">1160 PSI, +290/-0 PSI</option>
                                <option value="1450">1450 PSI, +334/-0 PSI</option>
                                <option value="1813">1813 PSI, +334/-0 PSI</option>
                                <option value="2031">2031 PSI, +334/-0 PSI</option>
                                <option value="2176">2176 PSI, +334/-0 PSI</option>
                                <option value="2321">2321 PSI, +334/-0 PSI</option>
                                <option value="2538">2538 PSI, +334/-0 PSI</option>
                                <option value="2756">2756 PSI, +334/-0 PSI</option>
                                <option value="3045">3045 PSI, +334/-0 PSI</option>
                                <option value="3335">3335 PSI, +334/-0 PSI</option>
                                <option value="3480">3480 PSI, +348/-0 PSI</option>
                                <option value="3626">3626 PSI, +363/-0 PSI</option>
                            </select>`;

        const loadSenseAHtml = `<input type="number" id="loadSenseA${i}" name="loadSenseA" placeholder="...">`;

        const loadSenseBHtml = `<input type="number" id="loadSenseB${i}" name="loadSenseB" placeholder="...">`;

        const html = `<div id="section${i}">Section ${i + 1}: 
                    ${descriptionHtml}
                    ${acutationHtml}
                    ${gpmHtml}
                    ${spoolHtml}
                    ${portAHtml}
                    ${portBHtml}
                    ${loadSenseAHtml}
                    ${loadSenseBHtml}
                </div>`;

        pvgSelectionsContent.innerHTML += html;
    }
}

function updatePvgAssemSections() {
    for (i = 0; i < pvgAssem.numSections; i++) {
        const descriptionID = `description${i}`;
        const actuationMethodID = `actuationMethod${i}`;
        const gpmID = `gpm${i}`;
        const spoolTypeID = `spoolType${i}`;
        const portAID = `portA${i}`;
        const portBID = `portB${i}`;
        const loadSenseAID = `loadSenseA${i}`;
        const loadSenseBID = `loadSenseB${i}`;

        const description = document.getElementById(descriptionID);
        const actuation = document.getElementById(actuationMethodID);
        const gpm = document.getElementById(gpmID);
        const spoolType = document.getElementById(spoolTypeID);
        const portA = document.getElementById(portAID);
        const portB = document.getElementById(portBID);
        const loadSenseA = document.getElementById(loadSenseAID);
        const loadSenseB = document.getElementById(loadSenseBID);

        pvgAssem.updateSection(
            i,
            description.value,
            actuation.value,
            gpm.value,
            spoolType.value,
            portA.value,
            portB.value,
            loadSenseA.value,
            loadSenseB.value
        );
    }
}

valvePopupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    updatePvgAssemSections();

    buildPvgAssemDisplay();
    displayPartNumDiv();

    valvePopupWrapper.style.display = "none";
});
