import { InstanceProcess } from './instance-process';
import { Ljk } from './ljk';
import { TaxonomyRelease } from './taxonomy-release';

export class Submission {

    id: number;
    taxonomyRelease: TaxonomyRelease;
    institutionType: string;
    frequencePeriod: string;
    sector: string;
    dataPeriod: Date;
    sentDate: Date;
    startValidation: Date;
    endValidation: Date;
    validationStatus: string;
    fileUpload: string;
    ljk: Ljk;
    processId: number;
    createBy: string;
    createDate: Date;
    status: string;
    submitMethod: string;
    totalValid: number;
    statusStyle: string;

    listOfProcInst: InstanceProcess[];

    constructor() {
    }
}
