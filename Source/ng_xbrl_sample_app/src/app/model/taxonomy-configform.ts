import { TaxonomyMasterForm } from '../model/taxonomy-masterform';
export class TaxonomyConfigform {

  id: number;

  masterForm: TaxonomyMasterForm;
  datamartDBType: string;
  datamartIP: string;
  datamartPort: string;
 datamartUsername: string;
 datamartPassword: string;
 datamartDBName: string;
 datamartTable: string;
 frequencePeriod: string;


  constructor(id: number) {
    this.id = id;
  }

}
