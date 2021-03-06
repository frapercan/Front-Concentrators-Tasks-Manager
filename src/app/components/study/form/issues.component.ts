﻿import { Component, Input, ViewChild, OnInit } from "@angular/core";
import {
  FormBuilder, FormGroup, Validators

} from "@angular/forms";
import {
  IssueService
} from "../../../_services";
import { Package, Issue } from "../../../_models";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from '@angular/forms';





@Component({ selector: "issuesStep", templateUrl: "issues.component.html", styleUrls: ["./issues.component.scss"] })
export class IssuesComponent implements OnInit {
  @Input() public issuesFormGroup: FormGroup;

  dataSource;
  displayedColumns: string[] = ["id_incidencia", "nombre", "descripcion", "detect", "fix"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selected = new FormControl(0);
  groups
  detect = new SelectionModel<Issue>(true, []);
  fix = new SelectionModel<Issue>(true, []);
  issuesSelection = IssuesSelection;
  groupsByIndex = groupsByIndex;

  constructor(
    private issueService: IssueService

  ) {
  }



  ngOnInit() {
    this.loadAllIssues();
    this.tasksGroupValueChanged();
    this.loadAllIssuesGroups();
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
    this.issueService
      .getIssuesList()
      .then(
        issues => (
          (this.dataSource = new MatTableDataSource(issues)),
          (this.dataSource.sort = this.sort),
          (this.dataSource.paginator = this.paginator),
          (this.dataSource.filterPredicate = function (data, filter: string): boolean {
            return data.id_grupo_incidencia == filter;
          })


        )
      );
  }

  private loadAllIssuesGroups() {
    this.issueService.getIssuesGroupList().then(
      groups => (
        (this.groups = groups)
      ))
  }


  applyFilter(filterValue: string) {
    if (this.dataSource) {
      if (filterValue == '0') { this.dataSource.filter = '' } else {
        this.dataSource.filter = groupsByIndex[filterValue];
      }
    }
  }
}


export enum IssuesSelection {
  nothing = "",
  detect = "1",
  fix = "2"
}

export const groupsByIndex = [6, 3, 2, 1]
