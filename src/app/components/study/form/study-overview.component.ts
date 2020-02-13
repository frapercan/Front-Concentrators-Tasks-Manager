﻿import { Component, Input, OnInit } from "@angular/core";
import {
   FormGroup, 

} from "@angular/forms";






@Component({ selector: "studyOverview", templateUrl: "study-overview.component.html", styleUrls: ["./study-overview.component.scss","../study-form.component.scss"] })
export class StudyOverviewComponent implements OnInit {
  @Input() public studyFormGroup: FormGroup;
  @Input() public targetsFormGroup: FormGroup;
  @Input() public settingsFormGroup: FormGroup;
  @Input() public issuesFormGroup: FormGroup;
  emptyChar = '-'


  ngOnInit() {

  }


}


