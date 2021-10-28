export class SysParameter {

    id: number;
    name: string;
    type: string;
    values: any[];

    constructor(id: number, name: string, type: string, values: any[]) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.values = values;
    }
}
