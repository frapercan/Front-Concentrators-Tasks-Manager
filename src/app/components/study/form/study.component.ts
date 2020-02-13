import { Component, Input,ViewChild, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  ControlContainer
} from "@angular/forms";
import { EventEmitter } from 'events';


@Component({ selector: "studyStep", templateUrl: "study.component.html", styleUrls: ["./study.component.scss","../study-form.component.scss"]})
export class StudyComponent implements OnInit {
   @Input() studyFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,

  ) {
  }

  ngOnInit() {


  }




}
