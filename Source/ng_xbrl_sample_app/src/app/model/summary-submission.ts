import { Submission } from './submission';

export class SummarySubmission {

  ljkCode: string;
  ljkName: string;
  taxonomyRelease: string;
  institution: string;
  sector: string;
  frequencePeriod: string;
  dataPeriod: string;
  firstSentDate: Date;
  lastSentDate: Date;
  totalSubmit: number;
  firstValidationDate: Date;
  lastValidationDate: Date;
  validationStatus: string;
  validationStatusStyle: string;
  reportingStatus: string;
  reportingStatusStyle: string;

  listOfSubmission: Submission[];
}
