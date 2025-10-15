class PvgAssembly {
    constructor() {
        this.mppSysNum = null;
        this.mppRevNum = null;
        this.mppInletSetup = null;
        this.liqPopulated = null;
        this.mainReliefPsi = null;
        this.spreaderReliefPsi = null;
        this.mppPowerFloat = null;
        this.numSections = null;
        this.paint = null;
        this.section0 = null;
        this.section1 = null;
        this.section2 = null;
        this.section3 = null;
        this.section4 = null;
        this.section5 = null;
        this.section6 = null;
        this.section7 = null;
        this.section8 = null;
        this.section9 = null;
        this.section10 = null;
        this.section11 = null;
    }

    reset() {
        this.mppSysNum = null;
        this.mppRevNum = null;
        this.mppInletSetup = null;
        this.liqPopulated = null;
        this.mainReliefPsi = null;
        this.spreaderReliefPsi = null;
        this.mppPowerFloat = null;
        this.numSections = null;
        this.paint = null;
        this.section0 = null;
        this.section1 = null;
        this.section2 = null;
        this.section3 = null;
        this.section4 = null;
        this.section5 = null;
        this.section6 = null;
        this.section7 = null;
        this.section8 = null;
        this.section9 = null;
        this.section10 = null;
        this.section11 = null;
    }

    async getPvgData() {
        const uri = "data/pvgData.json";
        const response = await fetch(uri);
        const data = await response.json();
        return data;
    }

    async updatePartNumbers(index) {
        const data = await this.getPvgData();

        const sectionID = `section${index}`;

        // actuation part
        const actuationPart = this[sectionID].actuation
            ? data.filter((part) => part.id === this[sectionID].actuation)[0]
            : null;

        // body part
        const bodyPart = this[sectionID].actuation
            ? this[sectionID].actuation === "mechanical"
                ? data.filter((part) => part.id === "manualBody")[0]
                : data.filter((part) => part.id === "standardBody")[0]
            : null;

        // spool part
        let spoolID = "";

        this[sectionID].actuation
            ? this[sectionID].actuation !== "mechanical"
                ? (spoolID += "pvhc")
                : (spoolID += "man")
            : null;

        this[sectionID].spoolType
            ? this[sectionID].spoolType === "DC" ||
              this[sectionID].spoolType === "SC"
                ? (spoolID += "-cyl")
                : (spoolID += "-mtr")
            : null;

        this[sectionID].gpm ? (spoolID += `-${this[sectionID].gpm}`) : null;

        if (this[sectionID].loadSenseA || this[sectionID].loadSenseB) {
            spoolID += "-sh";
        } else {
            spoolID += "-nsh";
        }

        const spoolPart = data.filter((part) => part.id === spoolID)[0];

        // port A part
        const portAPart = this[sectionID].portA
            ? data.filter((part) => part.id === this[sectionID].portA)[0]
            : null;

        // port B part
        const portBPart = this[sectionID].portB
            ? data.filter((part) => part.id === this[sectionID].portB)[0]
            : null;

        // lever base and lever part on first section only
        const leverBaseLeverPart = this[sectionID].actuation
            ? this[sectionID].actuation !== "mechanical" &&
              sectionID === "section0"
                ? data.filter((part) => part.id === "leverBaseAndLever")[0]
                : null
            : null;

        // lever base part on additional sections
        const leverBasePart = this[sectionID].actuation
            ? this[sectionID].actuation !== "mechanical" &&
              sectionID !== "section0"
                ? data.filter((part) => part.id === "leverBase")[0]
                : null
            : null;

        // cable kit part
        const cableKitPart = this[sectionID].actuation
            ? this[sectionID].actuation === "mechanical"
                ? data.filter((part) => part.id === "cableKit")[0]
                : null
            : null;

        const parts = {
            actuationPart,
            bodyPart,
            spoolPart,
            portAPart,
            portBPart,
            leverBasePart,
            leverBaseLeverPart,
            cableKitPart,
        };

        return parts;
    }

    updateSection(
        index,
        description,
        actuation,
        gpm,
        spoolType,
        portA,
        portB,
        loadSenseA,
        loadSenseB
    ) {
        const sectionID = `section${index}`;

        this[sectionID] = {
            description,
            actuation,
            gpm,
            spoolType,
            portA,
            portB,
            loadSenseA,
            loadSenseB,
        };

        return this[sectionID];
    }

    generateInletAssemNum() {
        let inletAssemNum = "";

        inletAssemNum += "MPP"; // add generic option "MAN"later
        inletAssemNum += this.mppInletSetup === "open" ? "-O" : "-C";
        inletAssemNum += this.paint === "black" ? "-P" : "-NP";
        inletAssemNum += this.liqPopulated === "yes" ? "-LIQ" : "";
        inletAssemNum += this.mppPowerFloat === "yes" ? "-PF" : "";

        inletAssemNum += this.mainReliefPsi ? "-MR" : "";
        inletAssemNum += this.spreaderReliefPsi ? "-SR" : "";
        inletAssemNum += this.openCenterReliefPsi ? "-OCR" : "";

        return inletAssemNum;
    }

    generateSectionAssemNum(sectionID) {
        let sectionAssemNum = "";

        sectionAssemNum +=
            this[sectionID].actuation === "mechanical"
                ? "M"
                : `${this[sectionID].actuation}`;
        sectionAssemNum += this[sectionID].gpm
            ? `-${this[sectionID].gpm}G`
            : "";
        sectionAssemNum += this[sectionID].spoolType
            ? `-${this[sectionID].spoolType}`
            : "";

        if (!this[sectionID].portA) {
            sectionAssemNum += "";
        } else if (this[sectionID].portA === "anti-cav") {
            sectionAssemNum += "-AC";
        } else if (this[sectionID].portA === "plug") {
            sectionAssemNum += "-PL";
        } else {
            sectionAssemNum += `-PR`;
        }

        if (!this[sectionID].portB) {
            sectionAssemNum += "";
        } else if (this[sectionID].portB === "anti-cav") {
            sectionAssemNum += "-AC";
        } else if (this[sectionID].portA === "plug") {
            sectionAssemNum += "-PL";
        } else {
            sectionAssemNum += "-PR";
        }

        sectionAssemNum += this[sectionID].loadSenseA
            ? `-LS${this[sectionID].loadSenseA}`
            : "";
        sectionAssemNum += this[sectionID].loadSenseB
            ? `-LS${this[sectionID].loadSenseB}`
            : "";

        return sectionAssemNum;
    }

    async calcCost() {
        let cost = 0;

        // Manifold options
        const costInlet = 1134.56;
        const cost3rdFuncInlet = 98.42;
        const costPlowPowerFloat = this.mppPowerFloat === "yes" ? 994.59 : 0;
        const costHiFlowAux = 554.89;

        // PVG section prices
        // const costPerSection = 594.1;
        // const costAllSections = costPerSection * this.numSections;

        let sumAllSections = 0;

        for (let i = 0; i < this.numSections; i++) {
            sumAllSections += await this.calcSectionCost(i);
        }
        // console.log({ sumAllSections });

        // Options
        const costEndPlate = 132.33;
        const costTieRodKit = 68.52;
        const costPaint = this.paint === "black" ? 88.55 : 0;

        // Tariff
        const tariffRate = 0.139;

        cost =
            costInlet +
            costPlowPowerFloat +
            // costAllSections +
            sumAllSections +
            costTieRodKit +
            costEndPlate +
            costPaint;

        cost += cost * tariffRate;

        return cost;
    }

    async calcSectionCost(index) {
        const {
            actuationPart,
            bodyPart,
            spoolPart,
            portAPart,
            portBPart,
            leverBasePart,
            leverBaseLeverPart,
            cableKitPart,
        } = await this.updatePartNumbers(index);

        // console.log(
        //     actuationPart?.price | 0,
        //     bodyPart?.price | 0,
        //     spoolPart?.price | 0,
        //     portAPart?.price | 0,
        //     portBPart?.price | 0,
        //     leverBasePart?.price | 0,
        //     leverBaseLeverPart?.price | 0,
        //     cableKitPart?.price | 0
        // );

        // console.log(
        //     (actuationPart?.price | 0) +
        //         (bodyPart?.price | 0) +
        //         (spoolPart?.price | 0) +
        //         (portAPart?.price | 0) +
        //         (portBPart?.price | 0) +
        //         (leverBasePart?.price | 0) +
        //         (leverBaseLeverPart?.price | 0) +
        //         (cableKitPart?.price | 0)
        // );

        return (
            (actuationPart?.price | 0) +
            (bodyPart?.price | 0) +
            (spoolPart?.price | 0) +
            (portAPart?.price | 0) +
            (portBPart?.price | 0) +
            (leverBasePart?.price | 0) +
            (leverBaseLeverPart?.price | 0) +
            (cableKitPart?.price | 0)
        );
    }
}
