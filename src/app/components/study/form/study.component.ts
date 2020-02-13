import { Component, Input, OnInit } from "@angular/core";
import {
  FormGroup
} from "@angular/forms";


@Component({ selector: "studyStep", templateUrl: "study.component.html", styleUrls: ["./study.component.scss","../study-form.component.scss"]})
export class StudyComponent implements OnInit {
   @Input() studyFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {


  }




}
