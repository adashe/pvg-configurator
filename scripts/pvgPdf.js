const pdfDetsDiv = document.querySelector("#pdf-dets-div");
const pdfValveDiv = document.querySelector("#pdf-valve-div");
const pdfTotalListPriceDiv = document.querySelector(
    "#pdf-total-list-price-div"
);

// Generate all components for HPU pdf
const generatePvgPdf = () => {
    fillPdfDets();
    fillTotalCostPdfDets();
};

// Build HPU pdf page
const fillPdfDets = () => {
    pdfDetsDiv.innerHTML = "";

    // Build part number HTML
    const headerHTML = `<h2>MPP System Number: ${pvgAssem.mppSysNum.toUpperCase()}-${pvgAssem.mppRevNum.toUpperCase()}</h2>`;

    // Build inputs HTML
    const inputsHTML = `
        <h3>BASE CONFIGURATION</h3>
        <ul>
            <li>End Plate: $$</li>
            <li>Tie-Rods: 20ft: $$</li>
            <li>Paint: ${pvgAssem.paint}: $$</li>
            <li>LIQ Populated: $$</li>
            <li>Opened Center: $$</li>
            <li>Power Float Manifold: $$</li>
        </ul>
    `;

    // Build details HTML for each section
    let sectionsHTML = "";

    for (i = 0; i < pvgAssem.numSections; i++) {
        const sectionID = `section${i}`;

        const description = pvgAssem[sectionID].description;
        const actuation = pvgAssem[sectionID].actuation;
        const gpm = pvgAssem[sectionID].gpm;
        const spoolType = pvgAssem[sectionID].spoolType;
        const portA = pvgAssem[sectionID].portA;
        const portB = pvgAssem[sectionID].portB;
        const loadSenseA = pvgAssem[sectionID].loadSenseA;
        const loadSenseB = pvgAssem[sectionID].loadSenseB;

        html = `
            <h3>SECTION ${i + 1}: ${description.toUpperCase()}</h3>       
            <ul>
                <li>Actuation: ${actuation.toUpperCase()}</li>
                <li>Flow: ${gpm} gpm</li>
                <li>Spool Type: ${spoolType.toUpperCase()}</li>
                <li>Port Relief A: ${portA}</li>
                <li>Port Relief B: ${portB}</li>
                <li>Load Sense A: ${loadSenseA}</li>
                <li>Load Sense B: ${loadSenseB}</li>
            </ul>
        `;

        sectionsHTML += html;
    }

    pdfDetsDiv.innerHTML = headerHTML + sectionsHTML + inputsHTML;
};

const fillTotalCostPdfDets = () => {
    const total = parseFloat(pvgAssem.calcCost());
    pdfTotalListPriceDiv.innerHTML = `
        <div class="pdf-total-list">
            <h4>TOTAL LIST PRICE: ${total.toFixed(2)}</h4>
        </div>
    `;
};
