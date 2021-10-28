import { TaxonomyEntrypoint } from '../model/taxonomy-entrypoint';
import { InstanceProcess,  } from '../model/instance-process';
export class TaxonomyMasterForm {

  id: number;

  entrypoint: TaxonomyEntrypoint;

  type: string;
  name: string;
  file: string;


  entrypointFile: string;

  datamartDBType: string;
  datamartIP: string;
  datamartPort: string;
  datamartUsername: string;
  datamartPassword: string;
  datamartDBName: string;
  datamartSchema: string;
  datamartTable: string;
  formMappingJSONObj: string;
  listProcess:InstanceProcess[];


  constructor(id: number) {
    this.id = id;
  }

}
