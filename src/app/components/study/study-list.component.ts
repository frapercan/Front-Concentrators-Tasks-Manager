import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { User, Study } from "../../_models";
import { StudyService, AuthenticationService } from "../../_services";
import { Router } from "@angular/router";

@Component({ templateUrl: "study-list.component.html" })
export class StudyListComponent implements OnInit {
  currentUser: User;
  displayedColumns: string[] = [
    "id_estudio",
    "nombre",
    "fecha_insercion",
    "total",
    "n_ciclos",
    "ciclo_actual",
    "fecha_incicio_ciclo",
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
    this.router.navigate(["/study", row.id_estudio]);
  }

  routeToCreation(row) {
    this.router.navigate(["/study/new"]);
  }

  displayFilter() {
    var x = document.getElementById("filter");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  refresh() {
    this.loadAllStudies();
  }
}
