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

        // build rows for manifold
        const manifoldRows = [
            {
                "Section Number": "manifold",
                Description: "MPP System Number",
                Value: pvgAssem?.mppSysNum?.toUpperCase(),
                "Part Num": null,
            },
            {
                "Section Number": "manifold",
                Description: "MPP Revision Number",
                Value: pvgAssem?.mppRevNum,
                "Part Num": null,
            },
            {
                "Section Number": "manifold",
                Description: "Number of Sections",
                Value: pvgAssem?.numSections,
                "Part Num": null,
            },
            {
                "Section Number": "manifold",
                Description: "MPP Inlet Setup",
                Value: pvgAssem?.mppInletSetup.toUpperCase(),
                "Part Num": null,
            },
            {
                "Section Number": "manifold",
                Description: "LIQ Populated",
                Value: pvgAssem?.liqPopulated.toUpperCase(),
                "Part Num":
                    pvgAssem.liqPopulated === "yes" ? "SOLMAN10057" : "",
            },
            {
                "Section Number": "manifold",
                Description: "Main Relief PSI",
                Value: pvgAssem.mainReliefPsi
                    ? `${pvgAssem?.mainReliefPsi} PSI`
                    : "NONE",
                "Part Num": pvgAssem.liqPopulated ? "" : "SOLMAN10064",
            },
            {
                "Section Number": "manifold",
                Description: "Spreader Relief PSI",
                Value: pvgAssem.spreaderReliefPsi
                    ? `${pvgAssem?.spreaderReliefPsi} PSI`
                    : "NONE",
                "Part Num": null,
            },
            {
                "Section Number": "manifold",
                Description: "MPP Power Float",
                Value: pvgAssem?.mppPowerFloat.toUpperCase(),
                "Part Num":
                    pvgAssem.mppPowerFloat === "yes" ? "SOLMAN10058" : "",
            },
            {
                "Section Number": "manifold",
                Description: "Paint",
                Value: pvgAssem?.paint.toUpperCase(),
                "Part Num": null,
            },
            {
                "Section Number": "manifold",
                Description: "Tie Rod Kit",
                Value: null,
                "Part Num": "555555555",
            },
        ];

        // add row for manifold
        rows = [...rows, ...manifoldRows];

        // build rows for each section
        for (i = 0; i < pvgAssem.numSections; i++) {
            const {
                actuationPart,
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

            // convert spool type to full name description
            let actuatorName;
            switch (spoolType) {
                case "DM":
                    actuatorName = "DA - Motor";
                case "SM":
                    actuatorName = "SA - Motor";
                case "DC":
                    actuatorName = "DA - Cylinder";
                case "SC":
                    actuatorName = "SA - Cylinder";
                default:
                    null;
            }

            const sectionRows = [
                {
                    "Section Number": i + 1,
                    Description: "Section Description",
                    Value: description.toUpperCase(),
                    "Part Num": null,
                },
                {
                    "Section Number": i + 1,
                    Description: "Rated Flow and Actuator",
                    Value: `${actuatorName} ${gpm} GPM`,
                    "Part Num": null,
                },
                {
                    "Section Number": i + 1,
                    Description: "Actuation",
                    Value: actuation.toUpperCase(),
                    "Part Num": actuationPart?.partNumber,
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
            ];

            // add base rows for each section
            rows = [...rows, ...sectionRows];

            // optional section rows

            portA
                ? (rows = [
                      ...rows,
                      {
                          "Section Number": i + 1,
                          Description: "Port A",
                          Value: portAPart.description,
                          "Part Num": portAPart.partNumber,
                      },
                  ])
                : null;

            portB
                ? (rows = [
                      ...rows,
                      {
                          "Section Number": i + 1,
                          Description: "Port B",
                          Value: portBPart.description,
                          "Part Num": portBPart.partNumber,
                      },
                  ])
                : null;

            loadSenseA
                ? (rows = [
                      ...rows,
                      {
                          "Section Number": i + 1,
                          Description: "LS Relief A",
                          Value: `${loadSenseA} PSI`,
                          "Part Num": Math.round(loadSenseA / 14.5),
                      },
                  ])
                : null;

            loadSenseB
                ? (rows = [
                      ...rows,
                      {
                          "Section Number": i + 1,
                          Description: "LS Relief B",
                          Value: `${loadSenseB} PSI`,
                          "Part Num": Math.round(loadSenseB / 14.5),
                      },
                  ])
                : null;

            leverBasePart
                ? (rows = [
                      ...rows,
                      {
                          "Section Number": i + 1,
                          Description: "PVM32: Handle for Port A Side",
                          Value: leverBasePart.description,
                          "Part Num": leverBasePart.partNumber,
                      },
                  ])
                : null;

            leverBaseLeverPart
                ? (rows = [
                      ...rows,
                      {
                          "Section Number": i + 1,
                          Description: "PVM32: Handle for Port A Side",
                          Value: leverBaseLeverPart.description,
                          "Part Num": leverBaseLeverPart.partNumber,
                      },
                  ])
                : null;

            cableKitPart
                ? (rows = [
                      ...rows,
                      {
                          "Section Number": i + 1,
                          Description: "Cable Kit",
                          Value: cableKitPart.description,
                          "Part Num": cableKitPart.partNumber,
                      },
                  ])
                : null;
        }

        /* generate worksheet from rows array */
        const ws = XLSX.utils.json_to_sheet(rows);

        /* create workbook and append worksheet */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Specification Sheet");

        /* export to XLSX */
        XLSX.writeFile(wb, "PVG Specification Sheet.xlsx");
    }
}
