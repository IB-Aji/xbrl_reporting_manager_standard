import { TaxonomyEntrypoint } from '../model/taxonomy-entrypoint';
import { TaxonomyMasterForm } from '../model/taxonomy-masterform';
export class TaxonomyFormMapping {

  id: number;

  entrypoint: TaxonomyEntrypoint;

    masterForm: TaxonomyMasterForm
    
  elementName: string;
  elementType: string;
  elementLabel: string;
  columnName: string;


  constructor(id: number) {
    this.id = id;
  }

}
