const downloadP21Buttons = document.querySelectorAll(".download-p21");

downloadP21Buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        downloadP21();
    });
});

async function downloadP21() {
    if (window.confirm("Are you sure you want to download this file?")) {
        let rows = [];

        pvgAssem.liqPopulated
            ? (rows = [
                  ...rows,
                  {
                      ID: 1,
                      "Main ID": 1,
                      "Item ID": pvgAssem.mppSysNum,
                      "Component ID": "SOLMAN10057",
                      "Qty per Assembly": 1,
                      "Save Changes": "Y",
                  },
              ])
            : null;

        pvgAssem.mppPowerFloat === "yes"
            ? (rows = [
                  ...rows,
                  {
                      ID: 1,
                      "Main ID": 1,
                      "Item ID": pvgAssem.mppSysNum,
                      "Component ID": "SOLMAN10058",
                      "Qty per Assembly": 1,
                      "Save Changes": "Y",
                  },
              ])
            : null;

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

            const { portA, portB, loadSenseA, loadSenseB } =
                pvgAssem[sectionID];

            const sectionRows = [
                {
                    ID: 1,
                    "Main ID": 1,
                    "Item ID": pvgAssem.mppSysNum,
                    "Component ID": actuationPart?.partNumber,
                    "Qty per Assembly": 1,
                    "Save Changes": "Y",
                },
                {
                    ID: 1,
                    "Main ID": 1,
                    "Item ID": pvgAssem.mppSysNum,
                    "Component ID": bodyPart?.partNumber,
                    "Qty per Assembly": 1,
                    "Save Changes": "Y",
                },
                {
                    ID: 1,
                    "Main ID": 1,
                    "Item ID": pvgAssem.mppSysNum,
                    "Component ID": spoolPart?.partNumber,
                    "Qty per Assembly": 1,
                    "Save Changes": "Y",
                },
            ];

            // add base rows for each section
            rows = [...rows, ...sectionRows];

            // optional section rows
            portA
                ? (rows = [
                      ...rows,
                      {
                          ID: 1,
                          "Main ID": 1,
                          "Item ID": pvgAssem.mppSysNum,
                          "Component ID": portAPart.partNumber,
                          "Qty per Assembly": 1,
                          "Save Changes": "Y",
                      },
                  ])
                : null;

            portB
                ? (rows = [
                      ...rows,
                      {
                          ID: 1,
                          "Main ID": 1,
                          "Item ID": pvgAssem.mppSysNum,
                          "Component ID": portBPart.partNumber,
                          "Qty per Assembly": 1,
                          "Save Changes": "Y",
                      },
                  ])
                : null;

            loadSenseA
                ? (rows = [
                      ...rows,
                      {
                          ID: 1,
                          "Main ID": 1,
                          "Item ID": pvgAssem.mppSysNum,
                          "Component ID": portBPart.partNumber,
                          "Qty per Assembly": 1,
                          "Save Changes": "Y",
                      },
                  ])
                : null;

            loadSenseB
                ? (rows = [
                      ...rows,
                      {
                          ID: 1,
                          "Main ID": 1,
                          "Item ID": pvgAssem.mppSysNum,
                          "Component ID": portBPart.partNumber,
                          "Qty per Assembly": 1,
                          "Save Changes": "Y",
                      },
                  ])
                : null;

            leverBasePart
                ? (rows = [
                      ...rows,
                      {
                          ID: 1,
                          "Main ID": 1,
                          "Item ID": pvgAssem.mppSysNum,
                          "Component ID": leverBasePart.partNumber,
                          "Qty per Assembly": 1,
                          "Save Changes": "Y",
                      },
                  ])
                : null;

            leverBaseLeverPart
                ? (rows = [
                      ...rows,
                      {
                          ID: 1,
                          "Main ID": 1,
                          "Item ID": pvgAssem.mppSysNum,
                          "Component ID": leverBaseLeverPart.partNumber,
                          "Qty per Assembly": 1,
                          "Save Changes": "Y",
                      },
                  ])
                : null;

            cableKitPart
                ? (rows = [
                      ...rows,
                      {
                          ID: 1,
                          "Main ID": 1,
                          "Item ID": pvgAssem.mppSysNum,
                          "Component ID": cableKitPart.partNumber,
                          "Qty per Assembly": 1,
                          "Save Changes": "Y",
                      },
                  ])
                : null;
        }

        // build cover sheet
        const coverRows = [
            { ID: 1, "Item ID": pvgAssem.mppSysNum, "Save Changes": "Y" },
        ];

        /* generate worksheet from rows array */
        const ws = XLSX.utils.json_to_sheet(coverRows);

        /* generate worksheet from rows array */
        const partsWs = XLSX.utils.json_to_sheet(rows);

        /* create workbook and append worksheets */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Assembly");
        XLSX.utils.book_append_sheet(
            wb,
            partsWs,
            `${pvgAssem.mppSysNum} Prophet21 BoM Input`
        );

        /* export to XLSX */
        XLSX.writeFile(wb, `${pvgAssem.mppSysNum} Prophet21 BoM Input.xlsx`);
    }
}
