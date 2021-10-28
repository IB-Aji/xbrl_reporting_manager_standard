export class Parameter {

    id: number;
    name: string;
    type: string;
    value: string;
    code: string;

    constructor(id: number)
    constructor(id: number, name?: string,  value?: string) {
      this.id = id;
      this.name = name;
      this.value = value;
    }


}
