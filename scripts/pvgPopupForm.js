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
                        </div>`;

    pvgSelectionsContent.innerHTML = `${headerHtml}`;

    let numSections = pvgAssem.numSections;

    for (i = 0; i < numSections; i++) {
        const descriptionHtml = `<input type="text" id="description${i}" placeholder="Description">`;

        const acutationHtml = `<select name="actuationMethod" id="actuationMethod${i}">
                                    <option value="" disabled selected hidden>Actuation...</option>
                                    <option value="electrical">Electrical (PVHC) 12V</option>
                                    <option value="electrical">Electrical (PVHC) 24V</option>
                                    <option value="mechanical">Mechanical</option>
                                </select>`;

        const gpmHtml = `<input type="number" id="gpm${i}" name="gpm" placeholder="gpm">`;

        const spoolHtml = `<select name="spoolType" id="spoolType${i}">
                                <option value="" disabled selected hidden>Spool...</option>
                                <option value="DA-motor">DA - Motor</option>
                                <option value="SA-motor">SA - Motor</option>
                                <option value="DA-cylinder">DA - Cylinder</option>
                                <option value="SA-cylinder">SA - Cylinder</option>
                            </select>`;

        const portAHtml = `<select name="portA" id="portA${i}">
                                <option value="" disabled selected hidden>Port A...</option>
                                <option value="157B2001">157B2001 Anti-Cav Facility</option>
                                <option value="157B2002">157B2002 Plug</option>
                                <option value="157B2032">157B2032 (464 PSI, +290/-0 PSI)</option>
                                <option value="157B2050">157B2050 (725 PSI, +290/-0 PSI)</option>
                                <option value="157B2063">157B2063 (913 PSI, +290/-0 PSI)</option>
                                <option value="157B2080">157B2080 (1160 PSI, +290/-0 PSI)</option>
                                <option value="157B2100">157B2100 (1450 PSI, +334/-0 PSI)</option>
                                <option value="157B2125">157B2125 (1813 PSI, +334/-0 PSI)</option>
                                <option value="157B2140">157B2140 (2031 PSI, +334/-0 PSI)</option>
                                <option value="157B2150">157B2150 (2176 PSI, +334/-0 PSI)</option>
                                <option value="157B2160">157B2160 (2321 PSI, +334/-0 PSI)</option>
                                <option value="157B2175">157B2175 (2538 PSI, +334/-0 PSI)</option>
                                <option value="157B2190">157B2190 (2756 PSI, +334/-0 PSI)</option>
                                <option value="157B2210">157B2210 (3045 PSI, +334/-0 PSI)</option>
                                <option value="157B2230">157B2230 (3335 PSI, +334/-0 PSI)</option>
                                <option value="157B2240">157B2240 (3480 PSI, +348/-0 PSI)</option>
                                <option value="157B2250">157B2250 (3626 PSI, +363/-0 PSI)</option>
                            </select>`;

        const portBHtml = `<select name="portB" id="portB${i}">
                                <option value="" disabled selected hidden>Port B...</option>
                                <option value="157B2001">157B2001 Anti-Cav Facility</option>
                                <option value="157B2002">157B2002 Plug</option>
                                <option value="157B2032">157B2032 (464 PSI, +290/-0 PSI)</option>
                                <option value="157B2050">157B2050 (725 PSI, +290/-0 PSI)</option>
                                <option value="157B2063">157B2063 (913 PSI, +290/-0 PSI)</option>
                                <option value="157B2080">157B2080 (1160 PSI, +290/-0 PSI)</option>
                                <option value="157B2100">157B2100 (1450 PSI, +334/-0 PSI)</option>
                                <option value="157B2125">157B2125 (1813 PSI, +334/-0 PSI)</option>
                                <option value="157B2140">157B2140 (2031 PSI, +334/-0 PSI)</option>
                                <option value="157B2150">157B2150 (2176 PSI, +334/-0 PSI)</option>
                                <option value="157B2160">157B2160 (2321 PSI, +334/-0 PSI)</option>
                                <option value="157B2175">157B2175 (2538 PSI, +334/-0 PSI)</option>
                                <option value="157B2190">157B2190 (2756 PSI, +334/-0 PSI)</option>
                                <option value="157B2210">157B2210 (3045 PSI, +334/-0 PSI)</option>
                                <option value="157B2230">157B2230 (3335 PSI, +334/-0 PSI)</option>
                                <option value="157B2240">157B2240 (3480 PSI, +348/-0 PSI)</option>
                                <option value="157B2250">157B2250 (3626 PSI, +363/-0 PSI)</option>
                            </select>`;

        const html = `<div id="section${i}">Section ${i + 1}: 
                    ${descriptionHtml}
                    ${acutationHtml}
                    ${gpmHtml}
                    ${spoolHtml}
                    ${portAHtml}
                    ${portBHtml}
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

        const description = document.getElementById(descriptionID);
        const actuation = document.getElementById(actuationMethodID);
        const gpm = document.getElementById(gpmID);
        const spoolType = document.getElementById(spoolTypeID);
        const portA = document.getElementById(portAID);
        const portB = document.getElementById(portBID);

        pvgAssem.updateSection(
            i,
            description.value,
            actuation.value,
            gpm.value,
            spoolType.value,
            portA.value,
            portB.value
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
