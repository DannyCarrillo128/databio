export class Organism {

    constructor(
        public organismID?: string,
        public organismName?: string,
        public organismScope?: string,
        public associatedOccurrences?: string,
        public associatedOrganisms?: string,
        public previousIdentifications?: string,
        public organismRemarks?: string,
        public _id?: string
    ) { }

}