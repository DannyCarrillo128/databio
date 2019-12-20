export class GeologicalContext {

    constructor(
        public geologicalContextID?: string,
        public earliestEonOrLowestEonothem?: string,
        public latestEonOrHighestEonothem?: string,
        public earliestEraOrLowestErathem?: string,
        public latestEraOrHighestErathem?: string,
        public earliestPeriodOrLowestSystem?: string,
        public latestPeriodOrHighestSystem?: string,
        public earliestEpochOrLowestSeries?: string,
        public latestEpochOrHighestSeries?: string,
        public earliestAgeOrLowestStage?: string,
        public latestAgeOrHighestStage?: string,
        public lowestBiostratigraphicZone?: string,
        public highestBiostratigraphicZone?: string,
        public lithostratigraphicTerms?: string,
        public group?: string,
        public formation?: string,
        public member?: string,
        public bed?: string,
        public _id?: string
    ) { }

}