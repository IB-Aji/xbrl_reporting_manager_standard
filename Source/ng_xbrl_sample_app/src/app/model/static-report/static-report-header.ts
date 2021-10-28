import { Ljk } from '../ljk';
import { TaxonomyEntrypoint } from '../taxonomy-entrypoint';
import { StaticReportForm } from './static-report-form';

export class StaticReportHeader {

    id: number;
    dataPeriod: Date;
    ljk: Ljk;
    entrypoint: TaxonomyEntrypoint;
    documentName: string;
    status: string;
    updateBy: string;
    updateDate: Date;
    unitCurrency: string;

    
    base64ExcelFileUpload: string;
    base64InstanceFileUpload: string;
    formList: StaticReportForm[];

    constructor() {
        this.formList = [];
    }
    
}

export const isStatusNotSubmittedYet = (header : StaticReportHeader): boolean => {
    if(header.status === 'NOT_SUBMITTED_YET') {
        return true;
    }
    return false;
}

export const isStatusSubmittedAndNotValidated = (header : StaticReportHeader): boolean => {
    if(!isStatusNotSubmittedYet(header) && !isStatusValidated(header)) {
        return true;
    }
    return false;
}

export const isStatusValidated = (header : StaticReportHeader) : boolean => {
    if(header.status === 'VALIDATION_FAILED' || header.status === 'VALIDATION_SUCCESS') {
        return true;
    }
    return false;
}