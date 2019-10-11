import { Component, OnInit, EventEmitter, Output,ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"]
})
export class NavigationBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
    this.closeSidenav.emit();
    
  }
}
