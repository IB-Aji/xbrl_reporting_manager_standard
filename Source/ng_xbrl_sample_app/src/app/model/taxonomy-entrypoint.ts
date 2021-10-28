import { TaxonomyRelease } from '../model/taxonomy-release';
export class TaxonomyEntrypoint {

  id: number;
  taxonomyRelease: TaxonomyRelease;
  entrypointPath: string;
  frequencePeriod: string;
  institutionType: string;
  sector: string;
  updateDate: Date;
  updateBy: string;

  constructor(id: number) {
    this.id = id;
  }

}
