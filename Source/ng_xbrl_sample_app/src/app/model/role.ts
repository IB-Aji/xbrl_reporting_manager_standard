import { Access } from '../model/access';
export class Role {

  id: number;
  name: string;
  description: string;
  access: Access[];

  constructor(id: number) {
    this.id = id;
  }

}
