export class LogHeader {

  id: number;
  processType: string;
  validationType: string;
  totalInfo: number;
  totalWarning: number;
  totalError: number;

  constructor(id: number) {
    this.id = id;
  }

}
