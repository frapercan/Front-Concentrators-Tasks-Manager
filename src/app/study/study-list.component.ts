import { Component, ViewChild, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { User, Study } from "../_models";
import { StudyService, AuthenticationService } from "../_services";
import { Router } from "@angular/router";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({ templateUrl: "study-list.component.html" })
export class StudyListComponent implements OnInit {
  currentUser: User;
  displayedColumns: string[] = [
    "id_paquete",
    "nombre_estudio",
    "fecha_insercion",
    "total_cerco",
    "id_tipo_periodicidad",
    "progreso"
  ];
  dataSource: MatTableDataSource<Study>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private authenticationService: AuthenticationService,
    private studyService: StudyService,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllStudies();
  }

  ngAfterViewInit() {}

  private loadAllStudies() {
    this.studyService
      .getAll()
      .then(
        studies => (
          (this.dataSource = new MatTableDataSource(studies)),
          (this.dataSource.sort = this.sort),
          (this.dataSource.paginator = this.paginator)
        )
      );
  }

  routeToDetails(row) {
    this.router.navigate(["/study", row.id_paquete]);
  }

  // sortByDate() {
  //   this.studies = this.studies.sort((a, b) => {
  //     return (
  //       <any>new Date(b.fecha_insercion) - <any>new Date(a.fecha_insercion)
  //     );
  //   });
  // }
}
