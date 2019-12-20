export class MeasurementOrFact {

    constructor(
        public measurementID?: string,
        public measurementType?: string,
        public measurementValue?: string,
        public measurementAccuracy?: string,
        public measurementUnit?: string,
        public measurementDeterminedBy?: string,
        public measurementDeterminedDate?: string,
        public measurementMethod?: string,
        public measurementRemarks?: string,
        public _id?: string
    ) { }

}