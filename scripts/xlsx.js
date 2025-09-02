const downloadXlsxButtons = document.querySelectorAll(".download-xlsx");

downloadXlsxButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        downloadXlsx();
    });
});

function downloadXlsx() {
    if (window.confirm("Are you sure you want to download this file?")) {
        let csvString =
            "ID, Main ID, Item ID, Component ID, Qty Per Assembly, Save Changes";

        // Create a Blob from the CSV string
        const blob = new Blob([csvString], { type: "text/csv" });

        // Generate a download link and initiate the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "download.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
