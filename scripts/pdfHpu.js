const pdfDetsDiv = document.querySelector('#pdf-dets-div');
const pdfValveDiv = document.querySelector('#pdf-valve-div');
const pdfTotalListPriceDiv = document.querySelector('#pdf-total-list-price-div');

// Generate all components for HPU pdf
const generatePvgPdf = () => {
    fillPdfDets();
    fillTotalCostPdfDets();
};

// Build HPU pdf page
const fillPdfDets = () => {

    pdfDetsDiv.innerHTML = '';

    // Build part number HTML
    const headerHTML = `<h2>MPP System Number: ${pvgAssem.mppSysNum.toUpperCase()}</h2>`;

    // Build included features HTML
    const defaultsHTML = `
        <h3>INCLUDED FEATURES</h3>
        <ul>
            <li>?</li>
            <li>??</li>
            <li>??!!</li>
            <li>??!!!!!!!</li>
            <li>Cleanout Covers</li>
        </ul>
    `;

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
    let sectionsHTML = '';

    for(i = 0; i < pvgAssem.numSections; i++){

        const sectionID = `section${i}`;

        const description = pvgAssem[sectionID].description;
        const pvgSeries = pvgAssem[sectionID].pvgSeries;
        const actuation = pvgAssem[sectionID].actuation;
        const spoolType = pvgAssem[sectionID].spoolType;
        const gpm = pvgAssem[sectionID].gpm;
        const portRelA = pvgAssem[sectionID].portRelA;
        const portRelB = pvgAssem[sectionID].portRelB;

        html = `
            <h3>SECTION ${i + 1}: ${description.toUpperCase()}</h3>       
            <ul>
                <li>PVG Series: ${pvgSeries}</li>
                <li>Actuation: ${actuation.toUpperCase()}</li>
                <li>Spool Type: ${spoolType.toUpperCase()}</li>
                <li>${gpm} gpm</li>
                <li>Port Relief A: ${portRelA} psi</li>
                <li>Port Relief B: ${portRelB} psi</li>
                <li>Cost: $$</li>
            </ul>
        `;

        sectionsHTML += html;
    };

    pdfDetsDiv.innerHTML = headerHTML
        + sectionsHTML
        + defaultsHTML
        + inputsHTML
        ;
};

const fillTotalCostPdfDets = () => {
    const total = pvgAssem.calcCost();
    pdfTotalListPriceDiv.innerHTML = `<div class="pdf-total-list"><h4>TOTAL LIST PRICE: ${total.toFixed(2)}</h4></div>`;
};