
const pvgSetupDiv = document.querySelector('#pvg-setup-div');
const partNumDiv = document.querySelector('#part-num-div');
const contactDiv = document.querySelector('#contact-div');


let currConfigurator = null;


// Display component div
const displayComponentDiv = () => {
    pvgSetupDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
/*     emailConfDiv.style.display = 'none'; */
};

// Display part number div
const displayPartNumDiv = () => {
    pvgSetupDiv.style.display = 'none';
    partNumDiv.style.display = 'block';
    contactDiv.style.display = 'none';
    /* emailConfDiv.style.display = 'none'; */
};

// Display email div
const displayContactDiv = () => {
    pvgSetupDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'block';
    /* emailConfDiv.style.display = 'none'; */

    // Show / hide distributor select when a customer is logged in
    /* toggleCustSettings(); */
};

// Display email confirmation div
const displayEmailConfDiv = () => {
    pvgSetupDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
    /* emailConfDiv.style.display = 'block'; */
};