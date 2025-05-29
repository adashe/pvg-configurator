const defaultEmail = 'configurator@email.com';

const generateEmailButtons = document.querySelectorAll('.generate-email');

generateEmailButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        updateContactInputs();
        generateEmail();
    });
});

const createMailtoLink = (email, subject, bodyText) => {
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(bodyText);
    const mailtoLink = `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    return mailtoLink;
};

const genContactEmailBody = () => {

    let contactHtml = `\n\nCUSTOMER INFO:\n${contactInputs.contactName}\n${contactInputs.companyName}\n${contactInputs.email}\n${contactInputs.phone}`;

    return contactHtml;
};