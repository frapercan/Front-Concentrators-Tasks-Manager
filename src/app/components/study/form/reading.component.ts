import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { StudyService } from "../../../_services";
import { Attribute } from "../../../_models";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";





@Component({ selector: "readingStep", templateUrl: "reading.component.html", styleUrls: ["../study-form.component.scss"] })
export class ReadingComponent implements OnInit {
  @Input() public readingFormGroup: FormGroup;

  dataSource;
  displayedColumns: string[] = ["id_atributo", "nombre", "descripcion", "selection"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  select = new SelectionModel<Attribute>(true, []);
  attributesSelection = AttributesSelection;

  constructor(
    private studyService: StudyService

  ) {
  }

  ngOnInit() {
    this.loadAllAttributes();
    this.AttributesGroupValueChanged();



  }

  AttributesGroupValueChanged() {
    this.select.changed.subscribe(value =>
      this.readingFormGroup.setValue({
        performances: value.source.selected,
      })
    );
  }

  private loadAllAttributes() {
    this.studyService
      .getAttributesList()
      .then(
        attributes => (
          (this.dataSource = new MatTableDataSource(attributes)),
          (this.dataSource.sort = this.sort),
          (this.dataSource.paginator = this.paginator)
        )
      );


  }
}

export enum AttributesSelection {
  nothing = "",
  act = 1
}