export class Session {

    id: number;
    name: string;
    ipaddress: string;
    clientId: string;
    createDate: Date;
    updateDate: Date;

    constructor(id: number, name: string, ipaddress: string, clientId: string,  createDate: Date,  updateDate: Date) {
      this.id = id;
      this.name = name;
      this.ipaddress = ipaddress;
      this.clientId = clientId;
      this.createDate = createDate;
      this.updateDate = updateDate;
    }
}
