class PvgAssembly {
    constructor() {
        this.mppSysNum = null;
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
        pvgSeries,
        actuation,
        spoolType,
        gpm,
        portA,
        portB
    ) {
        const sectionID = `section${index}`;

        this[sectionID] = {
            description,
            pvgSeries,
            actuation,
            spoolType,
            gpm,
            portA,
            portB,
        };

        return this[sectionID];
    }

    calcCost() {
        return 1234.5678;
    }
}
