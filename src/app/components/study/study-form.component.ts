import { Component, OnInit, OnChanges } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  StudyService
} from "../../_services";


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
  readingFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private studyService: StudyService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router

  ) { }

  ngOnInit() {

    this.studyFormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      description: [""]
    });

    this.targetsFormGroup = this._formBuilder.group({
      mode: ["", Validators.required],
      file: [""],
      targets: ["", Validators.required],
      packageId: [""],
      name: [""],
      description: [""]
    });
    this.settingsFormGroup = this._formBuilder.group({
      mode: ["", Validators.required],
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
    console.log(this.studyFormGroup.value.name,
      this.studyFormGroup.value.description,
      this.targetsFormGroup.value.mode,
      this.targetsFormGroup.value.packageId,
      this.targetsFormGroup.value.targets,
      this.targetsFormGroup.value.name,
      this.targetsFormGroup.value.description,
      this.settingsFormGroup.value.mode,
      this.settingsFormGroup.value.loopLength,
      this.settingsFormGroup.value.executionNumber,
      this.settingsFormGroup.value.attempts,
      this.settingsFormGroup.value.priority,
      this.issuesFormGroup.value.detect,
      this.issuesFormGroup.value.fix,
      this.performancesFormGroup.value.performances,
      this.readingFormGroup.value.reading)
    this.studyService.post(
      this.studyFormGroup.value.name,
      this.studyFormGroup.value.description,
      this.targetsFormGroup.value.mode,
      this.targetsFormGroup.value.packageId,
      this.targetsFormGroup.value.targets,
      this.targetsFormGroup.value.name,
      this.targetsFormGroup.value.description,
      this.settingsFormGroup.value.mode,
      this.settingsFormGroup.value.loopLength,
      this.settingsFormGroup.value.executionNumber,
      this.settingsFormGroup.value.attempts,
      this.settingsFormGroup.value.priority,
      this.issuesFormGroup.value.detect,
      this.issuesFormGroup.value.fix,
      this.performancesFormGroup.value.performances,
      this.readingFormGroup.value.reading
    ).then(resp => this.openSnackBarAndNavigateHome(this.translate.instant('study.form.createSuccess'), this.translate.instant('action.close'))).catch(e => this.openSnackBar(e, this.translate.instant('action.close')));

  }

  openSnackBarAndNavigateHome(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
    this.router.navigate(['/']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }


}


