export class Event {

    constructor(
        public eventID?: string,
        public parentEventID?: string,
        public fieldNumber?: string,
        public eventDate?: string,
        public eventTime?: string,
        public startDayOfYear?: string,
        public endDayOfYear?: string,
        public year?: string,
        public month?: string,
        public day?: string,
        public verbatimEventDate?: string,
        public habitat?: string,
        public samplingProtocol?: string,
        public sampleSizeValue?: string,
        public sampleSizeUnit?: string,
        public samplingEffort?: string,
        public fieldNotes?: string,
        public eventRemarks?: string,
        public _id?: string
    ) { }

}