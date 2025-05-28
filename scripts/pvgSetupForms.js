const manifoldSetupForm = document.querySelector('#manifold-setup-form');
const pvgSetupForm = document.querySelector('#pvg-setup-form');

const manifoldSetupButtons = document.querySelectorAll('.manifold-setup-btn');
const pvgSetupButtons = document.querySelectorAll('.pvg-setup-btn');

const pvgAssem = new PvgAssembly();


// DISPLAY AND HIDE FORM ELEMENTS
const displayManifoldSetupForm = () => {
    pvgSetupDiv.style.display = 'block';
    partNumDiv.style.display = 'none';

    manifoldSetupForm.style.display = 'block';
    pvgSetupForm.style.display = 'none';
};

const displayPvgSetupForm = () => {
    manifoldSetupForm.style.display = 'none';
    pvgSetupForm.style.display = 'block';
};

// BUTTONS
// Buttons to display system parameters form
manifoldSetupButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayManifoldSetupForm();
    });
});

// Buttons to display manifold options form
pvgSetupButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayPvgSetupForm();
        valvePopupWrapper.style.display = 'none';
    });
});

// PROCESS FORM INPUTS
let pvgInputs = {
    mppSysNum: null,
    mppInletSetup: null,
    liqPopulated: null,
    mainReliefPsi: null,
    spreaderReliefPsi: null,
    mppPowerFloat: null,
    numSections: null,
    paint: null
};

function resetPvgInputs(){
    pvgInputs = {
        mppSysNum: null,
        mppInletSetup: null,
        liqPopulated: null,
        mainReliefPsi: null,
        spreaderReliefPsi: null,
        mppPowerFloat: null,
        numSections: null,
        paint: null
    };
};

// Process manifold setup form inputs
manifoldSetupForm.addEventListener('submit', e => {
    e.preventDefault();

    pvgInputs.mppSysNum = manifoldSetupForm.mppSysNum.value;
    pvgInputs.mppInletSetup = manifoldSetupForm.mppInletSetup.value;
    pvgInputs.liqPopulated = manifoldSetupForm.liqPopulated.value;
    pvgInputs.mainReliefPsi = manifoldSetupForm.mainReliefPsi.value;
    pvgInputs.spreaderReliefPsi = manifoldSetupForm.spreaderReliefPsi.value;
    pvgInputs.mppPowerFloat = manifoldSetupForm.mppPowerFloat.value;

    displayPvgSetupForm();
});

// Process pvg setup form inputs
pvgSetupForm.addEventListener('submit', e => {
    e.preventDefault();

    pvgInputs.numSections = pvgSetupForm.numSections.value;
    pvgInputs.paint = pvgSetupForm.paint.value;

    displayValvePopup();
});

function updatePvgAssem(){
    pvgAssem.mppSysNum = pvgInputs.mppSysNum;
    pvgAssem.mppSysNum = pvgInputs.mppSysNum;
    pvgAssem.mppInletSetup = pvgInputs.mppInletSetup;
    pvgAssem.liqPopulated = pvgInputs.liqPopulated;
    pvgAssem.mainReliefPsi = pvgInputs.mainReliefPsi;
    pvgAssem.spreaderReliefPsi = pvgInputs.spreaderReliefPsi;
    pvgAssem.mppPowerFloat = pvgInputs.mppPowerFloat;
    pvgAssem.numSections = pvgInputs.numSections;
    pvgAssem.paint = pvgInputs.paint;

    console.log(pvgAssem);

    buildPvgAssemDisplay();
    displayPartNumDiv();
}