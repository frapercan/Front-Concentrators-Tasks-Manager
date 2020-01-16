import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Study, Issue, Performance, Attribute } from "../_models";

@Injectable({ providedIn: "root" })
export class StudyService {
  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id).toPromise();
  }
  post(study,
    targets,
    settings,
    issues,
    performances) {
    return this.http.post(`${environment.apiUrl}/studies/`,{study,targets,settings,issues,performances}).toPromise();
  };


  getAll() {
    return this.http.get<Study[]>(`${environment.apiUrl}/studies`).toPromise();
  };

  getCommunicationResult(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/result").toPromise();
  };

  getIssuesResult(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/result/issues").toPromise();
  };

  getIssuesList() {
    return this.http.get<Issue[]>(`${environment.apiUrl}/studies/issues`).toPromise();
  };

  getPerformancesList() {
    return this.http.get<Performance[]>(`${environment.apiUrl}/studies/performances`).toPromise();
  };

  getAttributesList() {
    return this.http.get<Attribute[]>(`${environment.apiUrl}/studies/attributes`).toPromise();
  };


  getCicloInfo(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/result/ciclos").toPromise();
  };


}
