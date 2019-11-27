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
import { StudyService } from "../_services";
import { Issue } from "../_models";
import { AbstractControl } from "@angular/forms";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

export interface IssueElement {
  id: number;
  name: string;
}

@Component({
  selector: "study-form",
  templateUrl: "study-form.component.html",
  styleUrls: ["./study-form.component.scss"]
})
export class StudyFormComponent implements OnInit {
  displayedColumns: string[] = ["id_incidencia", "nombre", "detect", "fix"];
  dataSource;
  detect = new SelectionModel<Issue>(true, []);
  fix = new SelectionModel<Issue>(true, []);
  public cercoRecords: any[] = [];
  demoForm: FormGroup;
  @ViewChild("fileImportInput", { static: true }) fileImportInput: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  issuesSelection = IssuesSelection;
  isLinear = true;
  nameFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  targetsFormGroup: FormGroup;
  settingsFormGroup: FormGroup;
  issuesFormGroup: FormGroup;
  fileName: String;

  constructor(
    private _formBuilder: FormBuilder,
    private studyService: StudyService
  ) {}

  ngOnInit() {
    this.nameFormGroup = this._formBuilder.group({
      name: ["", Validators.required]
    });
    this.descriptionFormGroup = this._formBuilder.group({
      description: ["", Validators.required]
    });
    this.targetsFormGroup = this._formBuilder.group({
      targets: ["", Validators.required]
    });
    this.settingsFormGroup = this._formBuilder.group({
      loopLength: ["", [Validators.required, Validators.min(1)]],
      executionNumber: ["", [Validators.required, Validators.min(1)]],
      attempts: ["", [Validators.required, Validators.min(1)]],
      priority: ["", Validators.required],
      mode: ["", Validators.required]
    });
    this.issuesFormGroup = this._formBuilder.group({
      detect: [[], [Validators.required]],
      fix: [[]]
    });

    this.loadAllIssues();
    this.forthFormGroupValueChanged();
    this.fifthFormGroupValueChanged();
  }

  fileChangeListener($event: any): void {
    let files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        this.cercoRecords = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray
        );
      };

      reader.onerror = function() {
        alert("Unable to read " + input.files[0]);
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {
    let dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = (<string>csvRecordsArray[i]).split(",");

      let csvRecord: CSVRecord = new CSVRecord();

      csvRecord.LVCID = data[0].trim();
      dataArr.push(csvRecord);
    }
    return dataArr;
  }

  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.cercoRecords = [];
    this.targetsFormGroup.get("targets").reset;
  }

  forthFormGroupValueChanged() {
    const modeControl = this.settingsFormGroup.get("mode");
    const loopLengthControl = this.settingsFormGroup.get("loopLength");
    const executionNumberControl = this.settingsFormGroup.get(
      "executionNumber"
    );
    const communicationAttemptsControl = this.settingsFormGroup.get("attempts");
    const priorityControl = this.settingsFormGroup.get("priority");
    
    this.settingsFormGroup.disable()
    modeControl.enable();

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
  fifthFormGroupValueChanged() {
    this.fix.changed.subscribe(value =>
      this.issuesFormGroup.setValue({
        fix: value.source.selected,
        detect: this.issuesFormGroup.get("detect").value
      })
    );
    this.detect.changed.subscribe(value =>
      this.issuesFormGroup.setValue({
        detect: value.source.selected,
        fix: this.issuesFormGroup.get("fix").value
      })
    );
  }

  private loadAllIssues() {
    this.studyService
      .getIssuesList()
      .then(
        issues => (
          (this.dataSource = new MatTableDataSource(issues)),
          (this.dataSource.sort = this.sort),
          (this.dataSource.paginator = this.paginator)
        )
      );
  }
  onSubmit() {
    this.studyService.post(
      this.nameFormGroup.value,
      this.descriptionFormGroup.value,
      this.cercoRecords,
      this.settingsFormGroup.value,
      this.issuesFormGroup.value
    );
  }
}

export class CSVRecord {
  public LVCID: any;

  constructor() {}
}

export enum IssuesSelection {
  nothing = "",
  detect = "1",
  fix = "2"
}

export enum modeSelection {
  single = "1",
  loop = "2"
}
