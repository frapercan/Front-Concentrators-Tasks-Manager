import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, Validators

} from "@angular/forms";




@Component({ selector: "settingsStep", templateUrl: "settings.component.html", styleUrls: ["../study-form.component.scss"] })
export class SettingsComponent implements OnInit {
  @Input() public settingsFormGroup: FormGroup;

  constructor(
  ) {
  }

  ngOnInit() {
    this.settingsModeValueChanged();
  }


  settingsModeValueChanged() {
    const modeControl = this.settingsFormGroup.get("mode");
    const loopLengthControl = this.settingsFormGroup.get("loopLength");
    const executionNumberControl = this.settingsFormGroup.get(
      "executionNumber"
    );
    const communicationAttemptsControl = this.settingsFormGroup.get("attempts");
    const priorityControl = this.settingsFormGroup.get("priority");


    modeControl.valueChanges.subscribe((mode: string) => {
      if (mode == modeSelection.loop) {
        loopLengthControl.setValidators([Validators.required]);
        loopLengthControl.setValue(null);
        loopLengthControl.enable();
        executionNumberControl.enable();
        executionNumberControl.setValidators([Validators.required]);
        communicationAttemptsControl.enable();
        priorityControl.enable();
      }
      if (mode === modeSelection.single) {
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