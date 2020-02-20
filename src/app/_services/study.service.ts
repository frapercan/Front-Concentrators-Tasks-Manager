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
  post(
    studyName,
    studyDescription,
    targetsMode,
    packageId,
    targets,
    packageName,
    packageDescription,
    settingsMode,
    loopLength,
    executionNumber,
    attempts,
    priority,
    detect,
    fix,
    performances,
    reading) {
    return this.http.post(`${environment.apiUrl}/studies/`, {
      studyName,
      studyDescription,
      targetsMode,
      packageId,
      targets,
      packageName,
      packageDescription,
      settingsMode,
      loopLength,
      executionNumber,
      attempts,
      priority,
      detect,
      fix,
      performances,
      reading
    }).toPromise();
  };


  getAll() {
    return this.http.get<Study[]>(`${environment.apiUrl}/studies`).toPromise();
  };

  getCommunicationResult(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/communication").toPromise();
  };

  getCommunicationResultOverview(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/communication/overview").toPromise();
  };

  getPerformancesList() {
    return this.http.get<Performance[]>(`${environment.apiUrl}/studies/performances`).toPromise();
  };

  getAttributesList() {
    return this.http.get<Attribute[]>(`${environment.apiUrl}/studies/attributes`).toPromise();
  };
  
  getLoopsInfo(id) {
    return this.http.get(`${environment.apiUrl}/studies/` + id + "/loops").toPromise();
  };


}
