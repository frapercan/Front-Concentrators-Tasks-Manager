import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { User, Concentrator } from "../_models";
import { ConcentratorService, AuthenticationService } from "../_services";
import { Router } from "@angular/router";


@Component({ templateUrl: "concentrator-list.component.html" })
export class ConcentratorListComponent implements OnInit,OnDestroy {
  currentUser: User;
  displayedColumns: string[] = [
    "id_concentrador","lvcid","CERCO-VER","HW-VER","ROM-VER","MODEM-VER","var","/disk","/tmpn2pload","/tmpdailyClosure","MODEM-REBOOT-PERIODICITY","CERCO-REBOOT-PERIODICITY"
  ];
  dataSource: MatTableDataSource<Concentrator>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private authenticationService: AuthenticationService,
    private concentratorService: ConcentratorService,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllConcentrators();
  }

  ngAfterViewInit() {}

  private loadAllConcentrators() {
    this.concentratorService
      .getAll()
      .then(
        concentrators => (
          (this.dataSource = new MatTableDataSource(concentrators)),
          (this.dataSource.sort = this.sort),
          (this.dataSource.paginator = this.paginator)
        )
      );
  }
  ngOnDestroy(){
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    

  }

  displayFilter() {
    var x = document.getElementById("filter"); 
    console.log(x);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }





}


