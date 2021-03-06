import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy, OnInit,EventEmitter, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";
import { User } from "../../_models"



/** @title Responsive sidenav */
@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnDestroy,OnInit {
  sideMenu = [{name:'studies',path:'/'},{name:'concentrators',path:'/concentrator'}]
  mobileQuery: MediaQueryList;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() closeSidenav = new EventEmitter<void>();
  currentUser: User;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private router: Router,

  ) {

    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
    this.translate = translate;
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
    
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
