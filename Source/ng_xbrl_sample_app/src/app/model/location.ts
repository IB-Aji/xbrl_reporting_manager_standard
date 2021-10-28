export class Location {

  id: number;
  name: string;
  code: string;
  level: number;
  location: string;
  parent: Location;


  constructor(id: number) {
    this.id = id;
  }

}
