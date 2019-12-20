import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder, FormGroup, Validators

} from "@angular/forms";
import {
  PackageService,
  ConcentratorService
} from "../../_services";
import { Package } from "../../_models";



@Component({ selector: "settingsStep", templateUrl: "settings.component.html", styleUrls: ["../study-form.component.scss"] })
export class SettingsComponent implements OnInit {
  @Input() public settingsFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private packageService: PackageService,
    private concentratorService: ConcentratorService

  ) {
  }

  ngOnInit() {
    this.settingsModeValueChanged();
  }


  settingsModeValueChanged() {
    const settingsModeControl = this.settingsFormGroup.get("settingsMode");
    const loopLengthControl = this.settingsFormGroup.get("loopLength");
    const executionNumberControl = this.settingsFormGroup.get(
      "executionNumber"
    );
    const communicationAttemptsControl = this.settingsFormGroup.get("attempts");
    const priorityControl = this.settingsFormGroup.get("priority");


    settingsModeControl.valueChanges.subscribe((settingsMode: string) => {
      if (settingsMode == modeSelection.loop) {
        loopLengthControl.setValidators([Validators.required]);
        loopLengthControl.setValue(null);
        loopLengthControl.enable();
        executionNumberControl.enable();
        executionNumberControl.setValidators([Validators.required]);
        communicationAttemptsControl.enable();
        priorityControl.enable();
      }
      if (settingsMode === modeSelection.single) {
        loopLengthControl.setValue(null);
        loopLengthControl.clearValidators();
        loopLengthControl.disable();
        executionNumberControl.clearValidators();
        executionNumberControl.setValue(1);
        executionNumberControl.disable();
        communicationAttemptsControl.enable();
        priorityControl.enable();
      }
      loopLengthControl.updateValueAndValidity();
    });
  }
}

export enum modeSelection {
  single = "1",
  loop = "2"
}