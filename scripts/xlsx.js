const downloadXlsxButtons = document.querySelectorAll(".download-xlsx");

downloadXlsxButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        downloadXlsx();
    });
});

async function downloadXlsx() {
    if (window.confirm("Are you sure you want to download this file?")) {
        let rows = [];

        // build rows for each section
        for (i = 0; i < pvgAssem.numSections; i++) {
            const {
                actuationPart,
                portAhandlePart,
                bodyPart,
                spoolPart,
                portAPart,
                portBPart,
                leverBasePart,
                leverBaseLeverPart,
                cableKitPart,
            } = await pvgAssem.updatePartNumbers(i);

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

            const sectionRows = [
                {
                    "Section Number": i + 1,
                    Description: "Configuration Number",
                    Value: sectionAssemNum,
                    "Part Num": "",
                },
                {
                    "Section Number": i + 1,
                    Description: "Section Description",
                    Value: description.toUpperCase(),
                    "Part Num": "",
                },
                {
                    "Section Number": i + 1,
                    Description: "Rated Flow and Actuator",
                    Value: `${spoolType} ${gpm} GPM`,
                    "Part Num": "",
                },
                {
                    "Section Number": i + 1,
                    Description: "Actuation",
                    Value: actuation,
                    "Part Num": actuationPart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "Handle for Port A Side",
                    Value: "PVM32",
                    "Part Num": portAhandlePart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "Body",
                    Value: bodyPart?.description,
                    "Part Num": bodyPart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "Spool",
                    Value: spoolPart?.description,
                    "Part Num": spoolPart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "Port A",
                    Value: portAPart?.description,
                    "Part Num": portAPart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "Port B",
                    Value: portBPart?.description,
                    "Part Num": portBPart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "LS Relief A",
                    Value: `${loadSenseA} PSI`,
                    "Part Num": null,
                },
                {
                    "Section Number": i + 1,
                    Description: "LS Relief B",
                    Value: `${loadSenseB} PSI`,
                    "Part Num": null,
                },
                {
                    "Section Number": i + 1,
                    Description: "Lever Base",
                    Value: leverBasePart?.description,
                    "Part Num": leverBasePart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "Lever Base and Lever",
                    Value: leverBaseLeverPart?.description,
                    "Part Num": leverBaseLeverPart?.partNumber,
                },
                {
                    "Section Number": i + 1,
                    Description: "Cable Kit",
                    Value: cableKitPart?.description,
                    "Part Num": cableKitPart?.partNumber,
                },
            ];

            // add row for each section
            rows = [...rows, ...sectionRows];
        }

        // const title = ["PVG 32"];

        /* generate worksheet from rows array */
        const ws = XLSX.utils.json_to_sheet(rows);

        /* create workbook and append worksheet */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Specification Sheet");

        /* export to XLSX */
        XLSX.writeFile(wb, "PVG Specification Sheet.xlsx");
    }
}
