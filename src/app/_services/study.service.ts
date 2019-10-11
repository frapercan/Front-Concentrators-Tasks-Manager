import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Study } from "../_models";

@Injectable({ providedIn: "root" })
export class StudyService {
  constructor(private http: HttpClient) {}

  get(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id).toPromise();
  }

  getAll() {
    return this.http.get<Study[]>(`${environment.apiUrl}/studies`).toPromise();
  }

  getCommunicationResult(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/result").toPromise();
  }

  getIssuesResult(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/result/incident").toPromise();
  }
}
