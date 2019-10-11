import { Component, OnInit } from "@angular/core";
import { User } from "../_models";
import { AuthenticationService } from "../_services";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  currentUser: User;

  
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {}
}
