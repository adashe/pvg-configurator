const assemblyNumDisplay = document.querySelectorAll('.assembly-num-display');
const partNumDets = document.querySelector('#part-num-dets');
const totalCostDisplay = document.querySelector('#total-cost-disp');


// Build configured HPU part number and details
function buildPvgAssemDisplay(){

    // Build assembly number displays
    assemblyNumDisplay.forEach((element) => {
        element.innerHTML = `${pvgAssem.mppSysNum}`;
    });

    // Build dropdown for each section in assembly
    const numSections = pvgAssem.numSections;

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
            <div class="dropdown">
                <div class="trigger">SECTION ${i + 1}: ${description.toUpperCase()}</div>
                <div class="content">        
                    <ul>
                        <li>PVG Series: ${pvgSeries}</li>
                        <li>Actuation: ${actuation.toUpperCase()}</li>
                        <li>Spool Type: ${spoolType.toUpperCase()}</li>
                        <li>${gpm} gpm</li>
                        <li>Port Relief A: ${portRelA} psi</li>
                        <li>Port Relief B: ${portRelB} psi</li>
                        <li>Cost: $$</li>
                    </ul>
                </div>
            </div>
        `;

        sectionsHTML += html;
    };

    // Build dropdown for automatically-included parts
    const defaultsHTML = `
        <div class="dropdown">
            <div class="trigger">Included Features</div>
            <div class="content">        
                <ul>
                    <li>?</li>
                    <li>??</li>
                    <li>??!!</li>
                    <li>??!!!!!!!</li>
                    <li>Cleanout Covers</li>
                </ul>
            </div>
        </div>
    `;

    // Display inputs on part number page
    const inputsHTML = `
        <div class="dropdown">
            <div class="trigger">Base Configuration</div>
            <div class="content">        
                <ul>
                    <li>End Plate: $$</li>
                    <li>Tie-Rods: 20ft: $$</li>
                    <li>Paint: ${pvgAssem.paint}: $$</li>
                    <li>LIQ Populated: $$</li>
                    <li>Opened Center: $$</li>
                    <li>Power Float Manifold: $$</li>
                </ul>
            </div>
        </div>
    `;

    const editInputsHTML = `<p class="edit-inputs" id="edit-inputs">Edit inputs</p>`

    partNumDets.innerHTML = editInputsHTML
        + sectionsHTML
        + defaultsHTML 
        + inputsHTML 
        ;

    addEventHandlersToDropdowns();
    addEventHandlerToEditInputs();

    buildTotalCostDisplay();
};

// Add event handlers to dropdowns
const addEventHandlersToDropdowns = () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.trigger');
        const content = dropdown.querySelector('.content');
    
        trigger.addEventListener('click', e => {
            e.preventDefault();

            trigger.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
};


// Add event handler to the edit hpu inputs button
const addEventHandlerToEditInputs = () => {
    const editInputs = document.querySelector('#edit-inputs');

    editInputs.addEventListener('click', e => {
        e.preventDefault();

        displayManifoldSetupForm();
    });
};

// Build html to display total cost of HPU and valves on part number display
const buildTotalCostDisplay = () => {
    
    const total = pvgAssem.calcCost();

    totalCostDisplay.innerHTML = `<h4 class="total-price">TOTAL LIST PRICE: $${total.toFixed(2)}</h4>`
};