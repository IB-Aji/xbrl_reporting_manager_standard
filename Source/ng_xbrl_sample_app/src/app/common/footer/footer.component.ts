import { Component } from "@angular/core";
import $ from 'jquery';

@Component({
  selector: "app-footer", // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: "./footer.component.html",
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  aboutDialog: boolean;

  constructor() {}

  ngOnInit() {
    //alignment left
    $("nb-layout-footer > nav").css("justify-content", "left");
  }

  viewAbout() {
    this.aboutDialog = true;
  }
}
