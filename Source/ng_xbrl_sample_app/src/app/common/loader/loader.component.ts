import { Component } from "@angular/core";

@Component({
  selector: "app-loader",
  providers: [],
  templateUrl: "./loader.component.html",
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {

  visible: boolean=false;

  constructor() {}


  show(){
    this.visible= true;
  }

  hide(){
    this.visible= false;
  }
}
