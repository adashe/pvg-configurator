class PvgAssembly{
    constructor(){
        this.mppSysNum = null;
        this.mppInletSetup = null;
        this.liqPopulated = null;
        this.mainReliefPsi = null;
        this.spreaderReliefPsi = null;
        this.mppPowerFloat = null;
        this.numSections = null;
        this.paint = null;
        this.sections = [];
    }

    reset(){
        this.mppSysNum = null;
        this.mppInletSetup = null;
        this.liqPopulated = null;
        this.mainReliefPsi = null;
        this.spreaderReliefPsi = null;
        this.mppPowerFloat = null;
        this.numSections = null;
        this.paint = null;
        this.sections = [];
    }

    updateSection(index, description, pvgSeries, actuation, spoolType, gpm, portRelA, portRelB){

        this.sections[index] = {
            description,
            pvgSeries,
            actuation,
            spoolType,
            gpm,
            portRelA,
            portRelB
        };

        return this.sections[index];
    }

    calcCost(){
        return 1234.5678;
    }

}