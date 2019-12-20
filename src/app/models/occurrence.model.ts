export class Occurrence {

    constructor(
        public occurrenceID?: string,
        public catalogNumber?: string,
        public recordNumber?: string,
        public recordedBy?: string,
        public individualCount?: string,
        public organismQuantity?: string,
        public organismQuantityType?: string,
        public sex?: string,
        public lifeStage?: string,
        public reproductiveCondition?: string,
        public behavior?: string,
        public establishmentMeans?: string,
        public occurrenceStatus?: string,
        public preparations?: string,
        public disposition?: string,
        public associatedMedia?: string,
        public associatedReferences?: string,
        public associatedSequences?: string,
        public associatedTaxa?: string,
        public otherCatalogNumbers?: string,
        public occurrenceRemarks?: string,
        public _id?: string
    ) { }

}