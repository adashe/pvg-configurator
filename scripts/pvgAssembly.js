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

    updateSection(index, description, actuation, gpm, spoolType, portA, portB) {
        const sectionID = `section${index}`;

        this[sectionID] = {
            description,
            actuation,
            gpm,
            spoolType,
            portA,
            portB,
        };

        return this[sectionID];
    }

    calcCost() {
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

        const cost =
            costInlet +
            costPlowPowerFloat +
            costAllSections +
            costTieRodKit +
            costEndPlate +
            costPaint;

        return cost;
    }
}
