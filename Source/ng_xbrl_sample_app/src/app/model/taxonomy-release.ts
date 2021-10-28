import { Access } from '../model/access';
export class TaxonomyRelease {

  id: number;
  releaseDate: Date;
  version: number;
  description: string;
  taxonomyReleaseRootPath: string;
  fileUpload: string;
  updateDate: Date;
  updateBy: string;

  constructor(id: number) {
    this.id = id;
  }

}
