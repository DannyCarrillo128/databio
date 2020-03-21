export class DarwinCore {

    constructor(
        public registro?: string,
        // Record-level
        public type?: string,
        public modified?: string,
        public language?: string,
        public license?: string,
        public rightsHolder?: string,
        public accessRights?: string,
        public bibliographicCitation?: string,
        public references?: string,
        public institutionID?: string,
        public collectionID?: string,
        public datasetID?: string,
        public institutionCode?: string,
        public collectionCode?: string,
        public datasetName?: string,
        public ownerInstitutionCode?: string,
        public basisOfRecord?: string,
        public informationWithheld?: string,
        public dataGeneralizations?: string,
        public dynamicProperties?: string,
        // Occurrence
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
        // Organism
        public organismID?: string,
        public organismName?: string,
        public organismScope?: string,
        public associatedOccurrences?: string,
        public associatedOrganisms?: string,
        public previousIdentifications?: string,
        public organismRemarks?: string,
        // MaterialSample
        public materialSampleID?: string,
        // Event
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
        // Location
        public locationID?: string,
        public higherGeographyID?: string,
        public higherGeography?: string,
        public continent?: string,
        public waterBody?: string,
        public islandGroup?: string,
        public island?: string,
        public country?: string,
        public countryCode?: string,
        public stateProvince?: string,
        public county?: string,
        public municipality?: string,
        public locality?: string,
        public verbatimLocality?: string,
        public minimumElevationInMeters?: string,
        public maximumElevationInMeters?: string,
        public verbatimElevation?: string,
        public minimumDepthInMeters?: string,
        public maximumDepthInMeters?: string,
        public verbatimDepth?: string,
        public minimumDistanceAboveSurfaceInMeters?: string,
        public maximumDistanceAboveSurfaceInMeters?: string,
        public locationAccordingTo?: string,
        public locationRemarks?: string,
        public decimalLatitude?: string,
        public decimalLongitude?: string,
        public geodeticDatum?: string,
        public coordinateUncertaintyInMeters?: string,
        public coordinatePrecision?: string,
        public pointRadiusSpatialFit?: string,
        public verbatimCoordinates?: string,
        public verbatimLatitude?: string,
        public verbatimLongitude?: string,
        public verbatimCoordinateSystem?: string,
        public verbatimSRS?: string,
        public footprintWKT?: string,
        public footprintSRS?: string,
        public footprintSpatialFit?: string,
        public georeferencedBy?: string,
        public georeferencedDate?: string,
        public georeferenceProtocol?: string,
        public georeferenceSources?: string,
        public georeferenceVerificationStatus?: string,
        public georeferenceRemarks?: string,
        // GeologicalContext
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
        // Identification
        public identificationID?: string,
        public identificationQualifier?: string,
        public typeStatus?: string,
        public identifiedBy?: string,
        public dateIdentified?: string,
        public identificationReferences?: string,
        public identificationVerificationStatus?: string,
        public identificationRemarks?: string,
        // Taxon
        public taxonID?:string,
        public scientificNameID?:string,
        public acceptedNameUsageID?:string,
        public parentNameUsageID?:string,
        public originalNameUsageID?:string,
        public nameAccordingToID?:string,
        public namePublishedInID?:string,
        public taxonConceptID?:string,
        public scientificName?:string,
        public acceptedNameUsage?:string,
        public parentNameUsage?:string,
        public originalNameUsage?:string,
        public nameAccordingTo?:string,
        public namePublishedIn?:string,
        public namePublishedInYear?:string,
        public higherClassification?:string,
        public kingdom?:string,
        public phylum?:string,
        public _class?:string,
        public order?:string,
        public family?:string,
        public genus?:string,
        public subgenus?:string,
        public specificEpithet?:string,
        public infraspecificEpithet?:string,
        public taxonRank?:string,
        public verbatimTaxonRank?:string,
        public scientificNameAuthorship?:string,
        public vernacularName?:string,
        public nomenclaturalCode?:string,
        public taxonomicStatus?:string,
        public nomenclaturalStatus?:string,
        public taxonRemarks?:string,
        // MeasurementOrFact
        public measurementID?: string,
        public measurementType?: string,
        public measurementValue?: string,
        public measurementAccuracy?: string,
        public measurementUnit?: string,
        public measurementDeterminedBy?: string,
        public measurementDeterminedDate?: string,
        public measurementMethod?: string,
        public measurementRemarks?: string,
        // ResourceRelationship
        public resourceRelationshipID?: string,
        public resourceID?: string,
        public relatedResourceID?: string,
        public relationshipOfResource?: string,
        public relationshipAccordingTo?: string,
        public relationshipEstablishedDate?: string,
        public relationshipRemarks?: string,
        // Fotografía
        public fotografia?: string,
        public _id?: string
    ) { }

}