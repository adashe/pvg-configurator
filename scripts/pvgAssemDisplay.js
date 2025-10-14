const assemblyNumDisplay = document.querySelectorAll(".assembly-num-display");
const partNumDets = document.querySelector("#part-num-dets");
const totalCostDisplay = document.querySelector("#total-cost-disp");

// Build configured HPU part number and details
function buildPvgAssemDisplay() {
    // Build assembly number displays
    assemblyNumDisplay.forEach((element) => {
        // element.innerHTML = `${pvgAssem.mppSysNum.toUpperCase()}-${pvgAssem.mppRevNum.toUpperCase()}`;
        element.innerHTML = `${pvgAssem.generateInletAssemNum()}`;
    });

    // Build dropdown for each section in assembly
    let sectionsHTML = "";

    for (i = 0; i < pvgAssem.numSections; i++) {
        const sectionID = `section${i}`;

        const {
            description,
            actuation,
            gpm,
            spoolType,
            portA,
            portB,
            loadSenseA,
            loadSenseB,
        } = pvgAssem[sectionID];

        const sectionAssemNum = pvgAssem.generateSectionAssemNum(sectionID);

        html = `
            <div class="dropdown">
                <div class="trigger">SECTION ${i + 1}: ${sectionAssemNum}</div>
                <div class="content">        
                    <ul>
                        <li>Description: ${description.toUpperCase()}</li>
                        <li>Actuation: ${actuation.toUpperCase()}</li>
                        <li>Flow: ${gpm ? `${gpm} gpm` : ""}</li>
                        <li>Spool Type: ${spoolType.toUpperCase()}</li>
                        <li>Port A: ${portA ? `${portA} psi` : ""}</li>
                        <li>Port B: ${portA ? `${portB} psi` : ""}</li>
                        ${
                            loadSenseA
                                ? `<li>LS Relief A: ${loadSenseA} psi`
                                : ""
                        }
                        ${
                            loadSenseB
                                ? `<li>LS Relief B: ${loadSenseB} psi`
                                : ""
                        }
                    </ul>
                </div>
            </div>
        `;

        sectionsHTML += html;
    }

    // Display base configuration on part number page
    const baseConfigurationHTML = `
        <div class="dropdown">
            <div class="trigger">Base Configuration</div>
            <div class="content">
                <ul>
                    <li>Main Relief: ${
                        pvgAssem.mainReliefPsi
                            ? `${pvgAssem.mainReliefPsi} psi`
                            : "None"
                    }</li>
                    <li>Spreader Relief: ${
                        pvgAssem.spreaderReliefPsi
                            ? `${pvgAssem.spreaderReliefPsi} psi`
                            : "None"
                    }</li>
                </ul>
            </div>
        </div>
    `;

    // Display included features and optional features
    const addersHTML = `
        <div class="dropdown">
            <div class="trigger">Adders</div>
            <div class="content">
                <ul>
                    <li>${
                        pvgAssem.paint === "black"
                            ? "Black Paint: $88.55"
                            : "No Paint"
                    }</li>
                    <li>LIQ Populated: $$</li>
                    <li>Power Float Manifold: $$</li>
                    <li>Tariff Charge: 13.9% (included)</li>
                </ul>
            </div>
        </div>
    `;

    partNumDets.innerHTML = sectionsHTML + baseConfigurationHTML + addersHTML;

    addEventHandlersToDropdowns();

    buildTotalCostDisplay();
}

// Add event handlers to dropdowns
const addEventHandlersToDropdowns = () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector(".trigger");
        const content = dropdown.querySelector(".content");

        trigger.addEventListener("click", (e) => {
            e.preventDefault();

            trigger.classList.toggle("active");
            content.classList.toggle("active");
        });
    });
};

// Build html to display total cost of HPU and valves on part number display
const buildTotalCostDisplay = () => {
    const total = pvgAssem.calcCost();

    totalCostDisplay.innerHTML = `<h4 class="total-price">TOTAL LIST PRICE: $${total.toFixed(
        2
    )}</h4>`;
};
