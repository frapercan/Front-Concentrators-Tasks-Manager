import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder, FormGroup, Validators

} from "@angular/forms";
import {
  PackageService,
  ConcentratorService,
  StudyService
} from "../../../_services";
import { Package, Issue } from "../../../_models";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";





@Component({ selector: "performancesStep", templateUrl: "performances.component.html", styleUrls: ["../study-form.component.scss"] })
export class PerformancesComponent implements OnInit {
  @Input() public performancesFormGroup: FormGroup;

  dataSource;
  displayedColumns: string[] = ["id_actuacion", "nombre", "descripcion", "selection"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  select = new SelectionModel<Performance>(true, []);
  perfomancesSelection = PerformancesSelection;

  constructor(
    private studyService: StudyService

  ) {
  }

  ngOnInit() {
    this.loadAllPerformances();
    this.performancesGroupValueChanged();



  }

  performancesGroupValueChanged() {
    this.select.changed.subscribe(value =>
      this.performancesFormGroup.setValue({
        performances: value.source.selected,
      })
    );
  }

  private loadAllPerformances() {
    this.studyService
      .getPerformancesList()
      .then(
        performances => (
          (this.dataSource = new MatTableDataSource(performances)),
          (this.dataSource.sort = this.sort),
          (this.dataSource.paginator = this.paginator)
        )
      );


  }








}

export enum PerformancesSelection {
  nothing = "",
  act = 1
}