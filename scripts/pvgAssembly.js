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
        sectionAssemNum += `-${this[sectionID].gpm}G`;
        sectionAssemNum += `-${this[sectionID].spoolType}`;

        if (this[sectionID].portA === "anti-cav") {
            sectionAssemNum += "-AC";
        } else if (this[sectionID].portA === "plug") {
            sectionAssemNum += "-PL";
        } else {
            sectionAssemNum += `-PR`;
        }

        if (this[sectionID].portB === "anti-cav") {
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

    calcCost() {
        let cost = 0;

        // Manifold options
        const costInlet = 1134.56;
        const cost3rdFuncInlet = 98.42;
        const costPlowPowerFloat = this.mppPowerFloat === "yes" ? 994.59 : 0;
        const costHiFlowAux = 554.89;

        // PVG section prices
        const costPerSection = 594.1;
        const costAllSections = costPerSection * this.numSections;

        // Options
        const costEndPlate = 132.33;
        const costTieRodKit = 68.52;
        const costPaint = this.paint === "black" ? 88.55 : 0;

        cost =
            costInlet +
            costPlowPowerFloat +
            costAllSections +
            costTieRodKit +
            costEndPlate +
            costPaint;

        return cost;
    }
}
