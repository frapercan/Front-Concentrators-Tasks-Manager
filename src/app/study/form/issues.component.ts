import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder, FormGroup, Validators

} from "@angular/forms";
import {
  PackageService,
  ConcentratorService,
  StudyService
} from "../../_services";
import { Package, Issue } from "../../_models";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";





@Component({ selector: "issuesStep", templateUrl: "issues.component.html", styleUrls: ["../study-form.component.scss"] })
export class IssuesComponent implements OnInit {
  @Input() public issuesFormGroup: FormGroup;
  @Input() public issues: FormGroup;

  dataSource;
  displayedColumns: string[] = ["id_incidencia", "nombre", "detect", "fix"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  detect = new SelectionModel<Issue>(true, []);
  fix = new SelectionModel<Issue>(true, []);
  issuesSelection = IssuesSelection;

  constructor(
    private studyService: StudyService

  ) {
  }

  ngOnInit() {
    this.loadAllIssues();
    this.tasksGroupValueChanged();
  }

  tasksGroupValueChanged() {
    this.fix.changed.subscribe(value =>
      this.issuesFormGroup.setValue({
        fix: value.source.selected,
        detect: this.issuesFormGroup.get("detect").value,
      })
    );
    this.detect.changed.subscribe(value =>
      this.issuesFormGroup.setValue({
        detect: value.source.selected,
        fix: this.issuesFormGroup.get("fix").value,
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



}


export enum IssuesSelection {
  nothing = "",
  detect = "1",
  fix = "2"
}