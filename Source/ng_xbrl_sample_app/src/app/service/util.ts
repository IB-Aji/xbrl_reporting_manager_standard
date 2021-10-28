import { Injectable } from '@angular/core';


@Injectable()
export class Util {


  constructor() {
  }

  safelyParseJSON(json) {

    var parsed

    try {
      parsed = JSON.parse(json)
    } catch (e) {
    }

    return parsed // Could be undefined!
  }

}
