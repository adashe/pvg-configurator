/* const hpuStart = document.querySelector('.hpu-start'); */
/* const msStart = document.querySelector('.ms-start');
const hmiStart = document.querySelector('.gw-start'); */

/* const componentDiv = document.querySelector('#component-div'); */
const hpuDiv = document.querySelector('#hpu-div');
/* const mspDiv = document.querySelector('#msp-div');
const hmiDiv = document.querySelector('#hmi-div'); */
const partNumDiv = document.querySelector('#part-num-div');
const contactDiv = document.querySelector('#contact-div');
/* const emailConfDiv = document.querySelector('#email-conf-div'); */

let currConfigurator = null;


// Display component div
const displayComponentDiv = () => {
    hpuDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
/*     emailConfDiv.style.display = 'none'; */
};

// Display part number div
const displayPartNumDiv = () => {
    hpuDiv.style.display = 'none';
    partNumDiv.style.display = 'block';
    contactDiv.style.display = 'none';
    /* emailConfDiv.style.display = 'none'; */
};

// Display email div
const displayContactDiv = () => {
    hpuDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'block';
    /* emailConfDiv.style.display = 'none'; */

    // Show / hide distributor select when a customer is logged in
    /* toggleCustSettings(); */
};

// Display email confirmation div
const displayEmailConfDiv = () => {
    hpuDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
    /* emailConfDiv.style.display = 'block'; */
};