import { Component, OnInit, OnChanges } from "@angular/core";
import { ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  ControlContainer
} from "@angular/forms";
import {
  StudyService
} from "../_services";


@Component({
  selector: "study-form",
  templateUrl: "study-form.component.html",
  styleUrls: ["./study-form.component.scss"]
})
export class StudyFormComponent implements OnInit {

  isLinear = false; //Stepper mode (Linear 1-2-3-4 , NonLinear 1-3-2-1-4...)
  
  studyFormGroup: FormGroup;
  targetsFormGroup: FormGroup;
  settingsFormGroup: FormGroup;
  issuesFormGroup: FormGroup;
  performancesFormGroup: FormGroup;
  readingFormGroup:FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private studyService: StudyService
  ) { }

  ngOnInit() {

    this.studyFormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      description: [""]
    });

    this.targetsFormGroup = this._formBuilder.group({
      selectionMode: ["", Validators.required],
      file: [""],
      targets: ["", Validators.required],
      package: [""],
      name: [""],
      description: [""]
    });
    this.settingsFormGroup = this._formBuilder.group({
      settingsMode: ["", Validators.required],
      loopLength: ["", [Validators.required, Validators.min(1)]],
      executionNumber: ["", [Validators.required, Validators.min(1)]],
      attempts: ["", [Validators.required, Validators.min(1)]],
      priority: ["", Validators.required],
    });
    this.issuesFormGroup = this._formBuilder.group({
      detect: [[]],
      fix: [[]]
    });
    this.performancesFormGroup = this._formBuilder.group({
      performances: [[]]
    });

    this.readingFormGroup = this._formBuilder.group({
      reading: [[]]
    });

  }
     onSubmit() {
      this.studyService.post(
        this.studyFormGroup.value,
        this.targetsFormGroup.value,
        this.settingsFormGroup.value,
        this.issuesFormGroup.value,
        this.performancesFormGroup.value
      );
    } 
}


