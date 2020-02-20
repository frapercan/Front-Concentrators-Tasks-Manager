import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Performance } from "../_models";

@Injectable({ providedIn: "root" })
export class PerformanceService {
  constructor(private http: HttpClient) { }



  getPerformancesResult(id) {
    return this.http.get(`${environment.apiUrl}/performances/` + id).toPromise();
  };

  getPerformancesList() {
    return this.http.get<Performance[]>(`${environment.apiUrl}/performances`).toPromise();
  };


}
