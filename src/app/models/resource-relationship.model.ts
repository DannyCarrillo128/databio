export class ResourceRelationship {

    constructor(
        public resourceRelationshipID: string,
        public resourceID: string,
        public relatedResourceID: string,
        public relationshipOfResource: string,
        public relationshipAccordingTo: string,
        public relationshipEstablishedDate: string,
        public relationshipRemarks: string,
        public _id: string
    ) { }

}