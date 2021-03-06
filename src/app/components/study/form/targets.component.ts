﻿import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder, FormGroup, Validators

} from "@angular/forms";
import {
  PackageService,
  ConcentratorService
} from "../../../_services";
import { Package } from "../../../_models";



@Component({ selector: "targetStep", templateUrl: "targets.component.html", styleUrls: ["./targets.component.scss","../study-form.component.scss"] })
export class TargetsComponent implements OnInit {
  @Input() public targetsFormGroup: FormGroup;
  packages: Package[];

  constructor(
    private packageService: PackageService,
    private concentratorService: ConcentratorService

  ) {
  }

  ngOnInit() {
    this.targetsFormGroupValueChanged()




  }

  fileChangeListener($event: any): void {
    let files = $event.srcElement.files;
    console.log(files)

    if (this.isCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        this.targetsFormGroup.get('targets').setValue(this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray
        ));
        this.targetsFormGroup.updateValueAndValidity;
        console.log(this.targetsFormGroup.value.targets)
      };

      reader.onerror = function () {
        alert("Unable to read " + input.files[0]);
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
    
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {
    let dataArr = [];

    for (let i = 1; i < csvRecordsArray.length-1; i++) {
      let data = (<string>csvRecordsArray[i]).split(",");

      let csvRecord: CSVRecord = new CSVRecord();

      csvRecord.lvcid = data[0].trim();
      dataArr.push(csvRecord);
    }
    return dataArr;
  }

  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  fileReset() {
    this.targetsFormGroup.reset();
  }


  targetsFormGroupValueChanged() {
    const modeControl = this.targetsFormGroup.get("mode");
    const nameControl = this.targetsFormGroup.get("name");
    const descriptionControl = this.targetsFormGroup.get("description");
    const targetControl = this.targetsFormGroup.get("targets");
    const packageIdControl = this.targetsFormGroup.get("packageId");

    modeControl.valueChanges.subscribe((mode: string) => {
      targetControl.reset()
      if (mode == packageModeSelection.select) {
        packageIdControl.setValidators(Validators.required);
        nameControl.reset();
        descriptionControl.reset();
        targetControl.reset();
        this.getPackages();
        nameControl.clearValidators();
        descriptionControl.clearValidators();
        targetControl.clearValidators();
        nameControl.updateValueAndValidity();
        descriptionControl.updateValueAndValidity();
        targetControl.updateValueAndValidity();
      }
      if (mode == packageModeSelection.new) {
        packageIdControl.reset();
        packageIdControl.clearValidators();
        nameControl.setValidators(Validators.required);
        descriptionControl.setValidators(Validators.required);
        targetControl.setValidators(Validators.required);
        nameControl.updateValueAndValidity();
        descriptionControl.updateValueAndValidity();
        targetControl.updateValueAndValidity();
        packageIdControl.updateValueAndValidity();
      }
    });

    packageIdControl.valueChanges.subscribe(pack => {
      if (pack) {
        this.concentratorService
          .getConcentratorsByPackage({ id_paquete: pack })
          .then(records => (targetControl.setValue(records)));
      }
    });
  }
  private getPackages() {
    this.packageService.getAll().then(pack => (this.packages = pack));
  }

}


export class CSVRecord {
  public lvcid: any;

  constructor() { }
}

export enum packageModeSelection {
  select = "1",
  new = "2"
}
